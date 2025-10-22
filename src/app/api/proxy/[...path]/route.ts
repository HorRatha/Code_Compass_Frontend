/* eslint-disable */
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const PUBLIC_ENDPOINTS = [
  "auth/register",
  "auth/signup",
  "auth/login",
  "auth/refresh",
  "problems/verified",
  "submissions/run/batch"
];

function isPublicEndpoint(path: string[]): boolean {
  const fullPath = path.join("/");
  return (
    PUBLIC_ENDPOINTS.some((publicPath) => fullPath.startsWith(publicPath)) ||
    /^problems\/\d+$/.test(fullPath)
  );
}

function requiresAuthentication(path: string[]): boolean {
  return !isPublicEndpoint(path);
}

const createHandler =
  (method: string) =>
  async (
    request: NextRequest,
    { params }: { params: Promise<{ path: string[] }> }
  ) => {
    const resolvedParams = await params;
    return handleProxyRequest(request, resolvedParams.path, method);
  };

export const GET = createHandler("GET");
export const POST = createHandler("POST");
export const PUT = createHandler("PUT");
export const DELETE = createHandler("DELETE");
export const PATCH = createHandler("PATCH");

async function handleProxyRequest(
  request: NextRequest,
  path: string[],
  method: string
) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL_CODE_COMPASS?.replace(/\/$/, "");
    if (!baseUrl) throw new Error("NEXT_PUBLIC_BASE_URL_CODE_COMPASS is not configured");

    const requiresAuth = requiresAuthentication(path);
    const cleanPath = path.join("/").replace(/^\//, "");
    const targetUrl = `${baseUrl}/${cleanPath}`;

    console.log("🔁 Proxying to:", targetUrl);
    console.log("🔒 Requires authentication:", requiresAuth);

    const backendHeaders = new Headers();
    let token: any = null;

    // 🔐 Authentication
    if (requiresAuth) {
      try {
        token = await getToken({
          req: request,
          secret: process.env.NEXTAUTH_SECRET,
        });
      } catch (err) {
        console.error("getToken() threw:", err);
      }

      // Fallback session fetch
      if (!token?.accessToken) {
        const cookieHeader = request.headers.get("cookie") || "";
        const nextAuthUrl =
          process.env.NEXTAUTH_URL || `https://${request.headers.get("host")}`;

        try {
          const sessionRes = await fetch(
            `${nextAuthUrl.replace(/\/$/, "")}/api/auth/session`,
            {
              method: "GET",
              headers: { cookie: cookieHeader },
            }
          );

          if (sessionRes.ok) {
            const sessionData = await sessionRes.json();
            if (sessionData?.accessToken) {
              console.log("✅ Fallback session retrieved accessToken successfully");
              token = {
                accessToken: sessionData.accessToken,
                refreshToken: sessionData.refreshToken,
              };
            } else {
              console.warn("⚠️ Fallback session returned no accessToken");
            }
          } else {
            console.warn("⚠️ Fallback session fetch failed", sessionRes.status);
          }
        } catch (e) {
          console.error("Fallback fetch error:", e);
        }
      }

      if (!token?.accessToken) {
        console.error("❌ Access token not found in both getToken() and fallback");
        return NextResponse.json(
          { error: "Unauthorized - Please sign in" },
          { status: 401, headers: { "X-Auth-Required": "true" } }
        );
      }
    }

    // Copy request headers
    const copyHeaders = ["content-type", "accept", "accept-language", "accept-encoding"];
    for (const header of copyHeaders) {
      const value = request.headers.get(header);
      if (value) backendHeaders.set(header, value);
    }

    if (!backendHeaders.has("content-type") && method !== "GET" && method !== "HEAD") {
      backendHeaders.set("content-type", "application/json");
    }

    if (requiresAuth && token?.accessToken) {
      backendHeaders.set("Authorization", `Bearer ${token.accessToken}`);
      console.log("🟢 Using access token for request, length:", token.accessToken.length);
    }

    // Prepare request body
    let body: BodyInit | null = null;
    if (method !== "GET" && method !== "HEAD") {
      try {
        body = await request.text();
        if (body && !backendHeaders.has("content-type")) {
          backendHeaders.set("content-type", "application/json");
        }
      } catch (error) {
        console.warn("Failed to read request body:", error);
      }
    }

    // ⏱ Timeout control
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);
    let response: Response;

    try {
      response = await fetch(targetUrl, {
        method,
        headers: backendHeaders,
        body,
        signal: controller.signal,
      });
    } finally {
      clearTimeout(timeout);
    }

    // 🔁 Handle responses
    if (requiresAuth && response.status === 401) {
      console.warn("[Proxy] Backend returned 401, signaling reauth...");
      return NextResponse.json(
        { error: "Unauthorized - Token invalid or expired" },
        { status: 401, headers: { "X-Auth-Refresh": "true" } }
      );
    }

    if (!response.ok && response.status !== 204) {
      console.error(`Backend returned ${response.status} for ${targetUrl}`);
      try {
        const errorData = await response.json();
        return NextResponse.json(errorData, { status: response.status });
      } catch {
        return NextResponse.json(
          { error: `Backend returned ${response.status}` },
          { status: response.status }
        );
      }
    }

    // ✅ Handle 204 No Content
    if (response.status === 204) {
      return new NextResponse(null, { status: 204 });
    }

    // 🧠 Handle JSON or text
    const contentType = response.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      const data = await response.json();
      return NextResponse.json(data, { status: response.status });
    } else {
      const text = await response.text();
      return new NextResponse(text, { status: response.status });
    }

  } catch (error) {
    console.error("Proxy error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

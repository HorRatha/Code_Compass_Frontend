// app/api/proxy/[...path]/route.ts
/* eslint-disable */
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

// List of endpoints that don't require authentication
const PUBLIC_ENDPOINTS = ["auth/register", "auth/login", "auth/refresh", "problems/verified", "leaderboard"];

// Check if the endpoint requires authentication
function requiresAuthentication(path: string[]): boolean {
  const fullPath = path.join("/");
  return !PUBLIC_ENDPOINTS.some((publicPath) =>
    fullPath.startsWith(publicPath)
  );
}


// HTTP methods handler
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

// No server-side token refresh cache; client/session handles refresh

async function handleProxyRequest(
  request: NextRequest,
  path: string[],
  method: string
) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL_CODE_COMPASS?.replace(
      /\/$/,
      ""
    );
    if (!baseUrl) {
      throw new Error("NEXT_PUBLIC_BASE_URL_CODE_COMPASS is not configured");
    }

    // Check for required OIDC configuration when authentication is needed
    const requiresAuth = requiresAuthentication(path);
    if (requiresAuth) {
      const requiredOidcVars = [
        "OIDC_CLIENT_ID",
        "OIDC_CLIENT_SECRET",
        "OIDC_ISSUER",
      ];
      const missingOidcVars = requiredOidcVars.filter(
        (key) => !process.env[key]
      );

      if (missingOidcVars.length > 0) {
        console.error(
          `Missing OIDC configuration: ${missingOidcVars.join(", ")}`
        );
        return NextResponse.json(
          {
            error: "Authentication configuration missing",
            details: `Missing environment variables: ${missingOidcVars.join(
              ", "
            )}`,
            setup:
              "Please check AUTHENTICATION_SETUP.md for configuration instructions",
          },
          { status: 500 }
        );
      }
    }

    const cleanPath = path.join("/").replace(/^\//, "");
    const targetUrl = `${baseUrl}/${cleanPath}`;

    console.log("Proxying to:", targetUrl);
    console.log("Requires authentication:", requiresAuth);

    // Prepare headers for the backend request
    const backendHeaders = new Headers();
    let token: any = null;
    if (requiresAuth) {
      // Get token only when authentication is required
      token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
      });

      if (!token?.accessToken || token?.error) {
        console.error("Access token not found or has error:", token?.error);
        return NextResponse.json(
          { error: "Unauthorized - Please sign in" },
          { status: 401, headers: { "X-Auth-Required": "true" } }
        );
      }
    }

    // Copy specific headers from the original request
    const copyHeaders = [
      "content-type",
      "accept",
      "accept-language",
      "accept-encoding",
    ];

    for (const header of copyHeaders) {
      const value = request.headers.get(header);
      if (value) {
        backendHeaders.set(header, value);
      }
    }

    // Set JSON content type if not set
    if (
      !backendHeaders.has("content-type") &&
      method !== "GET" &&
      method !== "HEAD"
    ) {
      backendHeaders.set("content-type", "application/json");
    }

    // Add authorization header if required
    if (requiresAuth && token?.accessToken) {
      backendHeaders.set("Authorization", `Bearer ${token.accessToken}`);
      console.log("Using access token for request");
    }

    // Prepare request body
    let body: BodyInit | null = null;
    if (method !== "GET" && method !== "HEAD") {
      try {
        body = await request.text();
        // If we have a body but no content-type, assume JSON
        if (body && !backendHeaders.has("content-type")) {
          backendHeaders.set("content-type", "application/json");
        }
      } catch (error) {
        console.warn("Failed to read request body:", error);
      }
    }

    // Make the request to the backend
    const response = await fetch(targetUrl, {
      method,
      headers: backendHeaders,
      body,
    });

    // Handle authentication failures - signal client to refresh via NextAuth
    if (requiresAuth && response.status === 401) {
      console.warn(
        "[Proxy] 401 from backend. Signaling client to refresh session.",
        {
          path: cleanPath,
          method,
        }
      );
      // If the access token failed, ask client to refresh session
      return NextResponse.json(
        { error: "Unauthorized - Token invalid or expired" },
        { status: 401, headers: { "X-Auth-Refresh": "true" } }
      );
    }

    // Handle other error statuses
    if (!response.ok) {
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
    const clonedResponse = response.clone(); 

    // Successful response
    try {
        // Try reading the original response
        const data = await response.json();
        return NextResponse.json(data);
    } catch {
        // Handle non-JSON responses by reading the CLONED response
        // The cloned body is still usable.
        const text = await clonedResponse.text();
        return NextResponse.json({ result: text }, { status: response.status });
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
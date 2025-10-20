// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { getSession, signOut } from "next-auth/react";

// const PUBLIC_ENDPOINTS = ["auth/register", "auth/login", "auth/refresh"];

// const isPublicProxyPath = (urlOrRequest: RequestInfo): boolean => {
//   try {
//     const urlString = typeof urlOrRequest === "string" ? urlOrRequest : (urlOrRequest as Request).url;
//     // Handle relative URLs
//     const url = urlString.startsWith("http")
//       ? new URL(urlString)
//       : new URL(urlString, typeof window !== "undefined" ? window.location.origin : "http://localhost");
//     // Expecting "/api/proxy/<path>"
//     const proxyPrefix = "/api/proxy/";
//     const pathname = url.pathname.startsWith(proxyPrefix)
//       ? url.pathname.slice(proxyPrefix.length)
//       : url.pathname.replace(/^\//, "");
//     return PUBLIC_ENDPOINTS.some((p) => pathname.startsWith(p));
//   } catch {
//     return false;
//   }
// };

// const customFetch = async (input: RequestInfo, init?: RequestInit) => {
//   init = init || {};
//   const session = await getSession();
//   const isPublic = isPublicProxyPath(input);
//   if (!isPublic && session?.accessToken) {
//     init.headers = {
//       ...init.headers,
//       Authorization: `Bearer ${session.accessToken}`,
//     };
//   }

//   const response = await fetch(input, init);

//   if (response.status === 401) {
//     const authRefreshHeader = response.headers.get("x-auth-refresh");
//     const authExpiredHeader = response.headers.get("x-auth-expired");

//     if (authRefreshHeader === "true") {
//       try {
//         console.warn("[Client][baseApi] Received X-Auth-Refresh. Refreshing session and retrying...", {
//           url: String(input),
//         });
//         const sessionResponse = await fetch("/api/auth/session", {
//           method: "GET",
//         });
//         if (sessionResponse.ok) {
//           // Retry original request once
//           console.info("[Client][baseApi] Session refreshed. Retrying request once.");
//           return await fetch(input, { ...init, _retry: true } as any);
//         } else {
//           console.error("[Client][baseApi] Session refresh failed. Signing out.");
//           await signOut({ callbackUrl: "/login" });
//         }
//       } catch {
//         console.error("[Client][baseApi] Error while refreshing session. Signing out.");
//         await signOut({ callbackUrl: "/login" });
//       }
//     } else if (authExpiredHeader === "true") {
//       console.warn("[Client][baseApi] Session expired. Signing out.");
//       await signOut({ callbackUrl: "/login" });
//     }
//   }

//   return response;
// };

// const baseQueryWithReAuth = fetchBaseQuery({
//   baseUrl: "/api/proxy",
//   fetchFn: customFetch,
//   prepareHeaders: (headers) => {
//     headers.set("Content-Type", "application/json");
//     return headers;
//   },
// });


// export const baseApi = createApi({
//   reducerPath: "baseApi",
//   baseQuery: baseQueryWithReAuth,
//   tagTypes: [
//     "Roles",
//     "Packages",
//     "Comments",
//     "Submissions",
//     "Solutions",
//     "Problems",
//     "Medias",
//     "CreatorRequests",
//     "Badges",
//     "Auth",
//     "Users",
//     "Hints",
//     "Leaderboard",
//     "Report",
//     "SubmissionHistories"
//   ],
//   endpoints: () => ({}),
// });


/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession, signOut } from "next-auth/react";

const PUBLIC_ENDPOINTS = ["auth/register", "auth/login", "auth/refresh"];

const isPublicProxyPath = (urlOrRequest: RequestInfo): boolean => {
  try {
    const urlString = typeof urlOrRequest === "string" ? urlOrRequest : (urlOrRequest as Request).url;
    const url = urlString.startsWith("http")
      ? new URL(urlString)
      : new URL(urlString, typeof window !== "undefined" ? window.location.origin : "http://localhost");
    const proxyPrefix = "/api/proxy/";
    const pathname = url.pathname.startsWith(proxyPrefix)
      ? url.pathname.slice(proxyPrefix.length)
      : url.pathname.replace(/^\//, "");
    return PUBLIC_ENDPOINTS.some((p) => pathname.startsWith(p));
  } catch {
    return false;
  }
};

const customFetch = async (input: RequestInfo, init?: RequestInit) => {
  init = init || {};
  const session = await getSession();
  const isPublic = isPublicProxyPath(input);

  if (!isPublic && session?.accessToken) {
    init.headers = {
      ...init.headers,
      Authorization: `Bearer ${session.accessToken}`,
    };
    console.log("Added Authorization header:", {
      url: String(input),
      token: session.accessToken.slice(0, 10) + "...",
    });
  } else {
    console.log("No Authorization added:", { url: String(input), isPublic });
  }

  const response = await fetch(input, init);

  if (response.status === 401) {
    const authRefreshHeader = response.headers.get("x-auth-refresh");
    const authExpiredHeader = response.headers.get("x-auth-expired");

    if (authRefreshHeader === "true") {
      try {
        console.warn("[Client][baseApi] Received X-Auth-Refresh. Refreshing session and retrying...", {
          url: String(input),
        });
        const sessionResponse = await fetch("/api/auth/session", { method: "GET" });
        if (sessionResponse.ok) {
          const refreshedSession = await getSession();
          if (refreshedSession?.accessToken) {
            console.info("[Client][baseApi] Session refreshed. Retrying request once.");
            return await fetch(input, {
              ...init,
              headers: {
                ...init.headers,
                Authorization: `Bearer ${refreshedSession.accessToken}`,
              },
              _retry: true,
            } as any);
          }
        } else {
          console.error("[Client][baseApi] Session refresh failed. Signing out.");
          await signOut({ callbackUrl: "/login" });
        }
      } catch {
        console.error("[Client][baseApi] Error while refreshing session. Signing out.");
        await signOut({ callbackUrl: "/login" });
      }
    } else if (authExpiredHeader === "true") {
      console.warn("[Client][baseApi] Session expired. Signing out.");
      await signOut({ callbackUrl: "/login" });
    }
  }

  return response;
};

const baseQueryWithReAuth = fetchBaseQuery({
  baseUrl: "/api/proxy", // Or "https://code-compass.devith.it.com/api/v1" to bypass
  fetchFn: customFetch,
  prepareHeaders: (headers, { endpoint }) => {
    if (endpoint !== "uploadMediaFile") {
      headers.set("Content-Type", "application/json"); // Correct for updateProfile
    }
    return headers;
  },
});

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithReAuth,
  tagTypes: [
    "Roles",
    "Packages",
    "Comments",
    "Submissions",
    "Solutions",
    "Problems",
    "Medias",
    "CreatorRequests",
    "Badges",
    "Auth",
    "Users",
    "Hints",
    "Leaderboard",
    "Report",
    "SubmissionHistories",
    "UnverifiedProblems",
    "VerifiedProblems",
  ],
  endpoints: () => ({}),
});
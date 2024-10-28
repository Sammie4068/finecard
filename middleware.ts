import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Get the origin from the request headers
  const origin = request.headers.get("origin") || "";

  // Define allowed origins
  const allowedOrigins = [
    "https://finecard.vercel.app",
    "http://localhost:3000", // for development
  ];

  // Check if the origin is allowed
  const isAllowedOrigin = allowedOrigins.includes(origin);

  // Get the pathname from the request URL
  const pathname = request.nextUrl.pathname;

  // Define paths that need CORS headers
  const authPaths = [
    "/api/auth/setup",
    "/api/auth/logout",
    // Add other auth-related paths as needed
  ];

  // Check if the current path needs CORS headers
  const needsCors = authPaths.some((path) => pathname.startsWith(path));

  if (needsCors) {
    // Create response headers
    const headers = {
      "Access-Control-Allow-Origin": isAllowedOrigin
        ? origin
        : allowedOrigins[0],
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers":
        "Content-Type, Authorization, next-router-prefetch, next-router-state-tree, rsc",
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Max-Age": "86400", // 24 hours
    };

    // Handle preflight requests
    if (request.method === "OPTIONS") {
      return NextResponse.json({}, { headers });
    }

    // For actual requests, add CORS headers to the response
    const response = NextResponse.next();
    Object.entries(headers).forEach(([key, value]) => {
      response.headers.set(key, value);
    });

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/api/auth/:path*",
    // Add other paths that need CORS handling
  ],
};

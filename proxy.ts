import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function proxy(request: NextRequest) {
  /* Authentication disabled for development
  // Check if user is accessing the main page
  if (request.nextUrl.pathname === "/") {
    const authToken = request.cookies.get("auth-token")

    // If no auth token, redirect to login
    if (!authToken) {
      return NextResponse.redirect(new URL("/login", request.url))
    }
  }

  // If accessing login page while authenticated, redirect to home
  if (request.nextUrl.pathname === "/login") {
    const authToken = request.cookies.get("auth-token")

    if (authToken) {
      return NextResponse.redirect(new URL("/", request.url))
    }
  }
  */

  return NextResponse.next()
}

export const config = {
  matcher: ["/", "/login"],
}

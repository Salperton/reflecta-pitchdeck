import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

const VALID_CREDENTIALS = [
  { username: "conclave", password: "win" },
  { username: "sue", password: "niw2026" },
]

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    // Validate credentials
    const isValid = VALID_CREDENTIALS.some(
      (cred) => cred.username === username && cred.password === password
    )

    if (isValid) {
      // Set auth cookie
      const cookieStore = await cookies()
      cookieStore.set("auth-token", "authenticated", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24, // 24 hours
        path: "/",
      })

      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ error: "Invalid username or password" }, { status: 401 })
    }
  } catch (error) {
    return NextResponse.json({ error: "An error occurred during login" }, { status: 500 })
  }
}

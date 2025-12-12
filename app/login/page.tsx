"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })

      const data = await response.json()

      if (response.ok) {
        router.push("/")
        router.refresh()
      } else {
        setError(data.error || "Invalid credentials")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#8B9D8B] via-[#F5F5DC] to-[#8B9D8B] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="rounded-2xl p-4 shadow-lg bg-white">
              <Image
                src="/images/reflecta-logo.png"
                alt="Reflecta Logo"
                width={200}
                height={60}
                className="w-auto h-12"
              />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-[#2C3E2C] text-center mb-2">Welcome Back</h1>
          <p className="text-[#5A6A5A] text-center mb-8">Sign in to view the pitch deck</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-[#2C3E2C] mb-2">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-[#8B9D8B]/30 focus:border-[#8B9D8B] focus:outline-none transition-colors bg-white text-[#2C3E2C]"
                placeholder="Enter your username"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#2C3E2C] mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-[#8B9D8B]/30 focus:border-[#8B9D8B] focus:outline-none transition-colors bg-white text-[#2C3E2C]"
                placeholder="Enter your password"
                required
              />
            </div>

            {error && (
              <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">{error}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#8B9D8B] hover:bg-[#7A8C7A] text-white font-semibold py-3 px-6 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-6 p-4 bg-[#F5F5DC]/50 rounded-xl">
            <p className="text-xs text-[#5A6A5A] text-center">Demo Credentials</p>
            <p className="text-sm text-[#2C3E2C] text-center font-mono mt-1">
              Username: <strong>reflecta</strong>
            </p>
            <p className="text-sm text-[#2C3E2C] text-center font-mono">
              Password: <strong>demo2024</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

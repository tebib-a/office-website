"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Shield, AlertCircle } from "lucide-react"

export default function AdminLoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const [locked, setLocked] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Reset error
    setError("")

    // Check if locked
    if (locked) {
      return
    }

    // Validate email format
    if (!email.includes("@") || !email.includes(".")) {
      setError("Please enter a valid email address")
      return
    }

    setLoading(true)

    try {
      // Check if password is correct
      if (password === "ttxx.1234") {
        // Create admin session
        const session = {
          email,
          isAdmin: true,
          loginTime: new Date().toISOString(),
          sessionId: Math.random().toString(36).substring(2, 15),
        }

        // Store in localStorage
        localStorage.setItem("admin_session", JSON.stringify(session))

        // Redirect to admin dashboard
        router.push("/admin")
      } else {
        // Increment attempts
        const newAttempts = attempts + 1
        setAttempts(newAttempts)

        // Lock after 3 attempts
        if (newAttempts >= 3) {
          setLocked(true)
          setError("Too many failed attempts. Please wait 5 seconds.")

          // Unlock after 5 seconds
          setTimeout(() => {
            setLocked(false)
            setAttempts(0)
          }, 5000)
        } else {
          setError(`Invalid access code. Attempt ${newAttempts}/3`)
        }
      }
    } catch (error) {
      setError("An error occurred. Please try again.")
      console.error("Login error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 bg-red-600 rounded-full flex items-center justify-center">
              <Shield className="h-10 w-10 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white">Restricted Access</h1>
          <p className="text-gray-400 mt-2">Authorized Personnel Only</p>
        </div>

        <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-300">
                Access Code
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter access code"
                required
                className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-500"
                disabled={locked}
              />
            </div>

            {error && (
              <div className="bg-red-900/30 border border-red-800 rounded p-3 flex items-center text-sm">
                <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
                <span className="text-red-300">{error}</span>
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white"
              disabled={loading || locked}
            >
              {loading ? (
                <>
                  <span className="mr-2">Verifying</span>
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                </>
              ) : locked ? (
                "Locked"
              ) : (
                "Access Admin Dashboard"
              )}
            </Button>
          </form>

          <div className="mt-6 pt-4 border-t border-gray-700">
            <p className="text-xs text-gray-500 text-center">
              This is a secure system. All access attempts are logged and monitored. Unauthorized access is prohibited.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

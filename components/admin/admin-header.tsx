"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { LogOut, User, Shield } from "lucide-react"
import { useRouter } from "next/navigation"

export default function AdminHeader() {
  const [currentUser, setCurrentUser] = useState<string>("")
  const router = useRouter()

  useEffect(() => {
    // Get current user from session
    const adminSession = localStorage.getItem("admin_session")
    if (adminSession) {
      try {
        const session = JSON.parse(adminSession)
        setCurrentUser(session.email)
      } catch (error) {
        console.error("Error parsing session:", error)
      }
    }
  }, [])

  const handleLogout = () => {
    // Clear session
    localStorage.removeItem("admin_session")

    // Redirect to login
    router.push("/admin-login")
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Shield className="h-6 w-6 text-red-600" />
            <h1 className="text-xl font-semibold text-gray-900">Admin Dashboard</h1>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <User className="h-4 w-4" />
              <span>{currentUser}</span>
            </div>

            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="flex items-center space-x-2 border-red-200 text-red-600 hover:bg-red-50"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

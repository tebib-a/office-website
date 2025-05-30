"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const session = localStorage.getItem("admin_session")
    if (session) {
      try {
        const userData = JSON.parse(session)
        if (userData.isAdmin) {
          setUser(userData)
        } else {
          router.push("/admin-login")
        }
      } catch {
        router.push("/admin-login")
      }
    } else {
      router.push("/admin-login")
    }
    setLoading(false)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("admin_session")
    router.push("/admin-login")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading admin panel...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {user.email}</span>
              <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Services</h3>
              <p className="text-3xl font-bold text-blue-600">12</p>
              <p className="text-sm text-gray-500">Total services</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900 mb-2">News</h3>
              <p className="text-3xl font-bold text-green-600">24</p>
              <p className="text-sm text-gray-500">Published articles</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Messages</h3>
              <p className="text-3xl font-bold text-purple-600">8</p>
              <p className="text-sm text-gray-500">Unread messages</p>
            </div>
          </div>

          <div className="mt-8 bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Admin Panel</h2>
            <p className="text-gray-600 mb-4">
              Welcome to the office administration dashboard. You have successfully logged in with the access code.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-medium text-gray-900">Content Management</h3>
                <p className="text-sm text-gray-600">Manage services, news, and events</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-medium text-gray-900">User Messages</h3>
                <p className="text-sm text-gray-600">View and respond to user inquiries</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-medium text-gray-900">Gallery</h3>
                <p className="text-sm text-gray-600">Upload and manage images</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-medium text-gray-900">Settings</h3>
                <p className="text-sm text-gray-600">Configure site settings</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

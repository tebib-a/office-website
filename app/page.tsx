import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-4">Office Website</h1>
        <p className="text-gray-600 mb-6">Welcome to the office administration system</p>
        <Link
          href="/admin-login"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Admin Login
        </Link>
      </div>
    </div>
  )
}

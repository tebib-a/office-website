"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, CheckCircle, XCircle, RefreshCw } from "lucide-react"
import Link from "next/link"

export default function EmailVerificationPage() {
  const [status, setStatus] = useState<"checking" | "pending" | "verified" | "rejected">("checking")
  const [isChecking, setIsChecking] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams?.get("email") || ""
  const supabase = createClientComponentClient()

  const checkVerificationStatus = async () => {
    if (!email) return

    setIsChecking(true)

    try {
      const { data, error } = await supabase.from("profiles").select("email_verified").eq("email", email).single()

      if (error) {
        console.error("Error checking verification status:", error)
        setStatus("pending")
      } else if (data) {
        if (data.email_verified) {
          setStatus("verified")
          // Redirect to admin dashboard after a short delay
          setTimeout(() => {
            router.push("/admin")
          }, 2000)
        } else {
          setStatus("pending")
        }
      } else {
        setStatus("pending")
      }
    } catch (err) {
      console.error("Verification check error:", err)
      setStatus("pending")
    } finally {
      setIsChecking(false)
    }
  }

  useEffect(() => {
    checkVerificationStatus()

    // Check status every 30 seconds
    const interval = setInterval(checkVerificationStatus, 30000)

    return () => clearInterval(interval)
  }, [email])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/10 backdrop-blur-md border-white/20 text-white">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Email Verification</CardTitle>
          <CardDescription className="text-center text-blue-200">{email}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {status === "checking" && (
            <div className="flex flex-col items-center justify-center py-8">
              <Loader2 className="h-12 w-12 text-blue-400 animate-spin mb-4" />
              <p className="text-lg text-blue-100">Checking verification status...</p>
            </div>
          )}

          {status === "pending" && (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="h-16 w-16 rounded-full bg-yellow-500/20 flex items-center justify-center mb-4">
                <Loader2 className="h-8 w-8 text-yellow-400 animate-spin" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Verification Pending</h3>
              <p className="text-center text-blue-200 mb-6">
                Your email is waiting for verification by an administrator. You will be notified once your access is
                approved.
              </p>
              <Button
                onClick={checkVerificationStatus}
                variant="outline"
                className="border-blue-400 text-blue-300 hover:bg-blue-900/30"
                disabled={isChecking}
              >
                {isChecking ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Checking...
                  </>
                ) : (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4" /> Check Status
                  </>
                )}
              </Button>
            </div>
          )}

          {status === "verified" && (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="h-16 w-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-green-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Email Verified!</h3>
              <p className="text-center text-blue-200 mb-6">
                Your email has been verified. You will be redirected to the admin dashboard shortly.
              </p>
              <Link href="/admin">
                <Button className="bg-blue-600 hover:bg-blue-700">Go to Dashboard</Button>
              </Link>
            </div>
          )}

          {status === "rejected" && (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="h-16 w-16 rounded-full bg-red-500/20 flex items-center justify-center mb-4">
                <XCircle className="h-8 w-8 text-red-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Verification Rejected</h3>
              <p className="text-center text-blue-200 mb-6">
                Your email verification request has been rejected. Please contact the administrator for assistance.
              </p>
              <Link href="/">
                <Button variant="outline" className="border-blue-400 text-blue-300 hover:bg-blue-900/30">
                  Back to Home
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

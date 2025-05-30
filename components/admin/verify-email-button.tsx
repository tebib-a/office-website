"use client"

import { useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

interface VerifyEmailButtonProps {
  profileId: string
  email: string
  action: "approve" | "reject"
}

export default function VerifyEmailButton({ profileId, email, action }: VerifyEmailButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const supabase = createClientComponentClient()
  const router = useRouter()

  const handleAction = async () => {
    setIsLoading(true)

    try {
      if (action === "approve") {
        // Update profile to mark email as verified
        await supabase.from("profiles").update({ email_verified: true }).eq("id", profileId)
      } else {
        // Delete the profile to reject the verification
        await supabase.from("profiles").delete().eq("id", profileId)
      }

      // Refresh the page to show updated data
      router.refresh()
    } catch (error) {
      console.error(`Error ${action === "approve" ? "approving" : "rejecting"} email:`, error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      variant={action === "approve" ? "default" : "destructive"}
      size="sm"
      onClick={handleAction}
      disabled={isLoading}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : action === "approve" ? (
        <>
          <CheckCircle className="h-4 w-4 mr-1" /> Approve
        </>
      ) : (
        <>
          <XCircle className="h-4 w-4 mr-1" /> Reject
        </>
      )}
    </Button>
  )
}

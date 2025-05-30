"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabase"
import { Trash2 } from "lucide-react"

interface DeleteServiceButtonProps {
  serviceId: string
}

export default function DeleteServiceButton({ serviceId }: DeleteServiceButtonProps) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this service?")) return

    setIsDeleting(true)
    try {
      const { error } = await supabase.from("services").delete().eq("id", serviceId)
      if (error) throw error
      router.refresh()
    } catch (error) {
      console.error("Error deleting service:", error)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleDelete}
      disabled={isDeleting}
      className="text-red-600 hover:text-red-700 hover:bg-red-50"
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  )
}

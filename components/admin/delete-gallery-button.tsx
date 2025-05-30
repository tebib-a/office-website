"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabase"
import { Trash2 } from "lucide-react"

interface DeleteGalleryButtonProps {
  galleryId: string
}

export default function DeleteGalleryButton({ galleryId }: DeleteGalleryButtonProps) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this gallery image?")) return

    setIsDeleting(true)
    try {
      const { error } = await supabase.from("gallery").delete().eq("id", galleryId)
      if (error) throw error
      router.refresh()
    } catch (error) {
      console.error("Error deleting gallery item:", error)
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
      <Trash2 className="h-3 w-3" />
    </Button>
  )
}

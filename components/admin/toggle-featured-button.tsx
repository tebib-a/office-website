"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabase"
import { Star, StarOff } from "lucide-react"

interface ToggleFeaturedButtonProps {
  galleryId: string
  isFeatured: boolean
}

export default function ToggleFeaturedButton({ galleryId, isFeatured }: ToggleFeaturedButtonProps) {
  const router = useRouter()
  const [isUpdating, setIsUpdating] = useState(false)

  const handleToggle = async () => {
    setIsUpdating(true)
    try {
      const { error } = await supabase.from("gallery").update({ is_featured: !isFeatured }).eq("id", galleryId)
      if (error) throw error
      router.refresh()
    } catch (error) {
      console.error("Error updating featured status:", error)
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleToggle}
      disabled={isUpdating}
      className={isFeatured ? "text-yellow-600 hover:text-yellow-700" : "text-gray-600 hover:text-gray-700"}
    >
      {isFeatured ? <Star className="h-3 w-3 fill-current" /> : <StarOff className="h-3 w-3" />}
    </Button>
  )
}

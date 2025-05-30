"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { supabase } from "@/lib/supabase"
import ImageUpload from "@/components/admin/image-upload"

interface GalleryFormProps {
  galleryItem?: {
    id: string
    title_en: string
    title_am?: string
    description_en?: string
    description_am?: string
    image_url: string
    category: string
    is_featured: boolean
  }
  isEdit?: boolean
}

export default function GalleryForm({ galleryItem, isEdit = false }: GalleryFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title_en: galleryItem?.title_en || "",
    title_am: galleryItem?.title_am || "",
    description_en: galleryItem?.description_en || "",
    description_am: galleryItem?.description_am || "",
    image_url: galleryItem?.image_url || "",
    category: galleryItem?.category || "general",
    is_featured: galleryItem?.is_featured || false,
  })
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      if (isEdit && galleryItem) {
        const { error: updateError } = await supabase.from("gallery").update(formData).eq("id", galleryItem.id)
        if (updateError) throw updateError
      } else {
        const { error: insertError } = await supabase.from("gallery").insert([formData])
        if (insertError) throw insertError
      }

      router.push("/admin/gallery")
      router.refresh()
    } catch (err: any) {
      console.error("Error saving gallery item:", err)
      setError(err.message || "An error occurred while saving the gallery item")
    } finally {
      setIsSubmitting(false)
    }
  }

  const categories = [
    { value: "general", label: "General" },
    { value: "events", label: "Events" },
    { value: "office", label: "Office" },
    { value: "meetings", label: "Meetings" },
    { value: "community", label: "Community" },
    { value: "achievements", label: "Achievements" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEdit ? "Edit Gallery Image" : "Add New Gallery Image"}</CardTitle>
      </CardHeader>
      <CardContent>
        {error && <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md text-red-600">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload */}
          <ImageUpload
            value={formData.image_url}
            onChange={(url) => setFormData({ ...formData, image_url: url })}
            label="Gallery Image"
          />

          {/* Titles */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title_en">Title (English)</Label>
              <Input
                id="title_en"
                value={formData.title_en}
                onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="title_am">Title (Amharic)</Label>
              <Input
                id="title_am"
                value={formData.title_am}
                onChange={(e) => setFormData({ ...formData, title_am: e.target.value })}
              />
            </div>
          </div>

          {/* Descriptions */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="description_en">Description (English)</Label>
              <Textarea
                id="description_en"
                value={formData.description_en}
                onChange={(e) => setFormData({ ...formData, description_en: e.target.value })}
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description_am">Description (Amharic)</Label>
              <Textarea
                id="description_am"
                value={formData.description_am}
                onChange={(e) => setFormData({ ...formData, description_am: e.target.value })}
                rows={3}
              />
            </div>
          </div>

          {/* Category and Featured */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label>Settings</Label>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="is_featured"
                  checked={formData.is_featured}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked as boolean })}
                />
                <Label htmlFor="is_featured" className="text-sm font-normal">
                  Featured Image
                </Label>
              </div>
            </div>
          </div>

          <div className="flex space-x-4">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : isEdit ? "Update Image" : "Add Image"}
            </Button>
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

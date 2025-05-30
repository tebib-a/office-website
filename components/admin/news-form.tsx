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

interface NewsFormProps {
  news?: {
    id: string
    title: string
    title_am?: string
    body: string
    body_am?: string
    image_url?: string
    published: boolean
  }
  isEdit?: boolean
}

export default function NewsForm({ news, isEdit = false }: NewsFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: news?.title || "",
    title_am: news?.title_am || "",
    body: news?.body || "",
    body_am: news?.body_am || "",
    image_url: news?.image_url || "",
    published: news?.published || false,
  })
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      if (isEdit && news) {
        const { error: updateError } = await supabase.from("news").update(formData).eq("id", news.id)
        if (updateError) throw updateError
      } else {
        const { error: insertError } = await supabase.from("news").insert([formData])
        if (insertError) throw insertError
      }

      router.push("/admin/news")
      router.refresh()
    } catch (err: any) {
      console.error("Error saving news:", err)
      setError(err.message || "An error occurred while saving the news article")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEdit ? "Edit News Article" : "Add New News Article"}</CardTitle>
      </CardHeader>
      <CardContent>
        {error && <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md text-red-600">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload */}
          <ImageUpload
            value={formData.image_url}
            onChange={(url) => setFormData({ ...formData, image_url: url })}
            label="Featured Image (Optional)"
          />

          {/* Titles */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title (English)</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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

          {/* Content */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="body">Content (English)</Label>
              <Textarea
                id="body"
                value={formData.body}
                onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                rows={8}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="body_am">Content (Amharic)</Label>
              <Textarea
                id="body_am"
                value={formData.body_am}
                onChange={(e) => setFormData({ ...formData, body_am: e.target.value })}
                rows={8}
              />
            </div>
          </div>

          {/* Published Status */}
          <div className="space-y-2">
            <Label>Publication Status</Label>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="published"
                checked={formData.published}
                onCheckedChange={(checked) => setFormData({ ...formData, published: checked as boolean })}
              />
              <Label htmlFor="published" className="text-sm font-normal">
                Publish this article
              </Label>
            </div>
          </div>

          <div className="flex space-x-4">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : isEdit ? "Update Article" : "Create Article"}
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

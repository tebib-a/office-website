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

interface EventFormProps {
  event?: {
    id: string
    title_en: string
    title_am?: string
    description_en?: string
    description_am?: string
    content_en?: string
    content_am?: string
    image_url?: string
    event_date: string
    location_en?: string
    location_am?: string
    is_published: boolean
  }
  isEdit?: boolean
}

export default function EventForm({ event, isEdit = false }: EventFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title_en: event?.title_en || "",
    title_am: event?.title_am || "",
    description_en: event?.description_en || "",
    description_am: event?.description_am || "",
    content_en: event?.content_en || "",
    content_am: event?.content_am || "",
    image_url: event?.image_url || "",
    event_date: event?.event_date ? new Date(event.event_date).toISOString().slice(0, 16) : "",
    location_en: event?.location_en || "",
    location_am: event?.location_am || "",
    is_published: event?.is_published || false,
  })
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const submitData = {
        ...formData,
        event_date: new Date(formData.event_date).toISOString(),
      }

      if (isEdit && event) {
        const { error: updateError } = await supabase.from("events").update(submitData).eq("id", event.id)
        if (updateError) throw updateError
      } else {
        const { error: insertError } = await supabase.from("events").insert([submitData])
        if (insertError) throw insertError
      }

      router.push("/admin/events")
      router.refresh()
    } catch (err: any) {
      console.error("Error saving event:", err)
      setError(err.message || "An error occurred while saving the event")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEdit ? "Edit Event" : "Add New Event"}</CardTitle>
      </CardHeader>
      <CardContent>
        {error && <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md text-red-600">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload */}
          <ImageUpload
            value={formData.image_url}
            onChange={(url) => setFormData({ ...formData, image_url: url })}
            label="Event Image (Optional)"
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

          {/* Event Date and Location */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="event_date">Event Date & Time</Label>
              <Input
                id="event_date"
                type="datetime-local"
                value={formData.event_date}
                onChange={(e) => setFormData({ ...formData, event_date: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location_en">Location (English)</Label>
              <Input
                id="location_en"
                value={formData.location_en}
                onChange={(e) => setFormData({ ...formData, location_en: e.target.value })}
              />
            </div>
          </div>

          {/* Location Amharic */}
          <div className="space-y-2">
            <Label htmlFor="location_am">Location (Amharic)</Label>
            <Input
              id="location_am"
              value={formData.location_am}
              onChange={(e) => setFormData({ ...formData, location_am: e.target.value })}
            />
          </div>

          {/* Descriptions */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="description_en">Short Description (English)</Label>
              <Textarea
                id="description_en"
                value={formData.description_en}
                onChange={(e) => setFormData({ ...formData, description_en: e.target.value })}
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description_am">Short Description (Amharic)</Label>
              <Textarea
                id="description_am"
                value={formData.description_am}
                onChange={(e) => setFormData({ ...formData, description_am: e.target.value })}
                rows={3}
              />
            </div>
          </div>

          {/* Full Content */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="content_en">Full Content (English)</Label>
              <Textarea
                id="content_en"
                value={formData.content_en}
                onChange={(e) => setFormData({ ...formData, content_en: e.target.value })}
                rows={6}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content_am">Full Content (Amharic)</Label>
              <Textarea
                id="content_am"
                value={formData.content_am}
                onChange={(e) => setFormData({ ...formData, content_am: e.target.value })}
                rows={6}
              />
            </div>
          </div>

          {/* Published Status */}
          <div className="space-y-2">
            <Label>Publication Status</Label>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="is_published"
                checked={formData.is_published}
                onCheckedChange={(checked) => setFormData({ ...formData, is_published: checked as boolean })}
              />
              <Label htmlFor="is_published" className="text-sm font-normal">
                Publish this event
              </Label>
            </div>
          </div>

          <div className="flex space-x-4">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : isEdit ? "Update Event" : "Create Event"}
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

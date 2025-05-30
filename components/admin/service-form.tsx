"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { supabase } from "@/lib/supabase"
import { Plus, X } from "lucide-react"

interface ServiceFormProps {
  service?: {
    id: string
    title: string
    title_am?: string
    description: string
    description_am?: string
    required_documents?: string[]
  }
  isEdit?: boolean
}

export default function ServiceForm({ service, isEdit = false }: ServiceFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: service?.title || "",
    title_am: service?.title_am || "",
    description: service?.description || "",
    description_am: service?.description_am || "",
    required_documents: service?.required_documents || [],
  })
  const [newDocument, setNewDocument] = useState("")
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      if (isEdit && service) {
        const { error: updateError } = await supabase.from("services").update(formData).eq("id", service.id)
        if (updateError) throw updateError
      } else {
        const { error: insertError } = await supabase.from("services").insert([formData])
        if (insertError) throw insertError
      }

      router.push("/admin/services")
      router.refresh()
    } catch (err: any) {
      console.error("Error saving service:", err)
      setError(err.message || "An error occurred while saving the service")
    } finally {
      setIsSubmitting(false)
    }
  }

  const addDocument = () => {
    if (newDocument.trim()) {
      setFormData({
        ...formData,
        required_documents: [...formData.required_documents, newDocument.trim()],
      })
      setNewDocument("")
    }
  }

  const removeDocument = (index: number) => {
    setFormData({
      ...formData,
      required_documents: formData.required_documents.filter((_, i) => i !== index),
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEdit ? "Edit Service" : "Add New Service"}</CardTitle>
      </CardHeader>
      <CardContent>
        {error && <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md text-red-600">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
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

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="description">Description (English)</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description_am">Description (Amharic)</Label>
              <Textarea
                id="description_am"
                value={formData.description_am}
                onChange={(e) => setFormData({ ...formData, description_am: e.target.value })}
                rows={4}
              />
            </div>
          </div>

          <div className="space-y-4">
            <Label>Required Documents</Label>
            <div className="flex space-x-2">
              <Input
                value={newDocument}
                onChange={(e) => setNewDocument(e.target.value)}
                placeholder="Add required document"
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addDocument())}
              />
              <Button type="button" onClick={addDocument} variant="outline">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {formData.required_documents.length > 0 && (
              <div className="space-y-2">
                {formData.required_documents.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                    <span className="text-sm">{doc}</span>
                    <Button type="button" variant="ghost" size="sm" onClick={() => removeDocument(index)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex space-x-4">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : isEdit ? "Update Service" : "Create Service"}
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

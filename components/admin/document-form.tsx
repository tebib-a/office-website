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
import { Upload } from "lucide-react"

interface DocumentFormProps {
  document?: {
    id: string
    title: string
    title_am?: string
    description?: string
    description_am?: string
    file_url: string
    file_name?: string
    file_type: string
    file_size?: number
    category: string
    is_active: boolean
  }
  isEdit?: boolean
}

export default function DocumentForm({ document, isEdit = false }: DocumentFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: document?.title || "",
    title_am: document?.title_am || "",
    description: document?.description || "",
    description_am: document?.description_am || "",
    file_url: document?.file_url || "",
    file_name: document?.file_name || "",
    file_type: document?.file_type || "pdf",
    file_size: document?.file_size || 0,
    category: document?.category || "general",
    is_active: document?.is_active ?? true,
  })
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      if (isEdit && document) {
        const { error: updateError } = await supabase.from("documents").update(formData).eq("id", document.id)
        if (updateError) throw updateError
      } else {
        const { error: insertError } = await supabase.from("documents").insert([formData])
        if (insertError) throw insertError
      }

      router.push("/admin/documents")
      router.refresh()
    } catch (err: any) {
      console.error("Error saving document:", err)
      setError(err.message || "An error occurred while saving the document")
    } finally {
      setIsSubmitting(false)
    }
  }

  const categories = [
    { value: "general", label: "General" },
    { value: "forms", label: "Forms" },
    { value: "guidelines", label: "Guidelines" },
    { value: "policies", label: "Policies" },
    { value: "reports", label: "Reports" },
    { value: "manuals", label: "Manuals" },
  ]

  const fileTypes = [
    { value: "pdf", label: "PDF" },
    { value: "doc", label: "Word Document" },
    { value: "docx", label: "Word Document (DOCX)" },
    { value: "xls", label: "Excel" },
    { value: "xlsx", label: "Excel (XLSX)" },
    { value: "txt", label: "Text File" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEdit ? "Edit Document" : "Add New Document"}</CardTitle>
      </CardHeader>
      <CardContent>
        {error && <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md text-red-600">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* File Upload */}
          <div className="space-y-2">
            <Label htmlFor="file_url">Document File</Label>
            <div className="space-y-2">
              <div className="flex space-x-2">
                <Input type="file" accept=".pdf,.doc,.docx,.xls,.xlsx,.txt" className="flex-1" />
                <Button type="button" variant="outline">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload
                </Button>
              </div>
              <div className="text-center text-sm text-gray-500">OR</div>
              <Input
                id="file_url"
                value={formData.file_url}
                onChange={(e) => setFormData({ ...formData, file_url: e.target.value })}
                placeholder="Enter document URL"
                required
              />
            </div>
          </div>

          {/* File Details */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="file_name">File Name</Label>
              <Input
                id="file_name"
                value={formData.file_name}
                onChange={(e) => setFormData({ ...formData, file_name: e.target.value })}
                placeholder="document.pdf"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="file_type">File Type</Label>
              <select
                id="file_type"
                value={formData.file_type}
                onChange={(e) => setFormData({ ...formData, file_type: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {fileTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="file_size">File Size (bytes)</Label>
              <Input
                id="file_size"
                type="number"
                value={formData.file_size}
                onChange={(e) => setFormData({ ...formData, file_size: Number.parseInt(e.target.value) || 0 })}
                placeholder="1024000"
              />
            </div>
          </div>

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

          {/* Descriptions */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="description">Description (English)</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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

          {/* Category and Status */}
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
              <Label>Status</Label>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="is_active"
                  checked={formData.is_active}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked as boolean })}
                />
                <Label htmlFor="is_active" className="text-sm font-normal">
                  Active Document
                </Label>
              </div>
            </div>
          </div>

          <div className="flex space-x-4">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : isEdit ? "Update Document" : "Add Document"}
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

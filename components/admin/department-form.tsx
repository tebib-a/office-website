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

interface DepartmentFormProps {
  department?: {
    id: string
    name_en: string
    name_am?: string
    description_en?: string
    description_am?: string
    order_index: number
  }
  isEdit?: boolean
}

export default function DepartmentForm({ department, isEdit = false }: DepartmentFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name_en: department?.name_en || "",
    name_am: department?.name_am || "",
    description_en: department?.description_en || "",
    description_am: department?.description_am || "",
    order_index: department?.order_index || 1,
  })
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      if (isEdit && department) {
        const { error: updateError } = await supabase.from("departments").update(formData).eq("id", department.id)
        if (updateError) throw updateError
      } else {
        const { error: insertError } = await supabase.from("departments").insert([formData])
        if (insertError) throw insertError
      }

      router.push("/admin/departments")
      router.refresh()
    } catch (err: any) {
      console.error("Error saving department:", err)
      setError(err.message || "An error occurred while saving the department")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEdit ? "Edit Department" : "Add New Department"}</CardTitle>
      </CardHeader>
      <CardContent>
        {error && <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md text-red-600">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Names */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name_en">Department Name (English)</Label>
              <Input
                id="name_en"
                value={formData.name_en}
                onChange={(e) => setFormData({ ...formData, name_en: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name_am">Department Name (Amharic)</Label>
              <Input
                id="name_am"
                value={formData.name_am}
                onChange={(e) => setFormData({ ...formData, name_am: e.target.value })}
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
                rows={4}
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

          {/* Order Index */}
          <div className="space-y-2">
            <Label htmlFor="order_index">Display Order</Label>
            <Input
              id="order_index"
              type="number"
              min="1"
              value={formData.order_index}
              onChange={(e) => setFormData({ ...formData, order_index: Number.parseInt(e.target.value) || 1 })}
              required
            />
            <p className="text-sm text-gray-500">Lower numbers appear first in the department list</p>
          </div>

          <div className="flex space-x-4">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : isEdit ? "Update Department" : "Create Department"}
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

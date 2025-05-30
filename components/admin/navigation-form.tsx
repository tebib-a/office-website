"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { supabase } from "@/lib/supabase"

interface NavigationFormProps {
  navigationItem?: {
    id: string
    title_en: string
    title_am?: string
    url: string
    order_index: number
    parent_id?: string | null
  }
  isEdit?: boolean
}

export default function NavigationForm({ navigationItem, isEdit = false }: NavigationFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [parentItems, setParentItems] = useState<any[]>([])
  const [formData, setFormData] = useState({
    title_en: navigationItem?.title_en || "",
    title_am: navigationItem?.title_am || "",
    url: navigationItem?.url || "",
    order_index: navigationItem?.order_index || 1,
    parent_id: navigationItem?.parent_id || null,
  })
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchParentItems()
  }, [])

  const fetchParentItems = async () => {
    try {
      const { data } = await supabase
        .from("navigation_items")
        .select("id, title_en")
        .is("parent_id", null)
        .order("order_index")
      setParentItems(data || [])
    } catch (error) {
      console.error("Error fetching parent items:", error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const submitData = {
        ...formData,
        parent_id: formData.parent_id || null,
      }

      if (isEdit && navigationItem) {
        const { error: updateError } = await supabase
          .from("navigation_items")
          .update(submitData)
          .eq("id", navigationItem.id)
        if (updateError) throw updateError
      } else {
        const { error: insertError } = await supabase.from("navigation_items").insert([submitData])
        if (insertError) throw insertError
      }

      router.push("/admin/navigation")
      router.refresh()
    } catch (err: any) {
      console.error("Error saving navigation item:", err)
      setError(err.message || "An error occurred while saving the navigation item")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEdit ? "Edit Navigation Item" : "Add New Navigation Item"}</CardTitle>
      </CardHeader>
      <CardContent>
        {error && <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md text-red-600">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Titles */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title_en">Menu Title (English)</Label>
              <Input
                id="title_en"
                value={formData.title_en}
                onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="title_am">Menu Title (Amharic)</Label>
              <Input
                id="title_am"
                value={formData.title_am}
                onChange={(e) => setFormData({ ...formData, title_am: e.target.value })}
              />
            </div>
          </div>

          {/* URL */}
          <div className="space-y-2">
            <Label htmlFor="url">URL</Label>
            <Input
              id="url"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              placeholder="/about or https://external-link.com"
              required
            />
            <p className="text-sm text-gray-500">
              Use relative URLs (e.g., /about) for internal pages or full URLs for external links
            </p>
          </div>

          {/* Parent and Order */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="parent_id">Parent Menu (Optional)</Label>
              <select
                id="parent_id"
                value={formData.parent_id || ""}
                onChange={(e) => setFormData({ ...formData, parent_id: e.target.value || null })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">No Parent (Top Level)</option>
                {parentItems.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.title_en}
                  </option>
                ))}
              </select>
            </div>
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
              <p className="text-sm text-gray-500">Lower numbers appear first in the menu</p>
            </div>
          </div>

          <div className="flex space-x-4">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : isEdit ? "Update Menu Item" : "Create Menu Item"}
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

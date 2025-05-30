"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { supabase } from "@/lib/supabase"

interface HeroContentFormProps {
  heroContent: {
    id: string
    office_name_en: string
    office_name_am: string
    slogan_en: string
    slogan_am: string
    logo_url?: string
  } | null
}

export default function HeroContentForm({ heroContent }: HeroContentFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    office_name_en: heroContent?.office_name_en || "",
    office_name_am: heroContent?.office_name_am || "",
    slogan_en: heroContent?.slogan_en || "",
    slogan_am: heroContent?.slogan_am || "",
    logo_url: heroContent?.logo_url || "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      if (heroContent) {
        const { error } = await supabase.from("hero_content").update(formData).eq("id", heroContent.id)
        if (error) throw error
      } else {
        const { error } = await supabase.from("hero_content").insert([formData])
        if (error) throw error
      }

      alert("Settings updated successfully!")
    } catch (error) {
      console.error("Error updating settings:", error)
      alert("Error updating settings")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Hero Section Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="office_name_en">Office Name (English)</Label>
              <Input
                id="office_name_en"
                value={formData.office_name_en}
                onChange={(e) => setFormData({ ...formData, office_name_en: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="office_name_am">Office Name (Amharic)</Label>
              <Input
                id="office_name_am"
                value={formData.office_name_am}
                onChange={(e) => setFormData({ ...formData, office_name_am: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="slogan_en">Slogan (English)</Label>
              <Input
                id="slogan_en"
                value={formData.slogan_en}
                onChange={(e) => setFormData({ ...formData, slogan_en: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slogan_am">Slogan (Amharic)</Label>
              <Input
                id="slogan_am"
                value={formData.slogan_am}
                onChange={(e) => setFormData({ ...formData, slogan_am: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="logo_url">Logo URL (Optional)</Label>
            <Input
              id="logo_url"
              value={formData.logo_url}
              onChange={(e) => setFormData({ ...formData, logo_url: e.target.value })}
              placeholder="https://example.com/logo.png"
            />
          </div>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Settings"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

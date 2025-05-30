"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, X } from "lucide-react"

interface ImageUploadProps {
  value: string
  onChange: (url: string) => void
  label?: string
  preview?: boolean
}

export default function ImageUpload({ value, onChange, label = "Image", preview = true }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // For now, we'll use a placeholder URL
      // In a real app, you'd upload to a service like Supabase Storage
      const fakeUrl = `https://picsum.photos/800/600?random=${Date.now()}`
      onChange(fakeUrl)
    }
  }

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }

  const clearImage = () => {
    onChange("")
  }

  return (
    <div className="space-y-4">
      <Label>{label}</Label>

      {/* File Upload */}
      <div className="space-y-2">
        <div className="flex space-x-2">
          <Input type="file" accept="image/*" onChange={handleFileSelect} className="flex-1" />
          <Button type="button" variant="outline" disabled={isUploading}>
            <Upload className="h-4 w-4 mr-2" />
            Upload
          </Button>
        </div>

        {/* OR URL Input */}
        <div className="text-center text-sm text-gray-500">OR</div>
        <Input type="url" placeholder="Enter image URL" value={value} onChange={handleUrlChange} />
      </div>

      {/* Preview */}
      {preview && value && (
        <div className="relative inline-block">
          <img src={value || "/placeholder.svg"} alt="Preview" className="w-32 h-24 object-cover rounded-lg border" />
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
            onClick={clearImage}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      )}
    </div>
  )
}

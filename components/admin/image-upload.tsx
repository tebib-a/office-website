"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, X, ExternalLink } from "lucide-react"

interface ImageUploadProps {
  value: string
  onChange: (url: string) => void
  label?: string
  preview?: boolean
}

export default function ImageUpload({ value, onChange, label = "Image", preview = true }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [previewError, setPreviewError] = useState(false)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setIsUploading(true)
      // Simulate upload - in real app, upload to Supabase Storage
      setTimeout(() => {
        const fakeUrl = `https://picsum.photos/800/600?random=${Date.now()}`
        onChange(fakeUrl)
        setIsUploading(false)
        setPreviewError(false)
      }, 1000)
    }
  }

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
    setPreviewError(false)
  }

  const clearImage = () => {
    onChange("")
    setPreviewError(false)
  }

  const handleImageError = () => {
    setPreviewError(true)
  }

  return (
    <div className="space-y-4">
      <Label>{label}</Label>

      {/* File Upload */}
      <div className="space-y-2">
        <div className="flex space-x-2">
          <Input type="file" accept="image/*" onChange={handleFileSelect} className="flex-1" disabled={isUploading} />
          <Button type="button" variant="outline" disabled={isUploading}>
            <Upload className="h-4 w-4 mr-2" />
            {isUploading ? "Uploading..." : "Upload"}
          </Button>
        </div>

        {/* OR URL Input */}
        <div className="text-center text-sm text-gray-500">OR</div>
        <div className="flex space-x-2">
          <Input type="url" placeholder="Enter image URL" value={value} onChange={handleUrlChange} className="flex-1" />
          {value && (
            <Button type="button" variant="outline" size="sm" onClick={() => window.open(value, "_blank")}>
              <ExternalLink className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Preview */}
      {preview && value && !previewError && (
        <div className="relative inline-block">
          <img
            src={value || "/placeholder.svg"}
            alt="Preview"
            className="w-32 h-24 object-cover rounded-lg border"
            onError={handleImageError}
          />
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

      {/* Error State */}
      {preview && value && previewError && (
        <div className="w-32 h-24 bg-gray-100 border border-gray-300 rounded-lg flex items-center justify-center relative">
          <div className="text-center">
            <div className="text-gray-400 text-xs">Failed to load</div>
            <div className="text-gray-400 text-xs">image</div>
          </div>
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

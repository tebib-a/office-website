"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useLanguage } from "@/contexts/language-context"
import { Search, Filter } from "lucide-react"

interface GalleryItem {
  id: string
  title_en: string
  title_am?: string
  description_en?: string
  description_am?: string
  image_url: string
  category: string
  is_featured: boolean
  created_at: string
}

interface GalleryClientProps {
  gallery: GalleryItem[]
}

export default function GalleryClient({ gallery }: GalleryClientProps) {
  const { language, t } = useLanguage()
  const [filteredGallery, setFilteredGallery] = useState<GalleryItem[]>(gallery)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [categories, setCategories] = useState<string[]>([])

  useEffect(() => {
    // Extract unique categories
    const uniqueCategories = [...new Set(gallery.map((item) => item.category))]
    setCategories(uniqueCategories)
  }, [gallery])

  useEffect(() => {
    filterGallery()
  }, [gallery, searchTerm, selectedCategory, language])

  const filterGallery = () => {
    let filtered = gallery

    if (searchTerm) {
      filtered = filtered.filter((item) =>
        (language === "en" ? item.title_en : item.title_am || item.title_en)
          .toLowerCase()
          .includes(searchTerm.toLowerCase()),
      )
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter((item) => item.category === selectedCategory)
    }

    setFilteredGallery(filtered)
  }

  return (
    <main>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">{t("gallery")}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {language === "en"
              ? "Browse through our collection of photos showcasing our office, events, and community activities."
              : "የእኛን ቢሮ፣ ዝግጅቶች እና የማህበረሰብ እንቅስቃሴዎችን የሚያሳዩ የፎቶ ስብስባችንን ይመልከቱ።"}
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center space-x-2 w-full md:w-auto">
              <Search className="h-5 w-5 text-gray-400" />
              <Input
                placeholder={language === "en" ? "Search images..." : "ምስሎችን ይፈልጉ..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-64"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">{language === "en" ? "All Categories" : "ሁሉም ምድቦች"}</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredGallery.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-gray-600">{language === "en" ? "No images found." : "ምንም ምስሎች አልተገኙም።"}</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredGallery.map((item) => (
                <Card key={item.id} className="group overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={item.image_url || "/placeholder.svg"}
                      alt={language === "en" ? item.title_en : item.title_am || item.title_en}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {language === "en" ? item.title_en : item.title_am || item.title_en}
                    </h3>
                    {(item.description_en || item.description_am) && (
                      <p className="text-gray-600 text-sm">
                        {language === "en" ? item.description_en : item.description_am || item.description_en}
                      </p>
                    )}
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{item.category}</span>
                      {item.is_featured && (
                        <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">
                          {language === "en" ? "Featured" : "ተመራጭ"}
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

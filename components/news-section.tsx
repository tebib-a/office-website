"use client"

import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

interface NewsItem {
  id: string
  title: string
  title_am: string
  body: string
  body_am: string
  image_url?: string
  created_at: string
  published: boolean
}

interface NewsSectionProps {
  news: NewsItem[]
}

export default function NewsSection({ news }: NewsSectionProps) {
  const { language, t } = useLanguage()

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(language === "en" ? "en-US" : "am-ET", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const truncateText = (text: string | undefined | null, maxLength = 120) => {
    if (!text) return ""
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + "..."
  }

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-6 mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900">
            {language === "en" ? "Our Stories" : "የእኛ ታሪኮች"}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {language === "en"
              ? "Stay updated with the latest news and announcements from our office."
              : "ከቢሮአችን የሚወጡ የቅርብ ጊዜ ዜናዎችና ማስታወቂያዎች ይከታተሉ።"}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.slice(0, 3).map((item) => (
            <Card key={item.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-0">
              {item.image_url && (
                <div className="aspect-video overflow-hidden">
                  <img
                    src={item.image_url || "/placeholder.svg"}
                    alt={language === "en" ? item.title : item.title_am}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <CardContent className="p-6 space-y-4">
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-slate-900 leading-tight group-hover:text-blue-600 transition-colors duration-300">
                    {language === "en" ? item.title : item.title_am}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {truncateText(language === "en" ? item.body : item.body_am)}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-sm text-gray-500">{formatDate(item.created_at)}</span>
                  <Link
                    href={`/news/${item.id}`}
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm group-hover:translate-x-1 transition-transform duration-300"
                  >
                    <span>{t("readMore")}</span>
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white"
          >
            <Link href="/news" className="flex items-center space-x-2">
              <span>{language === "en" ? "EXPLORE ALL STORIES" : "ሁሉንም ታሪኮች ይመልከቱ"}</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

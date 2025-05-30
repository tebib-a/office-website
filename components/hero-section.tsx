"use client"

import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

interface HeroContent {
  office_name_en: string
  office_name_am: string
  slogan_en: string
  slogan_am: string
  logo_url?: string
}

interface HeroSectionProps {
  heroContent: HeroContent
}

export default function HeroSection({ heroContent }: HeroSectionProps) {
  const { language, t } = useLanguage()

  const officeName = language === "en" ? heroContent.office_name_en : heroContent.office_name_am
  const slogan = language === "en" ? heroContent.slogan_en : heroContent.slogan_am

  return (
    <section className="relative bg-slate-900 text-white min-h-[80vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-900/70 z-10"></div>
        <img
          src="/placeholder.svg?height=800&width=1200"
          alt="Office Building"
          className="w-full h-full object-cover opacity-30"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                {language === "en" ? (
                  <>
                    We are
                    <br />
                    <span className="text-blue-400">{officeName}'s</span>
                    <br />
                    first line of
                    <br />
                    service
                  </>
                ) : (
                  <>
                    እኛ የ
                    <br />
                    <span className="text-blue-400">{officeName}</span>
                    <br />
                    የመጀመሪያ
                    <br />
                    አገልግሎት መስመር ነን
                  </>
                )}
              </h1>

              <div className="w-16 h-1 bg-red-600"></div>

              <p className="text-xl text-gray-300 leading-relaxed max-w-lg">
                {language === "en"
                  ? "We accomplish what others cannot accomplish and go where others cannot go. Serving our community with excellence and dedication."
                  : "ሌሎች ሊያደርጉት የማይችሉትን እናደርጋለን እና ሌሎች መሄድ የማይችሉበት እንሄዳለን። ማህበረሰባችንን በላቀ ሁኔታ እና በቁርጠኝነት እናገለግላለን።"}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8">
                <Link href="/services" className="flex items-center space-x-2">
                  <span>{language === "en" ? "FIND YOUR SERVICE" : "አገልግሎትዎን ያግኙ"}</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Right side - can be used for additional content or kept minimal */}
          <div className="hidden lg:block">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex space-x-2">
          <div className="w-2 h-2 bg-white rounded-full"></div>
          <div className="w-2 h-2 bg-white/50 rounded-full"></div>
          <div className="w-2 h-2 bg-white/50 rounded-full"></div>
        </div>
      </div>
    </section>
  )
}

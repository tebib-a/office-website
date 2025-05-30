"use client"

import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

interface Service {
  id: string
  title: string
  title_am: string
  description: string
  description_am: string
}

interface ServicesSectionProps {
  services: Service[]
}

export default function ServicesSection({ services }: ServicesSectionProps) {
  const { language, t } = useLanguage()

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
                <div className="w-8 h-8 bg-slate-900 rounded-full"></div>
              </div>

              <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
                {language === "en" ? "Our Services" : "የእኛ አገልግሎቶች"}
              </h2>

              <p className="text-xl text-gray-600 leading-relaxed">
                {language === "en"
                  ? "We provide comprehensive services to meet your needs with efficiency and professionalism. Our dedicated team ensures quality service delivery."
                  : "በብቃትና በሙያዊነት የእርስዎን ፍላጎት ለማሟላት ሁሉንም አቀፍ አገልግሎቶች እንሰጣለን። የእኛ ቁርጠኛ ቡድን ጥራት ያለው አገልግሎት እንዲሰጥ ያረጋግጣል።"}
              </p>
            </div>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white"
            >
              <Link href="/services" className="flex items-center space-x-2">
                <span>{language === "en" ? "LEARN ABOUT US" : "ስለ እኛ ይወቁ"}</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>

          {/* Right side - Services Grid */}
          <div className="space-y-6">
            {services.slice(0, 4).map((service, index) => (
              <Card key={service.id} className="border-0 shadow-sm hover:shadow-md transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 font-bold text-lg">{index + 1}</span>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-slate-900">
                        {language === "en" ? service.title : service.title_am}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {language === "en" ? service.description : service.description_am}
                      </p>
                      <Link
                        href={`/services/${service.id}`}
                        className="inline-flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        <span>{t("readMore")}</span>
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

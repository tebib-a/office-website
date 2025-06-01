"use client"

import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Target, Award, Building } from "lucide-react"
import Link from "next/link"

interface Department {
  id: string
  name_en: string
  name_am: string
  description_en?: string
  description_am?: string
  order_index: number
}

interface AboutContentProps {
  heroContent: {
    office_name_en: string
    office_name_am: string
    slogan_en: string
    slogan_am: string
    logo_url?: string
  }
  departments: Department[]
}

export default function AboutContent({ heroContent, departments }: AboutContentProps) {
  const { language } = useLanguage()

  const officeName = language === "en" ? heroContent.office_name_en : heroContent.office_name_am

  const values = [
    {
      icon: Target,
      title: language === "en" ? "Our Mission" : "የእኛ ተልእኮ",
      description:
        language === "en"
          ? "To provide efficient, transparent, and accessible government services that meet the needs of our community while maintaining the highest standards of integrity and professionalism."
          : "ለማህበረሰባችን ፍላጎት የሚያሟሉ ውጤታማ፣ ግልጽ እና ተደራሽ የመንግስት አገልግሎቶችን በማቅረብ የታማኝነት እና የሙያዊነት ከፍተኛ ደረጃዎችን በመጠበቅ።",
    },
    {
      icon: Award,
      title: language === "en" ? "Our Vision" : "የእኛ ራዕይ",
      description:
        language === "en"
          ? "To be a leading government office recognized for excellence in service delivery, innovation in public administration, and commitment to citizen satisfaction."
          : "በአገልግሎት አሰጣጥ ላይ በላቀ ሁኔታ፣ በህዝብ አስተዳደር ውስጥ በፈጠራ እና በዜጎች እርካታ ላይ በቁርጠኝነት የሚታወቅ መሪ የመንግስት ቢሮ መሆን።",
    },
    {
      icon: Users,
      title: language === "en" ? "Our Values" : "የእኛ እሴቶች",
      description:
        language === "en"
          ? "Integrity, transparency, accountability, respect for diversity, continuous improvement, and unwavering commitment to serving the public interest with dedication and professionalism."
          : "ታማኝነት፣ ግልጽነት፣ ተጠያቂነት፣ ለልዩነት ክብር፣ ቀጣይ መሻሻል እና የህዝብ ጥቅምን በቁርጠኝነት እና በሙያዊነት ለማገልገል የማይናወጥ ቁርጠኝነት።",
    },
  ]

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <h1 className="text-4xl lg:text-6xl font-bold">{language === "en" ? "About Our Office" : "ስለ ቢሮአችን"}</h1>
            <div className="w-24 h-1 bg-blue-400 mx-auto"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {language === "en"
                ? "Learn about our mission, vision, and commitment to serving our community with excellence and integrity."
                : "ስለ ተልእኮአችን፣ ራዕያችን እና ማህበረሰባችንን በላቀ ሁኔታ እና በታማኝነት ለማገልገል ስላለን ቁርጠኝነት ይወቁ።"}
            </p>
          </div>
        </div>
      </section>

      {/* Office Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">
                  {language === "en" ? "Serving Our Community" : "ማህበረሰባችንን እናገለግላለን"}
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {language === "en"
                    ? "Our office has been at the forefront of public service delivery, working tirelessly to ensure that every citizen receives the support and services they need. We are committed to transparency, efficiency, and continuous improvement in all our operations."
                    : "ቢሮአችን በህዝብ አገልግሎት አሰጣጥ ግንባር ቀደም ሆኖ እያንዳንዱ ዜጋ የሚያስፈልገውን ድጋፍ እና አገልግሎት እንዲያገኝ ሳንሰለች እንሰራለን። በሁሉም ስራዎቻችን ላይ ለግልጽነት፣ ለውጤታማነት እና ለቀጣይ መሻሻል ቁርጠኞች ነን።"}
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {language === "en"
                    ? "Through innovative approaches and dedicated teamwork, we strive to make government services more accessible, efficient, and responsive to the evolving needs of our community."
                    : "በፈጠራ አቀራረቦች እና በቁርጠኛ የቡድን ስራ የመንግስት አገልግሎቶችን የበለጠ ተደራሽ፣ ውጤታማ እና ለማህበረሰባችን እየተለዋወጡ ላሉ ፍላጎቶች ምላሽ ሰጪ ለማድረግ እንጥራለን።"}
                </p>
              </div>

              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Link href="/contact">{language === "en" ? "Get in Touch" : "ያግኙን"}</Link>
              </Button>
            </div>

            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-blue-100 to-slate-100 rounded-2xl flex items-center justify-center">
                {heroContent.logo_url ? (
                  <img
                    src={heroContent.logo_url || "/placeholder.svg"}
                    alt={officeName}
                    className="h-48 w-48 object-contain"
                  />
                ) : (
                  <div className="text-center space-y-4">
                    <div className="h-32 w-32 bg-blue-600 rounded-full flex items-center justify-center mx-auto">
                      <Building className="h-16 w-16 text-white" />
                    </div>
                    <p className="text-slate-600 font-medium text-lg">{officeName}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">
              {language === "en" ? "Our Foundation" : "የእኛ መሰረት"}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {language === "en"
                ? "The principles and values that guide our work and define our commitment to excellence."
                : "ስራችንን የሚመሩ እና ለላቀነት ያለንን ቁርጠኝነት የሚገልጹ መርሆዎች እና እሴቶች።"}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8 text-center space-y-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                    <value.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Departments Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">
              {language === "en" ? "Our Organization" : "የእኛ ድርጅት"}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {language === "en"
                ? "Our departments work together to provide comprehensive services and support to our community."
                : "ክፍሎቻችን ለማህበረሰባችን ሁሉንም አቀፍ አገልግሎቶች እና ድጋፍ ለመስጠት በጋራ ይሰራሉ።"}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {departments.map((department, index) => (
              <Card key={department.id} className="border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-slate-600 font-bold text-lg">{index + 1}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900">
                      {language === "en" ? department.name_en : department.name_am}
                    </h3>
                  </div>
                  {(department.description_en || department.description_am) && (
                    <p className="text-gray-600 leading-relaxed">
                      {language === "en" ? department.description_en : department.description_am}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold">
              {language === "en" ? "Ready to Get Started?" : "ለመጀመር ዝግጁ ነዎት?"}
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              {language === "en"
                ? "Contact us today to learn more about our services or to get assistance with your needs."
                : "ስለ አገልግሎቶቻችን የበለጠ ለማወቅ ወይም ለፍላጎቶችዎ እርዳታ ለማግኘት ዛሬ ያግኙን።"}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Link href="/services">{language === "en" ? "Our Services" : "አገልግሎቶቻችን"}</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-slate-900"
              >
                <Link href="/contact">{language === "en" ? "Contact Us" : "ያግኙን"}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

"use client"

import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, FileText, Users, Clock, Shield, Globe, Phone } from "lucide-react"
import Link from "next/link"

interface Service {
  id: string
  title: string
  title_am: string
  description: string
  description_am: string
  created_at: string
}

interface ServicesContentProps {
  services: Service[]
}

export default function ServicesContent({ services }: ServicesContentProps) {
  const { language } = useLanguage()

  const getServiceIcon = (index: number) => {
    const icons = [FileText, Users, Clock, Shield, Globe, Phone]
    const Icon = icons[index % icons.length]
    return <Icon className="h-8 w-8 text-blue-600" />
  }

  const featuredServices = [
    {
      icon: FileText,
      title: language === "en" ? "Document Services" : "የሰነድ አገልግሎቶች",
      description:
        language === "en"
          ? "Official document processing, certification, and verification services for citizens and businesses."
          : "ለዜጎች እና ለንግድ ድርጅቶች ይፋዊ የሰነድ ሂደት፣ የምስክር ወረቀት እና የማረጋገጫ አገልግሎቶች።",
    },
    {
      icon: Users,
      title: language === "en" ? "Citizen Services" : "የዜጎች አገልግሎቶች",
      description:
        language === "en"
          ? "Comprehensive support and assistance for various citizen needs and government interactions."
          : "ለተለያዩ የዜጎች ፍላጎቶች እና የመንግስት ግንኙነቶች ሁሉንም አቀፍ ድጋፍ እና እርዳታ።",
    },
    {
      icon: Shield,
      title: language === "en" ? "Legal Services" : "የህግ አገልግሎቶች",
      description:
        language === "en"
          ? "Legal consultation, compliance assistance, and regulatory guidance for individuals and organizations."
          : "ለግለሰቦች እና ድርጅቶች የህግ ምክር፣ የመታዘዝ እርዳታ እና የደንብ መመሪያ።",
    },
  ]

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <h1 className="text-4xl lg:text-6xl font-bold">{language === "en" ? "Our Services" : "የእኛ አገልግሎቶች"}</h1>
            <div className="w-24 h-1 bg-blue-400 mx-auto"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {language === "en"
                ? "Comprehensive government services designed to meet your needs with efficiency, transparency, and professionalism."
                : "በውጤታማነት፣ በግልጽነት እና በሙያዊነት የእርስዎን ፍላጎት ለማሟላት የተነደፉ ሁሉንም አቀፍ የመንግስት አገልግሎቶች።"}
            </p>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">
              {language === "en" ? "Featured Services" : "ዋና አገልግሎቶች"}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {language === "en"
                ? "Our most popular and essential services that serve the core needs of our community."
                : "የማህበረሰባችንን ዋና ፍላጎቶች የሚያገለግሉ በጣም ተወዳጅ እና አስፈላጊ አገልግሎቶቻችን።"}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredServices.map((service, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-8 text-center space-y-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto group-hover:bg-blue-600 transition-colors duration-300">
                    <service.icon className="h-8 w-8 text-blue-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{service.description}</p>
                  <Button variant="ghost" className="text-blue-600 hover:text-blue-700">
                    {language === "en" ? "Learn More" : "የበለጠ ይወቁ"}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* All Services */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">
              {language === "en" ? "All Services" : "ሁሉም አገልግሎቶች"}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {language === "en"
                ? "Browse our complete range of services available to citizens and organizations."
                : "ለዜጎች እና ድርጅቶች የሚገኙ ሙሉ የአገልግሎቶች ክልላችንን ይመልከቱ።"}
            </p>
          </div>

          {services.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <Card key={service.id} className="border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        {getServiceIcon(index)}
                      </div>
                      <CardTitle className="text-lg font-semibold text-slate-900">
                        {language === "en" ? service.title : service.title_am}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-600 leading-relaxed">
                      {language === "en" ? service.description : service.description_am}
                    </p>
                    <Button asChild variant="ghost" className="p-0 h-auto text-blue-600 hover:text-blue-700 group">
                      <Link href={`/services/${service.id}`} className="flex items-center space-x-2">
                        <span>{language === "en" ? "Learn More" : "የበለጠ ይወቁ"}</span>
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-4">
                {language === "en" ? "No Services Available" : "ምንም አገልግሎቶች የሉም"}
              </h3>
              <p className="text-gray-500">
                {language === "en"
                  ? "Services will be displayed here once they are added by the administrator."
                  : "አገልግሎቶች በአስተዳዳሪ ከተጨመሩ በኋላ እዚህ ይታያሉ።"}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold">{language === "en" ? "Need Assistance?" : "እርዳታ ይፈልጋሉ?"}</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              {language === "en"
                ? "Our team is here to help you navigate our services and find the support you need."
                : "ቡድናችን አገልግሎቶቻችንን እንዲያሰሱ እና የሚፈልጉትን ድጋፍ እንዲያገኙ ለመርዳት እዚህ አለ።"}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Link href="/contact">{language === "en" ? "Contact Us" : "ያግኙን"}</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-slate-900"
              >
                <Link href="/about">{language === "en" ? "About Us" : "ስለ እኛ"}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

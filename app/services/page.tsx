import { createServerClient } from "@/lib/supabase"
import Header from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Users, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"

async function getPageData() {
  const supabase = createServerClient()

  const [{ data: heroContent }, { data: navigationItems }, { data: services }] = await Promise.all([
    supabase.from("hero_content").select("*").single(),
    supabase.from("navigation_items").select("*").order("order_index"),
    supabase.from("services").select("*"),
  ])

  return {
    heroContent: heroContent || {
      office_name_en: "Office Name",
      office_name_am: "የቢሮ ስም",
      slogan_en: "Your trusted partner",
      slogan_am: "የእርስዎ የታመነ አጋር",
    },
    navigationItems: navigationItems || [],
    services: services || [],
  }
}

export default async function ServicesPage() {
  const { heroContent, navigationItems, services } = await getPageData()

  const getServiceIcon = (index: number) => {
    const icons = [FileText, Users, Clock]
    const Icon = icons[index % icons.length]
    return <Icon className="h-8 w-8 text-blue-600" />
  }

  return (
    <div className="min-h-screen bg-white">
      <Header navigationItems={navigationItems} heroContent={heroContent} />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Our Services</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide comprehensive services to meet your needs with efficiency and professionalism.
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <Card key={service.id} className="group hover:shadow-lg transition-all duration-300">
                  <CardHeader className="space-y-4">
                    <div className="flex items-center justify-between">
                      {getServiceIcon(index)}
                      <div className="h-2 w-2 bg-blue-600 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
                    </div>
                    <CardTitle className="text-xl font-semibold text-gray-900">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <CardDescription className="text-gray-600 leading-relaxed">{service.description}</CardDescription>
                    <Link
                      href={`/services/${service.id}`}
                      className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
                    >
                      <span>Learn More</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

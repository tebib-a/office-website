import { createServerClient } from "@/lib/supabase"
import Header from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, FileText, Clock, Users } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

async function getPageData(serviceId: string) {
  const supabase = createServerClient()

  const [{ data: heroContent }, { data: navigationItems }, { data: service }] = await Promise.all([
    supabase.from("hero_content").select("*").single(),
    supabase.from("navigation_items").select("*").order("order_index"),
    supabase.from("services").select("*").eq("id", serviceId).single(),
  ])

  return {
    heroContent: heroContent || {
      office_name_en: "Office Name",
      office_name_am: "የቢሮ ስም",
      slogan_en: "Your trusted partner",
      slogan_am: "የእርስዎ የታመነ አጋር",
    },
    navigationItems: navigationItems || [],
    service,
  }
}

export default async function ServiceDetailPage({ params }: { params: { id: string } }) {
  const { heroContent, navigationItems, service } = await getPageData(params.id)

  if (!service) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      <Header navigationItems={navigationItems} heroContent={heroContent} />
      <main>
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Button asChild variant="ghost" className="mb-8">
              <Link href="/services" className="flex items-center space-x-2">
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Services</span>
              </Link>
            </Button>

            <Card className="overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-600 rounded-lg">
                    <FileText className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-3xl font-bold text-gray-900">{service.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-8 space-y-8">
                <div className="prose max-w-none">
                  <p className="text-lg text-gray-600 leading-relaxed">{service.description}</p>
                </div>

                {service.required_documents && service.required_documents.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-900">Required Documents</h3>
                    <ul className="space-y-2">
                      {service.required_documents.map((doc: string, index: number) => (
                        <li key={index} className="flex items-center space-x-3">
                          <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
                          <span className="text-gray-700">{doc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="grid md:grid-cols-3 gap-6 pt-8 border-t border-gray-200">
                  <div className="text-center space-y-2">
                    <Clock className="h-8 w-8 text-blue-600 mx-auto" />
                    <h4 className="font-semibold text-gray-900">Processing Time</h4>
                    <p className="text-gray-600">1-3 Business Days</p>
                  </div>
                  <div className="text-center space-y-2">
                    <Users className="h-8 w-8 text-blue-600 mx-auto" />
                    <h4 className="font-semibold text-gray-900">Support</h4>
                    <p className="text-gray-600">24/7 Available</p>
                  </div>
                  <div className="text-center space-y-2">
                    <FileText className="h-8 w-8 text-blue-600 mx-auto" />
                    <h4 className="font-semibold text-gray-900">Documentation</h4>
                    <p className="text-gray-600">Complete Guide</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-8">
                  <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
                    <Link href="/contact">Get Started</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href="/contact">Contact Support</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  )
}

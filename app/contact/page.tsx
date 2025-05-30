import { createServerClient } from "@/lib/supabase"
import Header from "@/components/header"
import ContactForm from "@/components/contact-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, Mail, MapPin, Clock } from "lucide-react"

async function getPageData() {
  const supabase = createServerClient()

  const [{ data: heroContent }, { data: navigationItems }] = await Promise.all([
    supabase.from("hero_content").select("*").single(),
    supabase.from("navigation_items").select("*").order("order_index"),
  ])

  return {
    heroContent: heroContent || {
      office_name_en: "Office Name",
      office_name_am: "የቢሮ ስም",
      slogan_en: "Your trusted partner",
      slogan_am: "የእርስዎ የታመነ አጋር",
    },
    navigationItems: navigationItems || [],
  }
}

export default async function ContactPage() {
  const { heroContent, navigationItems } = await getPageData()

  return (
    <div className="min-h-screen bg-white">
      <Header navigationItems={navigationItems} heroContent={heroContent} />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Contact Us</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get in touch with us for any questions, feedback, or assistance you may need.
            </p>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
                  <p className="text-gray-600 leading-relaxed">
                    We're here to help and answer any questions you might have. We look forward to hearing from you.
                  </p>
                </div>

                <div className="grid gap-6">
                  <Card className="border-0 shadow-md">
                    <CardHeader className="flex flex-row items-center space-y-0 space-x-4">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Phone className="h-5 w-5 text-blue-600" />
                      </div>
                      <CardTitle className="text-lg">Phone</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">+251-11-123-4567</p>
                      <p className="text-gray-600">+251-11-765-4321</p>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-md">
                    <CardHeader className="flex flex-row items-center space-y-0 space-x-4">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <Mail className="h-5 w-5 text-green-600" />
                      </div>
                      <CardTitle className="text-lg">Email</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">info@office.gov.et</p>
                      <p className="text-gray-600">support@office.gov.et</p>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-md">
                    <CardHeader className="flex flex-row items-center space-y-0 space-x-4">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <MapPin className="h-5 w-5 text-purple-600" />
                      </div>
                      <CardTitle className="text-lg">Address</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">123 Government Street</p>
                      <p className="text-gray-600">Addis Ababa, Ethiopia</p>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-md">
                    <CardHeader className="flex flex-row items-center space-y-0 space-x-4">
                      <div className="p-2 bg-orange-100 rounded-lg">
                        <Clock className="h-5 w-5 text-orange-600" />
                      </div>
                      <CardTitle className="text-lg">Office Hours</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">Monday - Friday: 8:00 AM - 5:00 PM</p>
                      <p className="text-gray-600">Saturday: 9:00 AM - 1:00 PM</p>
                      <p className="text-gray-600">Sunday: Closed</p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

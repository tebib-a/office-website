import { createServerClient } from "@/lib/supabase"
import Header from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building, Users, Target, Award } from "lucide-react"

async function getPageData() {
  const supabase = createServerClient()

  const [{ data: heroContent }, { data: navigationItems }, { data: departments }] = await Promise.all([
    supabase.from("hero_content").select("*").single(),
    supabase.from("navigation_items").select("*").order("order_index"),
    supabase.from("departments").select("*").order("order_index"),
  ])

  return {
    heroContent: heroContent || {
      office_name_en: "Office Name",
      office_name_am: "የቢሮ ስም",
      slogan_en: "Your trusted partner",
      slogan_am: "የእርስዎ የታመነ አጋር",
    },
    navigationItems: navigationItems || [],
    departments: departments || [],
  }
}

export default async function AboutPage() {
  const { heroContent, navigationItems, departments } = await getPageData()

  return (
    <div className="min-h-screen bg-white">
      <Header navigationItems={navigationItems} heroContent={heroContent} />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">About Us</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We are committed to providing excellent public services with transparency, efficiency, and dedication to
              our community.
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              <Card className="border-0 shadow-lg">
                <CardHeader className="text-center space-y-4">
                  <div className="mx-auto p-3 bg-blue-100 rounded-full w-fit">
                    <Target className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900">Our Mission</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed text-center">
                    To provide efficient, transparent, and accessible public services that meet the needs of our
                    community while maintaining the highest standards of professionalism and integrity.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader className="text-center space-y-4">
                  <div className="mx-auto p-3 bg-green-100 rounded-full w-fit">
                    <Award className="h-8 w-8 text-green-600" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900">Our Vision</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed text-center">
                    To be a leading public service institution recognized for excellence, innovation, and commitment to
                    serving our community with dignity and respect.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Our Values</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                The principles that guide our work and define our commitment to excellence.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "Transparency",
                  description: "Open and honest communication in all our dealings",
                  icon: Building,
                },
                { title: "Efficiency", description: "Streamlined processes for faster service delivery", icon: Target },
                { title: "Integrity", description: "Ethical conduct and accountability in all actions", icon: Award },
                { title: "Service", description: "Dedicated to serving our community with excellence", icon: Users },
              ].map((value, index) => (
                <Card
                  key={index}
                  className="text-center border-0 shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <CardHeader className="space-y-4">
                    <div className="mx-auto p-3 bg-blue-50 rounded-full w-fit">
                      <value.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-lg font-semibold text-gray-900">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Departments */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Our Departments</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our organizational structure ensures efficient service delivery across all departments.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {departments.map((department, index) => (
                <Card key={department.id} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="text-center space-y-4">
                    <div className="mx-auto p-3 bg-blue-50 rounded-full w-fit">
                      <Building className="h-6 w-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-lg font-semibold text-gray-900">{department.name_en}</CardTitle>
                  </CardHeader>
                  {department.description_en && (
                    <CardContent>
                      <p className="text-gray-600 text-center leading-relaxed">{department.description_en}</p>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

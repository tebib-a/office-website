import { createServerClient } from "@/lib/supabase"
import Header from "@/components/header"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Calendar, User, ArrowRight } from "lucide-react"
import Link from "next/link"

async function getPageData() {
  const supabase = createServerClient()

  const [{ data: heroContent }, { data: navigationItems }, { data: news }] = await Promise.all([
    supabase.from("hero_content").select("*").single(),
    supabase.from("navigation_items").select("*").order("order_index"),
    supabase.from("news").select("*").eq("published", true).order("created_at", { ascending: false }),
  ])

  return {
    heroContent: heroContent || {
      office_name_en: "Office Name",
      office_name_am: "የቢሮ ስም",
      slogan_en: "Your trusted partner",
      slogan_am: "የእርስዎ የታመነ አጋር",
    },
    navigationItems: navigationItems || [],
    news: news || [],
  }
}

export default async function NewsPage() {
  const { heroContent, navigationItems, news } = await getPageData()

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const truncateText = (text: string | undefined | null, maxLength = 200) => {
    if (!text) return ""
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + "..."
  }

  return (
    <div className="min-h-screen bg-white">
      <Header navigationItems={navigationItems} heroContent={heroContent} />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Latest News</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stay updated with the latest news and announcements from our office.
            </p>
          </div>
        </section>

        {/* News Grid */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {news.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-xl text-gray-600">No news articles available at the moment.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {news.map((item) => (
                  <Card key={item.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                    {item.image_url && (
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={item.image_url || "/placeholder.svg"}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <CardHeader className="space-y-3">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(item.created_at)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <User className="h-4 w-4" />
                          <span>Admin</span>
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors duration-300">
                        {item.title}
                      </h3>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-gray-600 leading-relaxed">{truncateText(item.body)}</p>
                      <Link
                        href={`/news/${item.id}`}
                        className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium group-hover:translate-x-1 transition-transform duration-300"
                      >
                        <span>Read More</span>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}

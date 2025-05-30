import { createServerClient } from "@/lib/supabase"
import Header from "@/components/header"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, User } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

async function getPageData(newsId: string) {
  const supabase = createServerClient()

  const [{ data: heroContent }, { data: navigationItems }, { data: newsItem }] = await Promise.all([
    supabase.from("hero_content").select("*").single(),
    supabase.from("navigation_items").select("*").order("order_index"),
    supabase.from("news").select("*").eq("id", newsId).eq("published", true).single(),
  ])

  return {
    heroContent: heroContent || {
      office_name_en: "Office Name",
      office_name_am: "የቢሮ ስም",
      slogan_en: "Your trusted partner",
      slogan_am: "የእርስዎ የታመነ አጋር",
    },
    navigationItems: navigationItems || [],
    newsItem,
  }
}

export default async function NewsDetailPage({ params }: { params: { id: string } }) {
  const { heroContent, navigationItems, newsItem } = await getPageData(params.id)

  if (!newsItem) {
    notFound()
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-white">
      <Header navigationItems={navigationItems} heroContent={heroContent} />
      <main>
        <article className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Button asChild variant="ghost" className="mb-8">
              <Link href="/news" className="flex items-center space-x-2">
                <ArrowLeft className="h-4 w-4" />
                <span>Back to News</span>
              </Link>
            </Button>

            <header className="space-y-6 mb-12">
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(newsItem.created_at)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <User className="h-4 w-4" />
                  <span>Admin</span>
                </div>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">{newsItem.title}</h1>
            </header>

            {newsItem.image_url && (
              <div className="aspect-video mb-12 overflow-hidden rounded-lg">
                <img
                  src={newsItem.image_url || "/placeholder.svg"}
                  alt={newsItem.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="prose max-w-none">
              <div className="text-lg text-gray-700 leading-relaxed whitespace-pre-wrap">{newsItem.body}</div>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200">
              <Button asChild>
                <Link href="/news">Back to All News</Link>
              </Button>
            </div>
          </div>
        </article>
      </main>
    </div>
  )
}

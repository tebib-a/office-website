import { createServerClient } from "@/lib/supabase"
import Header from "@/components/header"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, MapPin, Clock } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

async function getPageData(eventId: string) {
  const supabase = createServerClient()

  const [{ data: heroContent }, { data: navigationItems }, { data: event }] = await Promise.all([
    supabase.from("hero_content").select("*").single(),
    supabase.from("navigation_items").select("*").order("order_index"),
    supabase.from("events").select("*").eq("id", eventId).eq("is_published", true).single(),
  ])

  return {
    heroContent: heroContent || {
      office_name_en: "Office Name",
      office_name_am: "የቢሮ ስም",
      slogan_en: "Your trusted partner",
      slogan_am: "የእርስዎ የታመነ አጋር",
    },
    navigationItems: navigationItems || [],
    event,
  }
}

export default async function EventDetailPage({ params }: { params: { id: string } }) {
  const { heroContent, navigationItems, event } = await getPageData(params.id)

  if (!event) {
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

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="min-h-screen bg-white">
      <Header navigationItems={navigationItems} heroContent={heroContent} />
      <main>
        <article className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Button asChild variant="ghost" className="mb-8">
              <Link href="/addendum/events" className="flex items-center space-x-2">
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Events</span>
              </Link>
            </Button>

            <header className="space-y-6 mb-12">
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(event.event_date)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{formatTime(event.event_date)}</span>
                </div>
                {event.location_en && (
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{event.location_en}</span>
                  </div>
                )}
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">{event.title_en}</h1>
              {event.description_en && <p className="text-xl text-gray-600 leading-relaxed">{event.description_en}</p>}
            </header>

            {event.image_url && (
              <div className="aspect-video mb-12 overflow-hidden rounded-lg">
                <img
                  src={event.image_url || "/placeholder.svg"}
                  alt={event.title_en}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {event.content_en && (
              <div className="prose max-w-none">
                <div className="text-lg text-gray-700 leading-relaxed whitespace-pre-wrap">{event.content_en}</div>
              </div>
            )}

            <div className="mt-12 pt-8 border-t border-gray-200">
              <Button asChild>
                <Link href="/addendum/events">Back to All Events</Link>
              </Button>
            </div>
          </div>
        </article>
      </main>
    </div>
  )
}

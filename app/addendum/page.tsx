import { createServerClient } from "@/lib/supabase"
import Header from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Images, Calendar, ArrowRight } from "lucide-react"
import Link from "next/link"

async function getPageData() {
  const supabase = createServerClient()

  const [{ data: heroContent }, { data: navigationItems }, { data: featuredGallery }, { data: upcomingEvents }] =
    await Promise.all([
      supabase.from("hero_content").select("*").single(),
      supabase.from("navigation_items").select("*").order("order_index"),
      supabase.from("gallery").select("*").eq("is_featured", true).limit(6),
      supabase
        .from("events")
        .select("*")
        .eq("is_published", true)
        .gte("event_date", new Date().toISOString())
        .order("event_date")
        .limit(3),
    ])

  return {
    heroContent: heroContent || {
      office_name_en: "Office Name",
      office_name_am: "የቢሮ ስም",
      slogan_en: "Your trusted partner",
      slogan_am: "የእርስዎ የታመነ አጋር",
    },
    navigationItems: navigationItems || [],
    featuredGallery: featuredGallery || [],
    upcomingEvents: upcomingEvents || [],
  }
}

export default async function AddendumPage() {
  const { heroContent, navigationItems, featuredGallery, upcomingEvents } = await getPageData()

  return (
    <div className="min-h-screen bg-white">
      <Header navigationItems={navigationItems} heroContent={heroContent} />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Addendum</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our gallery, upcoming events, and additional resources.
            </p>
          </div>
        </section>

        {/* Quick Links */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="group hover:shadow-lg transition-all duration-300">
                <CardHeader className="text-center space-y-4">
                  <div className="mx-auto p-4 bg-blue-100 rounded-full w-fit group-hover:bg-blue-200 transition-colors duration-300">
                    <Images className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900">Gallery</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <p className="text-gray-600">
                    Browse through our collection of photos showcasing our office, events, and community activities.
                  </p>
                  <Button asChild>
                    <Link href="/addendum/gallery" className="flex items-center space-x-2">
                      <span>View Gallery</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-lg transition-all duration-300">
                <CardHeader className="text-center space-y-4">
                  <div className="mx-auto p-4 bg-green-100 rounded-full w-fit group-hover:bg-green-200 transition-colors duration-300">
                    <Calendar className="h-8 w-8 text-green-600" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900">Events</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <p className="text-gray-600">
                    Stay updated with our upcoming events, workshops, conferences, and community programs.
                  </p>
                  <Button asChild>
                    <Link href="/addendum/events" className="flex items-center space-x-2">
                      <span>View Events</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Featured Gallery Preview */}
        {featuredGallery.length > 0 && (
          <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center space-y-4 mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Featured Images</h2>
                <p className="text-xl text-gray-600">Highlights from our gallery</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredGallery.map((image) => (
                  <Card key={image.id} className="overflow-hidden group hover:shadow-lg transition-all duration-300">
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={image.image_url || "/placeholder.svg"}
                        alt={image.title_en}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">{image.title_en}</h3>
                      <p className="text-gray-600 text-sm">{image.description_en}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center mt-12">
                <Button asChild variant="outline" size="lg">
                  <Link href="/addendum/gallery">View Full Gallery</Link>
                </Button>
              </div>
            </div>
          </section>
        )}

        {/* Upcoming Events Preview */}
        {upcomingEvents.length > 0 && (
          <section className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center space-y-4 mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Upcoming Events</h2>
                <p className="text-xl text-gray-600">Don't miss these upcoming events</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {upcomingEvents.map((event) => (
                  <Card key={event.id} className="group hover:shadow-lg transition-all duration-300">
                    {event.image_url && (
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={event.image_url || "/placeholder.svg"}
                          alt={event.title_en}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle className="text-lg">{event.title_en}</CardTitle>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(event.event_date).toLocaleDateString()}</span>
                        </div>
                        {event.location_en && (
                          <div className="flex items-center space-x-2">
                            <span>📍</span>
                            <span>{event.location_en}</span>
                          </div>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">{event.description_en}</p>
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/addendum/events/${event.id}`}>Learn More</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center mt-12">
                <Button asChild variant="outline" size="lg">
                  <Link href="/addendum/events">View All Events</Link>
                </Button>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  )
}

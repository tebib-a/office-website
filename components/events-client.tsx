"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Clock, ArrowRight } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import Link from "next/link"

interface Event {
  id: string
  title_en: string
  title_am?: string
  description_en?: string
  description_am?: string
  content_en?: string
  content_am?: string
  image_url?: string
  event_date: string
  location_en?: string
  location_am?: string
  is_published: boolean
}

interface EventsClientProps {
  upcomingEvents: Event[]
  pastEvents: Event[]
}

export default function EventsClient({ upcomingEvents, pastEvents }: EventsClientProps) {
  const { language, t } = useLanguage()

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(language === "en" ? "en-US" : "am-ET", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString(language === "en" ? "en-US" : "am-ET", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <main>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">{t("events")}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {language === "en"
              ? "Stay updated with our upcoming events, workshops, conferences, and community programs."
              : "ከእኛ የሚመጡ ዝግጅቶች፣ ወርክሾፖች፣ ኮንፈረንሶች እና የማህበረሰብ ፕሮግራሞች ጋር ተዘምኑ።"}
          </p>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">{t("upcomingEvents")}</h2>
            <p className="text-xl text-gray-600">
              {language === "en" ? "Don't miss these upcoming events" : "እነዚህን የሚመጡ ዝግጅቶች አያመልጡ"}
            </p>
          </div>

          {upcomingEvents.length === 0 ? (
            <div className="text-center py-20">
              <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-xl text-gray-600">
                {language === "en" ? "No upcoming events at the moment." : "በአሁኑ ጊዜ የሚመጡ ዝግጅቶች የሉም።"}
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingEvents.map((event) => (
                <Card key={event.id} className="group hover:shadow-lg transition-all duration-300">
                  {event.image_url && (
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={event.image_url || "/placeholder.svg"}
                        alt={language === "en" ? event.title_en : event.title_am || event.title_en}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-lg group-hover:text-blue-600 transition-colors duration-300">
                      {language === "en" ? event.title_en : event.title_am || event.title_en}
                    </CardTitle>
                    <div className="text-sm text-gray-600 space-y-2">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-blue-600" />
                        <span>{formatDate(event.event_date)}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-green-600" />
                        <span>{formatTime(event.event_date)}</span>
                      </div>
                      {(event.location_en || event.location_am) && (
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-purple-600" />
                          <span>{language === "en" ? event.location_en : event.location_am || event.location_en}</span>
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-600">
                      {language === "en" ? event.description_en : event.description_am || event.description_en}
                    </p>
                    <Button
                      asChild
                      variant="outline"
                      className="w-full group-hover:bg-blue-50 transition-colors duration-300"
                    >
                      <Link
                        href={`/addendum/events/${event.id}`}
                        className="flex items-center justify-center space-x-2"
                      >
                        <span>{t("readMore")}</span>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Past Events */}
      {pastEvents.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">{t("pastEvents")}</h2>
              <p className="text-xl text-gray-600">
                {language === "en" ? "Recent events we've hosted" : "በቅርቡ ያደረግናቸው ዝግጅቶች"}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pastEvents.map((event) => (
                <Card
                  key={event.id}
                  className="group hover:shadow-lg transition-all duration-300 opacity-75 hover:opacity-100"
                >
                  {event.image_url && (
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={event.image_url || "/placeholder.svg"}
                        alt={language === "en" ? event.title_en : event.title_am || event.title_en}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {language === "en" ? event.title_en : event.title_am || event.title_en}
                    </CardTitle>
                    <div className="text-sm text-gray-600 space-y-2">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span>{formatDate(event.event_date)}</span>
                      </div>
                      {(event.location_en || event.location_am) && (
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-gray-500" />
                          <span>{language === "en" ? event.location_en : event.location_am || event.location_en}</span>
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      {language === "en" ? event.description_en : event.description_am || event.description_en}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}

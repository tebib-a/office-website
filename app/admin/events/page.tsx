import { createServerClient } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Edit, Eye, Calendar, MapPin } from "lucide-react"
import Link from "next/link"
import DeleteEventButton from "@/components/admin/delete-event-button"

async function getEvents() {
  const supabase = createServerClient()
  const { data: events } = await supabase.from("events").select("*").order("event_date", { ascending: false })
  return events || []
}

export default async function AdminEventsPage() {
  const events = await getEvents()

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Events Management</h1>
          <p className="text-gray-600">Manage your events and announcements</p>
        </div>
        <Button asChild>
          <Link href="/admin/events/new" className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Add Event</span>
          </Link>
        </Button>
      </div>

      <div className="grid gap-6">
        {events.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-gray-500">No events found. Create your first event!</p>
              <Button asChild className="mt-4">
                <Link href="/admin/events/new">Add Event</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          events.map((event) => (
            <Card key={event.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <CardTitle className="text-lg">{event.title_en}</CardTitle>
                      <div
                        className={`px-2 py-1 rounded-full text-xs ${
                          event.is_published ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {event.is_published ? "Published" : "Draft"}
                      </div>
                    </div>
                    {event.title_am && <p className="text-sm text-gray-600">{event.title_am}</p>}
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(event.event_date)}</span>
                      </div>
                      {event.location_en && (
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{event.location_en}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {event.is_published && (
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/addendum/events/${event.id}`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                    )}
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/admin/events/${event.id}/edit`}>
                        <Edit className="h-4 w-4" />
                      </Link>
                    </Button>
                    <DeleteEventButton eventId={event.id} />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-2">{event.description_en}</p>
                {event.description_am && <p className="text-gray-600 text-sm">{event.description_am}</p>}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}

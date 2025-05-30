import { createServerClient } from "@/lib/supabase"
import { notFound } from "next/navigation"
import EventForm from "@/components/admin/event-form"

async function getEvent(id: string) {
  const supabase = createServerClient()
  const { data: event } = await supabase.from("events").select("*").eq("id", id).single()
  return event
}

export default async function EditEventPage({ params }: { params: { id: string } }) {
  const event = await getEvent(params.id)

  if (!event) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Edit Event</h1>
        <p className="text-gray-600">Update event information</p>
      </div>
      <EventForm event={event} isEdit />
    </div>
  )
}

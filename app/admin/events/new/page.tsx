import EventForm from "@/components/admin/event-form"

export default function NewEventPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Add New Event</h1>
        <p className="text-gray-600">Create a new event for your website</p>
      </div>
      <EventForm />
    </div>
  )
}

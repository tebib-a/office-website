import ServiceForm from "@/components/admin/service-form"

export default function NewServicePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Add New Service</h1>
        <p className="text-gray-600">Create a new service for your office</p>
      </div>
      <ServiceForm />
    </div>
  )
}

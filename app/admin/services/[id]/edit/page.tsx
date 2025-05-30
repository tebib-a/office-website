import { createServerClient } from "@/lib/supabase"
import { notFound } from "next/navigation"
import ServiceForm from "@/components/admin/service-form"

async function getService(id: string) {
  const supabase = createServerClient()
  const { data: service } = await supabase.from("services").select("*").eq("id", id).single()
  return service
}

export default async function EditServicePage({ params }: { params: { id: string } }) {
  const service = await getService(params.id)

  if (!service) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Edit Service</h1>
        <p className="text-gray-600">Update service information</p>
      </div>
      <ServiceForm service={service} isEdit />
    </div>
  )
}

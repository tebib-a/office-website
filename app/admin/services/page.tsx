import { createServerClient } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Edit } from "lucide-react"
import Link from "next/link"
import DeleteServiceButton from "@/components/admin/delete-service-button"

async function getServices() {
  const supabase = createServerClient()
  const { data: services } = await supabase.from("services").select("*").order("created_at", { ascending: false })
  return services || []
}

export default async function AdminServicesPage() {
  const services = await getServices()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Services Management</h1>
          <p className="text-gray-600">Manage your office services</p>
        </div>
        <Button asChild>
          <Link href="/admin/services/new" className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Add Service</span>
          </Link>
        </Button>
      </div>

      <div className="grid gap-6">
        {services.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-gray-500">No services found. Create your first service!</p>
              <Button asChild className="mt-4">
                <Link href="/admin/services/new">Add Service</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          services.map((service) => (
            <Card key={service.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="text-lg">{service.title}</CardTitle>
                    {service.title_am && <p className="text-sm text-gray-600">{service.title_am}</p>}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/admin/services/${service.id}/edit`}>
                        <Edit className="h-4 w-4" />
                      </Link>
                    </Button>
                    <DeleteServiceButton serviceId={service.id} />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-2">{service.description}</p>
                {service.description_am && <p className="text-gray-600 text-sm">{service.description_am}</p>}
                {service.required_documents && service.required_documents.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-900 mb-2">Required Documents:</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {service.required_documents.map((doc: string, index: number) => (
                        <li key={index} className="flex items-center space-x-2">
                          <div className="h-1 w-1 bg-gray-400 rounded-full"></div>
                          <span>{doc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}

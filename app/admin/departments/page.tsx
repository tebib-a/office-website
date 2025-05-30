import { createServerClient } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Edit, Building } from "lucide-react"
import Link from "next/link"
import DeleteDepartmentButton from "@/components/admin/delete-department-button"

async function getDepartments() {
  const supabase = createServerClient()
  const { data: departments } = await supabase.from("departments").select("*").order("order_index")
  return departments || []
}

export default async function AdminDepartmentsPage() {
  const departments = await getDepartments()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Departments Management</h1>
          <p className="text-gray-600">Manage your office departments and structure</p>
        </div>
        <Button asChild>
          <Link href="/admin/departments/new" className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Add Department</span>
          </Link>
        </Button>
      </div>

      <div className="grid gap-6">
        {departments.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-gray-500">No departments found. Add your first department!</p>
              <Button asChild className="mt-4">
                <Link href="/admin/departments/new">Add Department</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          departments.map((department) => (
            <Card key={department.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Building className="h-5 w-5 text-blue-600" />
                      <CardTitle className="text-lg">{department.name_en}</CardTitle>
                      <span className="text-sm text-gray-500">Order: {department.order_index}</span>
                    </div>
                    {department.name_am && <p className="text-sm text-gray-600">{department.name_am}</p>}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/admin/departments/${department.id}/edit`}>
                        <Edit className="h-4 w-4" />
                      </Link>
                    </Button>
                    <DeleteDepartmentButton departmentId={department.id} />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {department.description_en && <p className="text-gray-600">{department.description_en}</p>}
                {department.description_am && <p className="text-gray-600 text-sm mt-1">{department.description_am}</p>}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}

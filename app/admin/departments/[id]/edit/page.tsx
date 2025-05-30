import { createServerClient } from "@/lib/supabase"
import { notFound } from "next/navigation"
import DepartmentForm from "@/components/admin/department-form"

async function getDepartment(id: string) {
  const supabase = createServerClient()
  const { data: department } = await supabase.from("departments").select("*").eq("id", id).single()
  return department
}

export default async function EditDepartmentPage({ params }: { params: { id: string } }) {
  const department = await getDepartment(params.id)

  if (!department) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Edit Department</h1>
        <p className="text-gray-600">Update department information</p>
      </div>
      <DepartmentForm department={department} isEdit />
    </div>
  )
}

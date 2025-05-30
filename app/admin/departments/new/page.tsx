import DepartmentForm from "@/components/admin/department-form"

export default function NewDepartmentPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Add New Department</h1>
        <p className="text-gray-600">Create a new department for your office structure</p>
      </div>
      <DepartmentForm />
    </div>
  )
}

import NavigationForm from "@/components/admin/navigation-form"

export default function NewNavigationPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Add New Navigation Item</h1>
        <p className="text-gray-600">Create a new menu item for your website navigation</p>
      </div>
      <NavigationForm />
    </div>
  )
}

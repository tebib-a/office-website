import { createServerClient } from "@/lib/supabase"
import { notFound } from "next/navigation"
import NavigationForm from "@/components/admin/navigation-form"

async function getNavigationItem(id: string) {
  const supabase = createServerClient()
  const { data: navigationItem } = await supabase.from("navigation_items").select("*").eq("id", id).single()
  return navigationItem
}

export default async function EditNavigationPage({ params }: { params: { id: string } }) {
  const navigationItem = await getNavigationItem(params.id)

  if (!navigationItem) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Edit Navigation Item</h1>
        <p className="text-gray-600">Update navigation menu item</p>
      </div>
      <NavigationForm navigationItem={navigationItem} isEdit />
    </div>
  )
}

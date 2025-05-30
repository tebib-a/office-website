import { createServerClient } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Edit, Navigation } from "lucide-react"
import Link from "next/link"
import DeleteNavigationButton from "@/components/admin/delete-navigation-button"

async function getNavigationItems() {
  const supabase = createServerClient()
  const { data: navigationItems } = await supabase.from("navigation_items").select("*").order("order_index")
  return navigationItems || []
}

export default async function AdminNavigationPage() {
  const navigationItems = await getNavigationItems()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Navigation Management</h1>
          <p className="text-gray-600">Manage your website navigation menu</p>
        </div>
        <Button asChild>
          <Link href="/admin/navigation/new" className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Add Menu Item</span>
          </Link>
        </Button>
      </div>

      <div className="grid gap-6">
        {navigationItems.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-gray-500">No navigation items found. Add your first menu item!</p>
              <Button asChild className="mt-4">
                <Link href="/admin/navigation/new">Add Menu Item</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          navigationItems.map((item) => (
            <Card key={item.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Navigation className="h-5 w-5 text-blue-600" />
                      <CardTitle className="text-lg">{item.title_en}</CardTitle>
                      <span className="text-sm text-gray-500">Order: {item.order_index}</span>
                    </div>
                    {item.title_am && <p className="text-sm text-gray-600">{item.title_am}</p>}
                    <p className="text-sm text-blue-600">{item.url}</p>
                    {item.parent_id && <p className="text-xs text-gray-500">Sub-menu item</p>}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/admin/navigation/${item.id}/edit`}>
                        <Edit className="h-4 w-4" />
                      </Link>
                    </Button>
                    <DeleteNavigationButton navigationId={item.id} />
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}

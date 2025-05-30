import { createServerClient } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Edit, Star } from "lucide-react"
import Link from "next/link"
import DeleteGalleryButton from "@/components/admin/delete-gallery-button"
import ToggleFeaturedButton from "@/components/admin/toggle-featured-button"

async function getGalleryItems() {
  const supabase = createServerClient()
  const { data: gallery } = await supabase.from("gallery").select("*").order("created_at", { ascending: false })
  return gallery || []
}

export default async function AdminGalleryPage() {
  const gallery = await getGalleryItems()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gallery Management</h1>
          <p className="text-gray-600">Manage your gallery images and featured content</p>
        </div>
        <Button asChild>
          <Link href="/admin/gallery/new" className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Add Image</span>
          </Link>
        </Button>
      </div>

      <div className="grid gap-6">
        {gallery.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-gray-500">No gallery images found. Add your first image!</p>
              <Button asChild className="mt-4">
                <Link href="/admin/gallery/new">Add Image</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {gallery.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <div className="aspect-square overflow-hidden relative">
                  <img
                    src={item.image_url || "/placeholder.svg"}
                    alt={item.title_en}
                    className="w-full h-full object-cover"
                  />
                  {item.is_featured && (
                    <div className="absolute top-2 right-2 bg-yellow-500 text-white p-1 rounded-full">
                      <Star className="h-4 w-4 fill-current" />
                    </div>
                  )}
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium line-clamp-2">{item.title_en}</CardTitle>
                  {item.title_am && <p className="text-xs text-gray-600 line-clamp-1">{item.title_am}</p>}
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div className="text-xs text-gray-500">
                      <p>Category: {item.category}</p>
                      <p>Created: {new Date(item.created_at).toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <Button asChild variant="outline" size="sm">
                          <Link href={`/admin/gallery/${item.id}/edit`}>
                            <Edit className="h-3 w-3" />
                          </Link>
                        </Button>
                        <ToggleFeaturedButton galleryId={item.id} isFeatured={item.is_featured} />
                      </div>
                      <DeleteGalleryButton galleryId={item.id} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

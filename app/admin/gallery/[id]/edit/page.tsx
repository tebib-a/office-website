import { createServerClient } from "@/lib/supabase"
import { notFound } from "next/navigation"
import GalleryForm from "@/components/admin/gallery-form"

async function getGalleryItem(id: string) {
  const supabase = createServerClient()
  const { data: galleryItem } = await supabase.from("gallery").select("*").eq("id", id).single()
  return galleryItem
}

export default async function EditGalleryPage({ params }: { params: { id: string } }) {
  const galleryItem = await getGalleryItem(params.id)

  if (!galleryItem) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Edit Gallery Image</h1>
        <p className="text-gray-600">Update gallery image information</p>
      </div>
      <GalleryForm galleryItem={galleryItem} isEdit />
    </div>
  )
}

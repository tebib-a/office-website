import GalleryForm from "@/components/admin/gallery-form"

export default function NewGalleryPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Add New Gallery Image</h1>
        <p className="text-gray-600">Upload and manage a new gallery image</p>
      </div>
      <GalleryForm />
    </div>
  )
}

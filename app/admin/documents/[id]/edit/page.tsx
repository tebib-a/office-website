import { createServerClient } from "@/lib/supabase"
import { notFound } from "next/navigation"
import DocumentForm from "@/components/admin/document-form"

async function getDocument(id: string) {
  const supabase = createServerClient()
  const { data: document } = await supabase.from("documents").select("*").eq("id", id).single()
  return document
}

export default async function EditDocumentPage({ params }: { params: { id: string } }) {
  const document = await getDocument(params.id)

  if (!document) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Edit Document</h1>
        <p className="text-gray-600">Update document information</p>
      </div>
      <DocumentForm document={document} isEdit />
    </div>
  )
}

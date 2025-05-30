import DocumentForm from "@/components/admin/document-form"

export default function NewDocumentPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Add New Document</h1>
        <p className="text-gray-600">Upload and manage a new document</p>
      </div>
      <DocumentForm />
    </div>
  )
}

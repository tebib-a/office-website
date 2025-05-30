import { createServerClient } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Edit, Download, FileText } from "lucide-react"
import Link from "next/link"
import DeleteDocumentButton from "@/components/admin/delete-document-button"

async function getDocuments() {
  const supabase = createServerClient()
  const { data: documents } = await supabase.from("documents").select("*").order("created_at", { ascending: false })
  return documents || []
}

export default async function AdminDocumentsPage() {
  const documents = await getDocuments()

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Documents Management</h1>
          <p className="text-gray-600">Manage your documents and downloads</p>
        </div>
        <Button asChild>
          <Link href="/admin/documents/new" className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Add Document</span>
          </Link>
        </Button>
      </div>

      <div className="grid gap-6">
        {documents.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-gray-500">No documents found. Add your first document!</p>
              <Button asChild className="mt-4">
                <Link href="/admin/documents/new">Add Document</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          documents.map((document) => (
            <Card key={document.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <FileText className="h-5 w-5 text-blue-600" />
                      <CardTitle className="text-lg">{document.title}</CardTitle>
                      <div
                        className={`px-2 py-1 rounded-full text-xs ${
                          document.is_active ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {document.is_active ? "Active" : "Inactive"}
                      </div>
                    </div>
                    {document.title_am && <p className="text-sm text-gray-600">{document.title_am}</p>}
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>Category: {document.category}</span>
                      <span>Type: {document.file_type}</span>
                      {document.file_size && <span>Size: {formatFileSize(document.file_size)}</span>}
                      {document.downloads_count && <span>Downloads: {document.downloads_count}</span>}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button asChild variant="outline" size="sm">
                      <a href={document.file_url} download>
                        <Download className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/admin/documents/${document.id}/edit`}>
                        <Edit className="h-4 w-4" />
                      </Link>
                    </Button>
                    <DeleteDocumentButton documentId={document.id} />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{document.description}</p>
                {document.description_am && <p className="text-gray-600 text-sm mt-1">{document.description_am}</p>}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}

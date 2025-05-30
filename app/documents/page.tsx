import { createServerClient } from "@/lib/supabase"
import Header from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, FileText, Calendar, HardDrive } from "lucide-react"

async function getPageData() {
  const supabase = createServerClient()

  const [{ data: heroContent }, { data: navigationItems }, { data: documents }] = await Promise.all([
    supabase.from("hero_content").select("*").single(),
    supabase.from("navigation_items").select("*").order("order_index"),
    supabase.from("documents").select("*").eq("is_active", true).order("created_at", { ascending: false }),
  ])

  return {
    heroContent: heroContent || {
      office_name_en: "Office Name",
      office_name_am: "የቢሮ ስም",
      slogan_en: "Your trusted partner",
      slogan_am: "የእርስዎ የታመነ አጋር",
    },
    navigationItems: navigationItems || [],
    documents: documents || [],
  }
}

export default async function DocumentsPage() {
  const { heroContent, navigationItems, documents } = await getPageData()

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getFileIcon = (fileType: string) => {
    return <FileText className="h-8 w-8 text-blue-600" />
  }

  // Group documents by category
  const documentsByCategory = documents.reduce(
    (acc, doc) => {
      const category = doc.category || "general"
      if (!acc[category]) {
        acc[category] = []
      }
      acc[category].push(doc)
      return acc
    },
    {} as Record<string, typeof documents>,
  )

  return (
    <div className="min-h-screen bg-white">
      <Header navigationItems={navigationItems} heroContent={heroContent} />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Documents</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Access important documents, forms, guidelines, and resources for our services.
            </p>
          </div>
        </section>

        {/* Documents */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {documents.length === 0 ? (
              <div className="text-center py-20">
                <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-xl text-gray-600">No documents available at the moment.</p>
              </div>
            ) : (
              <div className="space-y-12">
                {Object.entries(documentsByCategory).map(([category, categoryDocs]) => (
                  <div key={category}>
                    <h2 className="text-2xl font-bold text-gray-900 mb-8 capitalize">
                      {category.replace(/([A-Z])/g, " $1").trim()} Documents
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {categoryDocs.map((document) => (
                        <Card key={document.id} className="group hover:shadow-lg transition-all duration-300">
                          <CardHeader className="space-y-4">
                            <div className="flex items-start justify-between">
                              <div className="p-3 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors duration-300">
                                {getFileIcon(document.file_type)}
                              </div>
                              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded uppercase">
                                {document.file_type}
                              </span>
                            </div>
                            <CardTitle className="text-lg leading-tight">{document.title}</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <p className="text-gray-600 text-sm leading-relaxed">{document.description}</p>

                            <div className="space-y-2 text-xs text-gray-500">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-1">
                                  <HardDrive className="h-3 w-3" />
                                  <span>{formatFileSize(document.file_size || 0)}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Calendar className="h-3 w-3" />
                                  <span>{formatDate(document.created_at)}</span>
                                </div>
                              </div>
                              {document.downloads_count && (
                                <div className="text-center">
                                  <span>{document.downloads_count} downloads</span>
                                </div>
                              )}
                            </div>

                            <Button asChild className="w-full group-hover:bg-blue-700 transition-colors duration-300">
                              <a
                                href={document.file_url}
                                download={document.file_name}
                                className="flex items-center justify-center space-x-2"
                              >
                                <Download className="h-4 w-4" />
                                <span>Download</span>
                              </a>
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}

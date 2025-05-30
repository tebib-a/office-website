import { createServerClient } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Edit, Eye } from "lucide-react"
import Link from "next/link"

async function getNews() {
  const supabase = createServerClient()
  const { data: news } = await supabase.from("news").select("*").order("created_at", { ascending: false })
  return news || []
}

export default async function AdminNewsPage() {
  const news = await getNews()

  const truncateText = (text: string | undefined | null, maxLength = 150) => {
    if (!text) return ""
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + "..."
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">News Management</h1>
          <p className="text-gray-600">Manage your news articles</p>
        </div>
        <Button asChild>
          <Link href="/admin/news/new" className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Add News</span>
          </Link>
        </Button>
      </div>

      <div className="grid gap-6">
        {news.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-gray-500">No news articles found. Create your first article!</p>
              <Button asChild className="mt-4">
                <Link href="/admin/news/new">Add News</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          news.map((article) => (
            <Card key={article.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <CardTitle className="text-lg">{article.title}</CardTitle>
                      <div
                        className={`px-2 py-1 rounded-full text-xs ${
                          article.published ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {article.published ? "Published" : "Draft"}
                      </div>
                    </div>
                    {article.title_am && <p className="text-sm text-gray-600">{article.title_am}</p>}
                    <p className="text-xs text-gray-500">
                      Created: {new Date(article.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {article.published && (
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/news/${article.id}`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                    )}
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/admin/news/${article.id}/edit`}>
                        <Edit className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 line-clamp-3">{truncateText(article.body)}</p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}

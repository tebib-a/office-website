import { createServerClient } from "@/lib/supabase"
import { notFound } from "next/navigation"
import NewsForm from "@/components/admin/news-form"

async function getNewsArticle(id: string) {
  const supabase = createServerClient()
  const { data: news } = await supabase.from("news").select("*").eq("id", id).single()
  return news
}

export default async function EditNewsPage({ params }: { params: { id: string } }) {
  const news = await getNewsArticle(params.id)

  if (!news) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Edit News Article</h1>
        <p className="text-gray-600">Update news article information</p>
      </div>
      <NewsForm news={news} isEdit />
    </div>
  )
}

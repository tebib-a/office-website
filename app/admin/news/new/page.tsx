import NewsForm from "@/components/admin/news-form"

export default function NewNewsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Add New News Article</h1>
        <p className="text-gray-600">Create a new news article for your website</p>
      </div>
      <NewsForm />
    </div>
  )
}

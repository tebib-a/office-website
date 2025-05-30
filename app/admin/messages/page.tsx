import { createServerClient } from "@/lib/supabase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, Mail, Calendar } from "lucide-react"

async function getMessages() {
  const supabase = createServerClient()
  const { data: messages } = await supabase.from("comments").select("*").order("created_at", { ascending: false })
  return messages || []
}

export default async function AdminMessagesPage() {
  const messages = await getMessages()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Messages Management</h1>
        <p className="text-gray-600">View and manage contact messages</p>
      </div>

      <div className="grid gap-6">
        {messages.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No messages found.</p>
            </CardContent>
          </Card>
        ) : (
          messages.map((message) => (
            <Card key={message.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="text-lg">{message.subject}</CardTitle>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Mail className="h-4 w-4" />
                        <span>{message.email}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(message.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-sm ${
                      message.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : message.status === "resolved"
                          ? "bg-green-100 text-green-800"
                          : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {message.status}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-900 mb-1">From: {message.name}</p>
                  <p className="text-gray-600">{message.message}</p>
                </div>
                {message.admin_response && (
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm font-medium text-blue-900 mb-1">Admin Response:</p>
                    <p className="text-blue-800">{message.admin_response}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}

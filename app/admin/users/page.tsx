import { createServerClient } from "@/lib/supabase"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle } from "lucide-react"
import VerifyEmailButton from "@/components/admin/verify-email-button"

export default async function UsersPage() {
  const supabase = createServerClient()

  // Get all profiles
  const { data: profiles, error } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false })

  // Get pending verification emails
  const { data: pendingEmails } = await supabase
    .from("profiles")
    .select("*")
    .eq("email_verified", false)
    .order("created_at", { ascending: false })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">User Management</h1>
        <p className="text-muted-foreground">Manage user accounts and email verification requests</p>
      </div>

      {pendingEmails && pendingEmails.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Pending Email Verifications</CardTitle>
            <CardDescription>These emails are waiting for verification to access the admin dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Requested At</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingEmails.map((profile) => (
                  <TableRow key={profile.id}>
                    <TableCell className="font-medium">{profile.email}</TableCell>
                    <TableCell>{new Date(profile.created_at).toLocaleString()}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <VerifyEmailButton profileId={profile.id} email={profile.email} action="approve" />
                        <VerifyEmailButton profileId={profile.id} email={profile.email} action="reject" />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
          <CardDescription>Manage all user accounts in the system</CardDescription>
        </CardHeader>
        <CardContent>
          {error ? (
            <div className="text-red-500">Error loading users: {error.message}</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created At</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {profiles &&
                  profiles.map((profile) => (
                    <TableRow key={profile.id}>
                      <TableCell className="font-medium">{profile.email}</TableCell>
                      <TableCell>
                        <Badge variant={profile.role === "admin" ? "default" : "outline"}>
                          {profile.role || "user"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {profile.email_verified ? (
                          <div className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                            <span>Verified</span>
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <XCircle className="h-4 w-4 text-red-500 mr-1" />
                            <span>Pending</span>
                          </div>
                        )}
                      </TableCell>
                      <TableCell>{new Date(profile.created_at).toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

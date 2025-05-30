import { redirect } from "next/navigation"

export default function LoginPage() {
  // Redirect to the new admin-login page
  redirect("/admin-login")
}

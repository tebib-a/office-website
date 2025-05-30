import { createServerClient } from "@/lib/supabase"
import HeroContentForm from "@/components/admin/hero-content-form"

async function getHeroContent() {
  const supabase = createServerClient()
  const { data: heroContent } = await supabase.from("hero_content").select("*").single()
  return heroContent
}

export default async function AdminSettingsPage() {
  const heroContent = await getHeroContent()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage your website settings</p>
      </div>

      <HeroContentForm heroContent={heroContent} />
    </div>
  )
}

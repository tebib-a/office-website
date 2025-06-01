import { createServerClient } from "@/lib/supabase"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ServicesContent from "@/components/services-content"

async function getPageData() {
  const supabase = createServerClient()

  const [{ data: heroContent }, { data: navigationItems }, { data: services }] = await Promise.all([
    supabase.from("hero_content").select("*").single(),
    supabase.from("navigation_items").select("*").order("order_index"),
    supabase.from("services").select("*").order("created_at", { ascending: false }),
  ])

  return {
    heroContent: heroContent || {
      office_name_en: "Office Name",
      office_name_am: "የቢሮ ስም",
      slogan_en: "Your trusted partner",
      slogan_am: "የእርስዎ የታመነ አጋር",
    },
    navigationItems: navigationItems || [],
    services: services || [],
  }
}

export default async function ServicesPage() {
  const { heroContent, navigationItems, services } = await getPageData()

  return (
    <div className="min-h-screen bg-white">
      <Header navigationItems={navigationItems} heroContent={heroContent} />
      <main>
        <ServicesContent services={services} />
      </main>
      <Footer heroContent={heroContent} />
    </div>
  )
}

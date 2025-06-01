import { createServerClient } from "@/lib/supabase"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ContactContent from "@/components/contact-content"

async function getPageData() {
  const supabase = createServerClient()

  const [{ data: heroContent }, { data: navigationItems }] = await Promise.all([
    supabase.from("hero_content").select("*").single(),
    supabase.from("navigation_items").select("*").order("order_index"),
  ])

  return {
    heroContent: heroContent || {
      office_name_en: "Office Name",
      office_name_am: "የቢሮ ስም",
      slogan_en: "Your trusted partner",
      slogan_am: "የእርስዎ የታመነ አጋር",
    },
    navigationItems: navigationItems || [],
  }
}

export default async function ContactPage() {
  const { heroContent, navigationItems } = await getPageData()

  return (
    <div className="min-h-screen bg-white">
      <Header navigationItems={navigationItems} heroContent={heroContent} />
      <main>
        <ContactContent />
      </main>
      <Footer heroContent={heroContent} />
    </div>
  )
}

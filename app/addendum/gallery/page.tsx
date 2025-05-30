import { createServerClient } from "@/lib/supabase"
import Header from "@/components/header"
import GalleryClient from "@/components/gallery-client"

async function getPageData() {
  const supabase = createServerClient()

  const [{ data: heroContent }, { data: navigationItems }, { data: gallery }] = await Promise.all([
    supabase.from("hero_content").select("*").single(),
    supabase.from("navigation_items").select("*").order("order_index"),
    supabase.from("gallery").select("*").order("created_at", { ascending: false }),
  ])

  return {
    heroContent: heroContent || {
      office_name_en: "Office Name",
      office_name_am: "የቢሮ ስም",
      slogan_en: "Your trusted partner",
      slogan_am: "የእርስዎ የታመነ አጋር",
    },
    navigationItems: navigationItems || [],
    gallery: gallery || [],
  }
}

export default async function GalleryPage() {
  const { heroContent, navigationItems, gallery } = await getPageData()

  return (
    <div className="min-h-screen bg-white">
      <Header navigationItems={navigationItems} heroContent={heroContent} />
      <GalleryClient gallery={gallery} />
    </div>
  )
}

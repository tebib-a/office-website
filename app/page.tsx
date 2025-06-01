import { createServerClient } from "@/lib/supabase"
import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import ServicesSection from "@/components/services-section"
import OfficeStructure from "@/components/office-structure"
import NewsSection from "@/components/news-section"
import Footer from "@/components/footer"

async function getPageData() {
  const supabase = createServerClient()

  const [{ data: heroContent }, { data: navigationItems }, { data: services }, { data: departments }, { data: news }] =
    await Promise.all([
      supabase.from("hero_content").select("*").single(),
      supabase.from("navigation_items").select("*").order("order_index"),
      supabase.from("services").select("*").limit(6),
      supabase.from("departments").select("*").order("order_index"),
      supabase.from("news").select("*").eq("published", true).order("created_at", { ascending: false }).limit(6),
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
    departments: departments || [],
    news: news || [],
  }
}

export default async function HomePage() {
  const { heroContent, navigationItems, services, departments, news } = await getPageData()

  return (
    <div className="min-h-screen bg-white">
      <Header navigationItems={navigationItems} heroContent={heroContent} />
      <main>
        <HeroSection heroContent={heroContent} />
        <ServicesSection services={services} />
        <OfficeStructure departments={departments} />
        <NewsSection news={news} />
      </main>
      <Footer heroContent={heroContent} />
    </div>
  )
}

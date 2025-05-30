import { createServerClient } from "@/lib/supabase"
import Header from "@/components/header"
import EventsClient from "@/components/events-client"

async function getPageData() {
  const supabase = createServerClient()

  const [{ data: heroContent }, { data: navigationItems }, { data: upcomingEvents }, { data: pastEvents }] =
    await Promise.all([
      supabase.from("hero_content").select("*").single(),
      supabase.from("navigation_items").select("*").order("order_index"),
      supabase
        .from("events")
        .select("*")
        .eq("is_published", true)
        .gte("event_date", new Date().toISOString())
        .order("event_date"),
      supabase
        .from("events")
        .select("*")
        .eq("is_published", true)
        .lt("event_date", new Date().toISOString())
        .order("event_date", { ascending: false })
        .limit(6),
    ])

  return {
    heroContent: heroContent || {
      office_name_en: "Office Name",
      office_name_am: "የቢሮ ስም",
      slogan_en: "Your trusted partner",
      slogan_am: "የእርስዎ የታመነ አጋር",
    },
    navigationItems: navigationItems || [],
    upcomingEvents: upcomingEvents || [],
    pastEvents: pastEvents || [],
  }
}

export default async function EventsPage() {
  const { heroContent, navigationItems, upcomingEvents, pastEvents } = await getPageData()

  return (
    <div className="min-h-screen bg-white">
      <Header navigationItems={navigationItems} heroContent={heroContent} />
      <EventsClient upcomingEvents={upcomingEvents} pastEvents={pastEvents} />
    </div>
  )
}

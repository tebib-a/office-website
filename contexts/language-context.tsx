"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "en" | "am"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    home: "Home",
    about: "About",
    services: "Services",
    news: "News",
    contact: "Contact Us",
    addendum: "Addendum",
    documents: "Documents",
    gallery: "Gallery",
    events: "Events",
    readMore: "Read More",
    ourServices: "Our Services",
    officeStructure: "Office Structure",
    latestNews: "Latest News",
    contactUs: "Contact Us",
    login: "Login",
    logout: "Logout",
    admin: "Admin",
    dashboard: "Dashboard",
    name: "Name",
    email: "Email",
    message: "Message",
    subject: "Subject",
    send: "Send",
    loading: "Loading...",
    submit: "Submit",
    departments: "Departments",
    viewAll: "View All",
    download: "Download",
    eventDate: "Event Date",
    location: "Location",
    category: "Category",
    fileSize: "File Size",
    uploadDate: "Upload Date",
    featuredImages: "Featured Images",
    allImages: "All Images",
    upcomingEvents: "Upcoming Events",
    pastEvents: "Past Events",
    availableDocuments: "Available Documents",
  },
  am: {
    home: "መነሻ",
    about: "ስለ እኛ",
    services: "አገልግሎቶች",
    news: "ዜናዎች",
    contact: "ያግኙን",
    addendum: "ተጨማሪ",
    documents: "ሰነዶች",
    gallery: "ምስሎች",
    events: "ዝግጅቶች",
    readMore: "ተጨማሪ ያንብቡ",
    ourServices: "የእኛ አገልግሎቶች",
    officeStructure: "የቢሮ መዋቅር",
    latestNews: "የቅርብ ጊዜ ዜናዎች",
    contactUs: "ያግኙን",
    login: "ግባ",
    logout: "ውጣ",
    admin: "አስተዳዳሪ",
    dashboard: "ዳሽቦርድ",
    name: "ስም",
    email: "ኢሜይል",
    message: "መልእክት",
    subject: "ርዕስ",
    send: "ላክ",
    loading: "በመጫን ላይ...",
    submit: "አስገባ",
    departments: "ክፍሎች",
    viewAll: "ሁሉንም ይመልከቱ",
    download: "አውርድ",
    eventDate: "የዝግጅት ቀን",
    location: "ቦታ",
    category: "ምድብ",
    fileSize: "የፋይል መጠን",
    uploadDate: "የተሰቀለበት ቀን",
    featuredImages: "ተመራጭ ምስሎች",
    allImages: "ሁሉም ምስሎች",
    upcomingEvents: "የሚመጡ ዝግጅቶች",
    pastEvents: "ያለፉ ዝግጅቶች",
    availableDocuments: "ያሉ ሰነዶች",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    const saved = localStorage.getItem("language") as Language
    if (saved && (saved === "en" || saved === "am")) {
      setLanguage(saved)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("language", lang)
  }

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

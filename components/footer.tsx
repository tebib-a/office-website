"use client"

import { Button } from "@/components/ui/button"

import { useLanguage } from "@/contexts/language-context"
import { Building, Phone, Mail, MapPin, Globe } from "lucide-react"
import Link from "next/link"

interface FooterProps {
  heroContent: {
    office_name_en: string
    office_name_am: string
    logo_url?: string
  }
}

export default function Footer({ heroContent }: FooterProps) {
  const { language, t } = useLanguage()

  const officeName = language === "en" ? heroContent.office_name_en : heroContent.office_name_am

  const quickLinks = [
    { href: "/about", label: language === "en" ? "About Office" : "ስለ ቢሮው" },
    { href: "/services", label: language === "en" ? "Leadership" : "አመራር" },
    { href: "/departments", label: language === "en" ? "Organization" : "ድርጅት" },
    { href: "/contact", label: language === "en" ? "Contact" : "ያግኙን" },
  ]

  const resourceLinks = [
    { href: "/news", label: language === "en" ? "News and Stories" : "ዜናዎች እና ታሪኮች" },
    { href: "/documents", label: language === "en" ? "Library" : "ቤተ መጻሕፍት" },
    { href: "/addendum/gallery", label: language === "en" ? "Gallery" : "ምስሎች" },
    { href: "/addendum/events", label: language === "en" ? "Events" : "ዝግጅቶች" },
  ]

  const helpfulLinks = [
    { href: "/contact", label: language === "en" ? "Partner with Office" : "ከቢሮው ጋር አጋር ይሁኑ" },
    { href: "/services", label: language === "en" ? "Service Information" : "የአገልግሎት መረጃ" },
    { href: "/privacy", label: language === "en" ? "Privacy Policy" : "የግላዊነት ፖሊሲ" },
    { href: "/terms", label: language === "en" ? "Terms of Service" : "የአገልግሎት ውሎች" },
  ]

  return (
    <footer className="bg-slate-900 text-white">
      {/* World Factbook Style Section */}
      <div className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20"></div>
        <div className="absolute right-0 top-0 w-96 h-96 opacity-20">
          <div className="w-full h-full rounded-full border border-blue-400/30 flex items-center justify-center">
            <div className="w-80 h-80 rounded-full border border-blue-400/20 flex items-center justify-center">
              <div className="w-64 h-64 rounded-full border border-blue-400/10 flex items-center justify-center">
                <Globe className="w-32 h-32 text-blue-400/30" />
              </div>
            </div>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              {language === "en" ? "The Office Portal" : "የቢሮው መግቢያ"}
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              {language === "en"
                ? "Your gateway to government services, information, and resources. Discover what our office offers to serve our community better."
                : "ወደ መንግስታዊ አገልግሎቶች፣ መረጃዎች እና ሀብቶች የሚወስድ መግቢያዎ። ማህበረሰባችንን በተሻለ ሁኔታ ለማገልገል ቢሮአችን የሚያቀርባቸውን ይወቁ።"}
            </p>
            <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-slate-900">
              <Link href="/services">{language === "en" ? "VISIT OFFICE PORTAL" : "የቢሮው መግቢያ ይጎብኙ"}</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Footer Links */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
            {/* Office */}
            <div>
              <h3 className="text-lg font-semibold mb-6">{language === "en" ? "Office" : "ቢሮ"}</h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-gray-400 hover:text-white transition-colors duration-200">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-lg font-semibold mb-6">{language === "en" ? "Resources" : "ሀብቶች"}</h3>
              <ul className="space-y-3">
                {resourceLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-gray-400 hover:text-white transition-colors duration-200">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Helpful Links */}
            <div>
              <h3 className="text-lg font-semibold mb-6">{language === "en" ? "Helpful Links" : "ጠቃሚ አገናኞች"}</h3>
              <ul className="space-y-3">
                {helpfulLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-gray-400 hover:text-white transition-colors duration-200">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-lg font-semibold mb-6">{language === "en" ? "Contact" : "ያግኙን"}</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div className="text-gray-400">
                    <p>123 Government Street</p>
                    <p>Addis Ababa, Ethiopia</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-gray-400 flex-shrink-0" />
                  <p className="text-gray-400">+251-11-123-4567</p>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-gray-400 flex-shrink-0" />
                  <p className="text-gray-400">info@office.gov.et</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <Link href="/admin-login" className="text-gray-500 hover:text-gray-400 text-xs">
                {language === "en" ? "REPORT INFORMATION" : "መረጃ ሪፖርት ያድርጉ"}
              </Link>
              <Link href="/contact" className="text-gray-500 hover:text-gray-400 text-xs">
                {language === "en" ? "CONTACT OFFICE" : "ቢሮውን ያግኙ"}
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <p className="text-gray-500 text-xs">
                © {new Date().getFullYear()} {officeName}
              </p>
              <div className="flex items-center space-x-2">
                {heroContent.logo_url ? (
                  <img src={heroContent.logo_url || "/placeholder.svg"} alt="Logo" className="h-6 w-6 object-contain" />
                ) : (
                  <div className="h-6 w-6 bg-blue-600 rounded flex items-center justify-center">
                    <Building className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

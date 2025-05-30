"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import { Menu, X, Globe, Search } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"

interface NavigationItem {
  id: string
  title_en: string
  title_am: string
  url: string
  order_index: number
  parent_id?: string | null
}

interface HeaderProps {
  navigationItems: NavigationItem[]
  heroContent: {
    office_name_en: string
    office_name_am: string
    logo_url?: string
  }
}

export default function Header({ navigationItems, heroContent }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { language, setLanguage, t } = useLanguage()

  const officeName = language === "en" ? heroContent.office_name_en : heroContent.office_name_am

  return (
    <header className="bg-slate-900 text-white sticky top-0 z-50 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Office Name */}
          <Link href="/" className="flex items-center space-x-3">
            {heroContent.logo_url ? (
              <img src={heroContent.logo_url || "/placeholder.svg"} alt="Logo" className="h-8 w-8 object-contain" />
            ) : (
              <div className="h-8 w-8 bg-blue-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">{officeName.charAt(0)}</span>
              </div>
            )}
            <span className="text-lg font-medium text-white">{officeName}</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems
              .filter((item) => !item.parent_id)
              .slice(0, 5)
              .map((item) => (
                <Link
                  key={item.id}
                  href={item.url}
                  className="text-gray-300 hover:text-white transition-colors duration-200 font-medium text-sm uppercase tracking-wide"
                >
                  {language === "en" ? item.title_en : item.title_am}
                </Link>
              ))}
          </nav>

          {/* Right side controls */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="hidden md:flex items-center space-x-2">
              <div className="relative">
                <Input
                  type="search"
                  placeholder={language === "en" ? "Search..." : "ፈልግ..."}
                  className="w-48 h-8 bg-slate-800 border-slate-700 text-white placeholder-gray-400 text-sm"
                />
                <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>

            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-slate-800">
                  <Globe className="h-4 w-4 mr-1" />
                  <span className="text-sm">{language === "en" ? "EN" : "አማ"}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-slate-800 border-slate-700">
                <DropdownMenuItem onClick={() => setLanguage("en")} className="text-white hover:bg-slate-700">
                  English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage("am")} className="text-white hover:bg-slate-700">
                  አማርኛ
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden text-gray-300 hover:text-white hover:bg-slate-800"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-slate-800">
            <nav className="flex flex-col space-y-3">
              {navigationItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.url}
                  className="text-gray-300 hover:text-white transition-colors duration-200 font-medium py-2 text-sm uppercase tracking-wide"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {language === "en" ? item.title_en : item.title_am}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

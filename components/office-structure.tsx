"use client"

import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent } from "@/components/ui/card"

interface Department {
  id: string
  name_en: string
  name_am: string
  description_en?: string
  description_am?: string
  order_index: number
}

interface OfficeStructureProps {
  departments: Department[]
}

export default function OfficeStructure({ departments }: OfficeStructureProps) {
  const { language, t } = useLanguage()

  return (
    <section className="py-24 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Logo/Visual */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-64 h-64 rounded-full border-4 border-blue-400 flex items-center justify-center bg-slate-800">
                <div className="w-32 h-32 bg-blue-600 rounded-full flex items-center justify-center">
                  <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
                    <div className="w-8 h-8 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-green-400 rounded-full"></div>
            </div>
          </div>

          {/* Right side - Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
                {language === "en" ? "Our Structure" : "የእኛ መዋቅር"}
              </h2>

              <p className="text-xl text-gray-300 leading-relaxed">
                {language === "en"
                  ? "Our organizational structure ensures efficient service delivery and clear accountability across all departments."
                  : "የእኛ ድርጅታዊ መዋቅር ውጤታማ የአገልግሎት አሰጣጥና ግልጽ ተጠያቂነትን በሁሉም ክፍሎች ያረጋግጣል።"}
              </p>
            </div>

            <div className="space-y-4">
              {departments.slice(0, 4).map((department, index) => (
                <Card
                  key={department.id}
                  className="bg-slate-800 border-slate-700 hover:bg-slate-700 transition-colors duration-300"
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-sm">{index + 1}</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">
                          {language === "en" ? department.name_en : department.name_am}
                        </h3>
                        {(department.description_en || department.description_am) && (
                          <p className="text-gray-400 text-sm mt-1">
                            {language === "en" ? department.description_en : department.description_am}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <button className="text-blue-400 hover:text-blue-300 font-medium text-sm uppercase tracking-wide">
              {language === "en" ? "DISCOVER OUR STRUCTURE" : "የእኛን መዋቅር ያግኙ"}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

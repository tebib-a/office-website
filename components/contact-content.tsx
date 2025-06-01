"use client"

import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent } from "@/components/ui/card"
import { Phone, Mail, MapPin, Clock, Globe, MessageSquare } from "lucide-react"
import ContactForm from "@/components/contact-form"

export default function ContactContent() {
  const { language } = useLanguage()

  const contactInfo = [
    {
      icon: Phone,
      title: language === "en" ? "Phone" : "ስልክ",
      details: ["+251-11-123-4567", "+251-11-765-4321"],
      description: language === "en" ? "Call us during business hours" : "በስራ ሰዓት ይደውሉልን",
    },
    {
      icon: Mail,
      title: language === "en" ? "Email" : "ኢሜይል",
      details: ["info@office.gov.et", "support@office.gov.et"],
      description: language === "en" ? "Send us an email anytime" : "በማንኛውም ጊዜ ኢሜይል ይላኩልን",
    },
    {
      icon: MapPin,
      title: language === "en" ? "Address" : "አድራሻ",
      details: ["123 Government Street", "Addis Ababa, Ethiopia"],
      description: language === "en" ? "Visit us at our office" : "በቢሮአችን ይጎብኙን",
    },
    {
      icon: Clock,
      title: language === "en" ? "Office Hours" : "የቢሮ ሰዓት",
      details: [
        language === "en" ? "Monday - Friday: 8:00 AM - 5:00 PM" : "ሰኞ - አርብ: 8:00 ጠዋት - 5:00 ከሰዓት",
        language === "en" ? "Saturday: 9:00 AM - 1:00 PM" : "ቅዳሜ: 9:00 ጠዋት - 1:00 ከሰዓት",
      ],
      description: language === "en" ? "We're here to help" : "ለመርዳት እዚህ ነን",
    },
  ]

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <h1 className="text-4xl lg:text-6xl font-bold">{language === "en" ? "Contact Us" : "ያግኙን"}</h1>
            <div className="w-24 h-1 bg-blue-400 mx-auto"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {language === "en"
                ? "Get in touch with us for assistance, information, or to provide feedback about our services."
                : "ለእርዳታ፣ ለመረጃ ወይም ስለ አገልግሎቶቻችን አስተያየት ለመስጠት ያግኙን።"}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">
              {language === "en" ? "Get in Touch" : "ያግኙን"}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {language === "en"
                ? "We're here to help and answer any questions you might have."
                : "ለመርዳት እና ሊኖሩዎት የሚችሉ ማንኛውንም ጥያቄዎች ለመመለስ እዚህ ነን።"}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8 text-center space-y-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                    <info.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-slate-900">{info.title}</h3>
                    <div className="space-y-1">
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-gray-600 font-medium">
                          {detail}
                        </p>
                      ))}
                    </div>
                    <p className="text-sm text-gray-500">{info.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-8">
              <div className="space-y-6">
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">
                  {language === "en" ? "Send us a Message" : "መልእክት ይላኩልን"}
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {language === "en"
                    ? "Have a question or need assistance? Fill out the form and we'll get back to you as soon as possible."
                    : "ጥያቄ አለዎት ወይም እርዳታ ይፈልጋሉ? ቅጹን ይሙሉ እና በተቻለ ፍጥነት እንመልስልዎታለን።"}
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <MessageSquare className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2">
                      {language === "en" ? "Quick Response" : "ፈጣን ምላሽ"}
                    </h3>
                    <p className="text-gray-600">
                      {language === "en"
                        ? "We typically respond to messages within 24 hours during business days."
                        : "በተለምዶ በስራ ቀናት ውስጥ በ24 ሰዓት ውስጥ ለመልእክቶች እንመልሳለን።"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Globe className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2">
                      {language === "en" ? "Multiple Languages" : "በርካታ ቋንቋዎች"}
                    </h3>
                    <p className="text-gray-600">
                      {language === "en"
                        ? "We can assist you in both English and Amharic languages."
                        : "በእንግሊዝኛ እና በአማርኛ ቋንቋዎች ሁለቱም እርዳታ ልንሰጥዎ እንችላለን።"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">{language === "en" ? "Find Us" : "ያግኙን"}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {language === "en"
                ? "Visit our office for in-person assistance and support."
                : "በአካል ለእርዳታ እና ድጋፍ ቢሮአችንን ይጎብኙ።"}
            </p>
          </div>

          <div className="aspect-video bg-gray-200 rounded-2xl flex items-center justify-center">
            <div className="text-center space-y-4">
              <MapPin className="h-16 w-16 text-gray-400 mx-auto" />
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-gray-600">
                  {language === "en" ? "Office Location" : "የቢሮ አካባቢ"}
                </h3>
                <p className="text-gray-500">123 Government Street, Addis Ababa, Ethiopia</p>
                <p className="text-sm text-gray-400">
                  {language === "en" ? "Interactive map coming soon" : "በቅርቡ የሚመጣ በይነተገናኝ ካርታ"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

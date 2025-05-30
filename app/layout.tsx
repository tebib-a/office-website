import type React from "react"
import "./globals.css"

export const metadata = {
  title: "Office Admin Dashboard",
  description: "Admin dashboard for office management",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

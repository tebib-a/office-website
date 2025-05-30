"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import type { User } from "@supabase/supabase-js"
import { supabase } from "@/lib/supabase"

interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  isAdmin: boolean
  currentEmail: string | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const ADMIN_PASSWORD = "ttxx.1234"

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const [currentEmail, setCurrentEmail] = useState<string | null>(null)

  useEffect(() => {
    // Check for existing admin session
    const adminSession = localStorage.getItem("admin_session")
    if (adminSession) {
      try {
        const session = JSON.parse(adminSession)
        setIsAdmin(true)
        setCurrentEmail(session.email)
        setLoading(false)
        return
      } catch (error) {
        localStorage.removeItem("admin_session")
      }
    }

    // Check Supabase session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      checkAdminStatus(session?.user)
      setLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null)
      checkAdminStatus(session?.user)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const checkAdminStatus = async (user: User | null) => {
    if (!user) {
      setIsAdmin(false)
      setCurrentEmail(null)
      return
    }

    try {
      const { data } = await supabase.from("profiles").select("role, email").eq("id", user.id).single()

      if (data?.role === "admin") {
        setIsAdmin(true)
        setCurrentEmail(data.email)
      } else {
        setIsAdmin(false)
        setCurrentEmail(null)
      }
    } catch (error) {
      setIsAdmin(false)
      setCurrentEmail(null)
    }
  }

  const signIn = async (email: string, password: string) => {
    // Check if password is correct
    if (password !== ADMIN_PASSWORD) {
      throw new Error("Invalid password")
    }

    try {
      // Create or update profile for this email
      const { data: existingProfile } = await supabase.from("profiles").select("*").eq("email", email).single()

      const profileData = {
        email,
        role: "admin",
        email_verified: true,
        created_at: existingProfile?.created_at || new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }

      if (existingProfile) {
        await supabase.from("profiles").update(profileData).eq("id", existingProfile.id)
      } else {
        await supabase.from("profiles").insert({
          ...profileData,
          id: crypto.randomUUID(),
        })
      }

      // Set admin session
      localStorage.setItem(
        "admin_session",
        JSON.stringify({
          email,
          isAdmin: true,
          loginTime: new Date().toISOString(),
        }),
      )

      setIsAdmin(true)
      setCurrentEmail(email)
    } catch (error: any) {
      throw new Error("Authentication failed")
    }
  }

  const signOut = async () => {
    localStorage.removeItem("admin_session")
    await supabase.auth.signOut()
    setIsAdmin(false)
    setCurrentEmail(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut, isAdmin, currentEmail }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

"use server"

import { supabase } from "@/lib/supabase/client"
import { cookies } from "next/headers"

const ADMIN_PASSWORD = "cursoia"
const ADMIN_SESSION_COOKIE = "admin_session"

export async function verifyPassword(password: string): Promise<boolean> {
  if (password === ADMIN_PASSWORD) {
    const cookieStore = await cookies()
    // Crear sesión simple que expira en 24 horas
    cookieStore.set(ADMIN_SESSION_COOKIE, "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 24 horas
      path: "/admin",
    })
    return true
  }
  return false
}

export async function checkAdminSession(): Promise<boolean> {
  const cookieStore = await cookies()
  const session = cookieStore.get(ADMIN_SESSION_COOKIE)
  return session?.value === "authenticated"
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete(ADMIN_SESSION_COOKIE)
}

export async function getWaitlistEmails() {
  const { data, error } = await supabase
    .from("waitlist")
    .select("id, email, created_at")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching waitlist:", error)
    return { emails: [], error: error.message }
  }

  return { emails: data || [], error: null }
}

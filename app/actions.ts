"use server"

// TODO S2: conectar a Supabase
// import { createClient } from "@/lib/supabase/server"

type WaitlistState = { error?: string; success?: boolean }

export async function joinWaitlist(
  _prevState: WaitlistState,
  formData: FormData
): Promise<WaitlistState> {
  const email = formData.get("email") as string

  if (!email || !email.includes("@")) {
    return { error: "Email inválido" }
  }

  // S2: Aquí conectaremos Supabase
  // const supabase = await createClient()
  // const { error } = await supabase.from("waitlist").insert({ email })
  // if (error) return { error: "Ya estás en la lista o hubo un error." }

  console.log("Waitlist signup:", email)
  return { success: true }
}

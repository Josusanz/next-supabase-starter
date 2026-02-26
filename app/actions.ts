"use server"

import { supabase } from "@/lib/supabase/client"

type WaitlistState = { error?: string; success?: boolean; message?: string }

export async function joinWaitlist(
  _prevState: WaitlistState,
  formData: FormData
): Promise<WaitlistState> {
  const email = formData.get("email") as string

  if (!email || !email.includes("@")) {
    return { error: "Email inválido" }
  }

  try {
    // Verificar si el email ya existe
    const { data: existingEmail, error: checkError } = await supabase
      .from("waitlist")
      .select("email")
      .eq("email", email)
      .single()

    if (checkError && checkError.code !== "PGRST116") {
      // PGRST116 es el código cuando no se encuentra nada (lo cual está bien)
      console.error("Error checking email:", checkError)
      return { error: "Hubo un error al procesar tu solicitud. Inténtalo de nuevo." }
    }

    if (existingEmail) {
      return {
        success: true,
        message: "¡Ya estás en la lista! Te avisaremos pronto."
      }
    }

    // Insertar nuevo email
    const { error: insertError } = await supabase
      .from("waitlist")
      .insert({ email })

    if (insertError) {
      console.error("Error inserting email:", insertError)
      return { error: "Hubo un error al guardar tu email. Inténtalo de nuevo." }
    }

    return {
      success: true,
      message: "Perfecto estás apuntado al proyecto! cuando este en directo te avisamos!"
    }
  } catch (error) {
    console.error("Unexpected error:", error)
    return { error: "Hubo un error inesperado. Inténtalo de nuevo." }
  }
}

import { NextResponse } from "next/server"
import { verifyMessage } from "viem"
import { supabaseAdmin } from "@/lib/supabase/admin"
import { createSupabaseServer } from "@/lib/supabase/server"

export async function POST(request: Request) {
  const { address, signature, message } = await request.json()

  if (!address || !signature || !message) {
    return NextResponse.json({ error: "Faltan datos" }, { status: 400 })
  }

  // Verificar que la firma es válida
  const valid = await verifyMessage({
    address: address as `0x${string}`,
    message,
    signature: signature as `0x${string}`,
  })

  if (!valid) {
    return NextResponse.json({ error: "Firma invalida" }, { status: 401 })
  }

  const email = `${address.toLowerCase()}@wallet.eth`

  // Buscar si el usuario ya existe
  const { data: existingUsers } = await supabaseAdmin.auth.admin.listUsers()
  const existingUser = existingUsers?.users.find((u) => u.email === email)

  let userId: string

  if (existingUser) {
    userId = existingUser.id
  } else {
    // Crear usuario nuevo
    const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
      email,
      email_confirm: true,
      user_metadata: { wallet_address: address, full_name: `${address.slice(0, 6)}...${address.slice(-4)}` },
    })

    if (createError || !newUser.user) {
      return NextResponse.json({ error: createError?.message || "Error creando usuario" }, { status: 500 })
    }

    userId = newUser.user.id
  }

  // Generar magic link para iniciar sesion
  const { data: linkData, error: linkError } = await supabaseAdmin.auth.admin.generateLink({
    type: "magiclink",
    email,
  })

  if (linkError || !linkData) {
    return NextResponse.json({ error: linkError?.message || "Error generando sesion" }, { status: 500 })
  }

  // Intercambiar el token por una sesion
  const supabase = await createSupabaseServer()
  const { data: session, error: sessionError } = await supabase.auth.verifyOtp({
    token_hash: linkData.properties.hashed_token,
    type: "magiclink",
  })

  if (sessionError) {
    return NextResponse.json({ error: sessionError.message }, { status: 500 })
  }

  return NextResponse.json({ success: true, user: session.user })
}

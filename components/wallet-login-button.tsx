"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useConnect, useAccount, useSignMessage, useDisconnect } from "wagmi"
import { injected } from "wagmi/connectors"
import { Button } from "@/components/ui/button"
import { Wallet } from "lucide-react"

export function WalletLoginButton() {
  const router = useRouter()
  const { connectAsync } = useConnect()
  const { address } = useAccount()
  const { signMessageAsync } = useSignMessage()
  const { disconnectAsync } = useDisconnect()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleWalletLogin() {
    setLoading(true)
    setError("")

    try {
      // Conectar wallet (Rabby, MetaMask, etc.)
      const result = await connectAsync({ connector: injected() })
      const walletAddress = result.accounts[0]

      if (!walletAddress) {
        setError("No se pudo obtener la direccion")
        setLoading(false)
        return
      }

      // Firmar mensaje para verificar propiedad
      const message = `Iniciar sesion en Next Supabase Starter\nWallet: ${walletAddress}\nTimestamp: ${Date.now()}`
      const signature = await signMessageAsync({ message })

      // Enviar al servidor para verificar y crear sesion
      const res = await fetch("/api/auth/wallet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address: walletAddress, signature, message }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Error al iniciar sesion")
        await disconnectAsync()
        setLoading(false)
        return
      }

      router.push("/dashboard")
      router.refresh()
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error al conectar wallet"
      // Si el usuario cancela la conexion/firma
      if (msg.includes("rejected") || msg.includes("denied")) {
        setError("Conexion cancelada")
      } else {
        setError(msg)
      }
      setLoading(false)
    }
  }

  return (
    <div>
      <Button
        variant="outline"
        className="w-full gap-2"
        onClick={handleWalletLogin}
        disabled={loading}
      >
        <Wallet className="h-4 w-4" />
        {loading ? "Conectando wallet..." : "Continuar con Wallet"}
      </Button>
      {error && <p className="mt-2 text-center text-sm text-red-600">{error}</p>}
    </div>
  )
}

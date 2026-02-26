"use client"

import { useEffect, useState } from "react"
import { checkAdminSession, verifyPassword, logout, getWaitlistEmails } from "./actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type WaitlistEntry = {
  id: string
  email: string
  created_at: string
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isChecking, setIsChecking] = useState(true)
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [emails, setEmails] = useState<WaitlistEntry[]>([])
  const [dataError, setDataError] = useState("")

  useEffect(() => {
    checkSession()
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      loadEmails()
    }
  }, [isAuthenticated])

  async function checkSession() {
    const authenticated = await checkAdminSession()
    setIsAuthenticated(authenticated)
    setIsChecking(false)
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    const isValid = await verifyPassword(password)

    if (isValid) {
      setIsAuthenticated(true)
    } else {
      setError("Contraseña incorrecta")
    }

    setIsLoading(false)
    setPassword("")
  }

  async function handleLogout() {
    await logout()
    setIsAuthenticated(false)
    setEmails([])
  }

  async function loadEmails() {
    setIsLoading(true)
    const { emails: data, error } = await getWaitlistEmails()

    if (error) {
      setDataError(error)
    } else {
      setEmails(data)
    }

    setIsLoading(false)
  }

  function formatDate(dateString: string) {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("es-ES", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  if (isChecking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#08090a]">
        <div className="text-slate-400">Verificando sesión...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#08090a] px-6">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
            <p className="mt-2 text-sm text-slate-400">
              Ingresa la contraseña para acceder
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11 border-white/10 bg-white/5 text-white placeholder:text-slate-500 focus-visible:ring-indigo-500 focus-visible:border-indigo-500/50"
                disabled={isLoading}
              />
              {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
            </div>

            <Button
              type="submit"
              disabled={isLoading || !password}
              className="h-11 w-full bg-indigo-500 hover:bg-indigo-400 text-white font-medium"
            >
              {isLoading ? "Verificando..." : "Acceder"}
            </Button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#08090a] px-6 py-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Waitlist Dashboard</h1>
            <p className="mt-1 text-sm text-slate-400">
              Gestiona los registros de tu lista de espera
            </p>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white"
          >
            Cerrar sesión
          </Button>
        </div>

        {/* Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
            <div className="text-sm font-medium text-slate-400">Total de registros</div>
            <div className="mt-2 text-3xl font-bold text-white">{emails.length}</div>
          </div>
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
            <div className="text-sm font-medium text-slate-400">Último registro</div>
            <div className="mt-2 text-lg font-medium text-white">
              {emails.length > 0 ? formatDate(emails[0].created_at) : "N/A"}
            </div>
          </div>
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
            <div className="text-sm font-medium text-slate-400">Estado</div>
            <div className="mt-2 flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-500" />
              <span className="text-lg font-medium text-emerald-400">Activo</span>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-slate-400">
                    #
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-slate-400">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-slate-400">
                    Fecha de registro
                  </th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={3} className="px-6 py-12 text-center text-slate-400">
                      Cargando datos...
                    </td>
                  </tr>
                ) : dataError ? (
                  <tr>
                    <td colSpan={3} className="px-6 py-12 text-center text-red-400">
                      Error: {dataError}
                    </td>
                  </tr>
                ) : emails.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-6 py-12 text-center text-slate-400">
                      No hay registros aún
                    </td>
                  </tr>
                ) : (
                  emails.map((entry, index) => (
                    <tr
                      key={entry.id}
                      className="border-b border-white/[0.06] transition-colors hover:bg-white/[0.02]"
                    >
                      <td className="px-6 py-4 text-sm text-slate-500">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-white">
                        {entry.email}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-400">
                        {formatDate(entry.created_at)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-6 text-center text-xs text-slate-600">
          Los datos se actualizan en tiempo real desde Supabase
        </div>
      </div>
    </div>
  )
}

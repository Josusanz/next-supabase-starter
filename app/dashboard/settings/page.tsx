import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function SettingsPage() {
  return (
    <main className="space-y-8 px-6 py-8">
      {/* Page header */}
      <div>
        <h1 className="text-xl font-bold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-400">Configuración del proyecto</p>
      </div>

      {/* Project */}
      <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-100 px-6 py-4">
          <h2 className="text-sm font-semibold text-gray-900">Proyecto</h2>
        </div>
        <div className="space-y-5 px-6 py-5">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">
              Nombre del proyecto
            </label>
            <Input
              defaultValue="next-supabase-starter"
              className="max-w-sm border-gray-200"
              disabled
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">
              URL pública
            </label>
            <Input
              defaultValue="https://tu-dominio.vercel.app"
              className="max-w-sm border-gray-200"
              disabled
            />
          </div>
        </div>
      </section>

      {/* Stack */}
      <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-100 px-6 py-4">
          <h2 className="text-sm font-semibold text-gray-900">Stack activo</h2>
        </div>
        <div className="px-6 py-5">
          <div className="flex flex-wrap gap-2">
            {[
              { label: "Next.js 16", color: "bg-gray-100 text-gray-700" },
              { label: "Supabase", color: "bg-emerald-50 text-emerald-700" },
              { label: "Stripe", color: "bg-violet-50 text-violet-700" },
              { label: "Resend", color: "bg-blue-50 text-blue-700" },
              { label: "shadcn/ui", color: "bg-gray-100 text-gray-700" },
              { label: "Tailwind v4", color: "bg-cyan-50 text-cyan-700" },
              { label: "TypeScript", color: "bg-indigo-50 text-indigo-700" },
              { label: "Vercel", color: "bg-gray-100 text-gray-700" },
            ].map((tech) => (
              <span
                key={tech.label}
                className={`rounded-full px-3 py-1 text-xs font-medium ${tech.color}`}
              >
                {tech.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Waitlist */}
      <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-100 px-6 py-4">
          <h2 className="text-sm font-semibold text-gray-900">Waitlist</h2>
        </div>
        <div className="space-y-4 px-6 py-5">
          <div className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3">
            <div>
              <p className="text-sm font-medium text-gray-700">
                Formulario público
              </p>
              <p className="text-xs text-gray-400">Activo en la landing page</p>
            </div>
            <Badge className="border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-50">
              Activo
            </Badge>
          </div>
          <div className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3">
            <div>
              <p className="text-sm font-medium text-gray-700">
                Tabla en Supabase
              </p>
              <p className="text-xs text-gray-400">
                Proyecto conectado correctamente
              </p>
            </div>
            <Badge className="border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-50">
              Conectado
            </Badge>
          </div>
        </div>
      </section>

      {/* Danger zone */}
      <section className="overflow-hidden rounded-2xl border border-red-200 bg-white shadow-sm">
        <div className="border-b border-red-100 px-6 py-4">
          <h2 className="text-sm font-semibold text-red-600">Zona de peligro</h2>
        </div>
        <div className="px-6 py-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-700">
                Exportar todos los datos
              </p>
              <p className="text-xs text-gray-400">
                Descarga todos los emails de la waitlist en CSV
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="border-gray-200 text-gray-600"
              asChild
            >
              <a href="/dashboard/emails">Ver emails →</a>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}

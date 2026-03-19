import { createSupabaseServer } from "@/lib/supabase/server"
import { FolderOpen, CalendarDays, Zap, TrendingUp } from "lucide-react"
import { ProjectsTable } from "@/components/projects-table"
import type { Tables } from "@/lib/supabase/database.types"

type Project = Tables<"projects">

function getStats(projects: Project[]) {
  const now = new Date()
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const weekAgo = new Date(todayStart.getTime() - 7 * 24 * 60 * 60 * 1000)

  const todayCount = projects.filter((p) => p.created_at && new Date(p.created_at) >= todayStart).length
  const thisWeekCount = projects.filter((p) => p.created_at && new Date(p.created_at) >= weekAgo).length
  const activeCount = projects.filter((p) => p.status === "activo").length

  return { total: projects.length, thisWeek: thisWeekCount, today: todayCount, active: activeCount }
}

export default async function DashboardPage() {
  const supabase = await createSupabaseServer()
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false })

  const projects: Project[] = data || []
  const stats = getStats(projects)

  return (
    <main className="space-y-8 px-6 py-8">
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-6 py-4 text-sm text-red-600">
          Error al cargar datos: {error.message}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total proyectos"
          value={stats.total}
          icon={<FolderOpen className="h-4 w-4 text-indigo-500" />}
          accent="indigo"
          description="proyectos creados"
        />
        <StatCard
          title="Activos"
          value={stats.active}
          icon={<Zap className="h-4 w-4 text-emerald-500" />}
          accent="emerald"
          description="en progreso"
        />
        <StatCard
          title="Esta semana"
          value={stats.thisWeek}
          icon={<CalendarDays className="h-4 w-4 text-violet-500" />}
          accent="violet"
          description="ultimos 7 dias"
        />
        <StatCard
          title="Hoy"
          value={stats.today}
          icon={<TrendingUp className="h-4 w-4 text-amber-500" />}
          accent="amber"
          description="creados hoy"
        />
      </div>

      {/* Projects CRUD table */}
      <ProjectsTable initialProjects={projects} />
    </main>
  )
}

type Accent = "indigo" | "violet" | "amber" | "emerald"

const accentStyles: Record<Accent, string> = {
  indigo: "bg-indigo-50",
  violet: "bg-violet-50",
  amber: "bg-amber-50",
  emerald: "bg-emerald-50",
}

function StatCard({
  title, value, icon, description, accent = "indigo",
}: {
  title: string
  value: string | number
  icon: React.ReactNode
  description: string
  accent?: Accent
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm font-medium text-gray-500">{title}</span>
        <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${accentStyles[accent]}`}>
          {icon}
        </div>
      </div>
      <div className="text-3xl font-bold text-gray-900">{value}</div>
      <p className="mt-1 text-xs text-gray-400">{description}</p>
    </div>
  )
}

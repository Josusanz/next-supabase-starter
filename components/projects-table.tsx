"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Pencil, Trash2, Plus } from "lucide-react"
import { createSupabaseBrowser } from "@/lib/supabase/browser"
import type { Tables } from "@/lib/supabase/database.types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import {
  Dialog, DialogContent, DialogDescription, DialogFooter,
  DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog"

type Project = Tables<"projects">

const statusOptions = ["activo", "pausado", "completado", "cancelado"]

const statusStyles: Record<string, string> = {
  activo: "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-50",
  pausado: "border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-50",
  completado: "border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-50",
  cancelado: "border-red-200 bg-red-50 text-red-700 hover:bg-red-50",
}

function formatDate(dateString: string | null) {
  if (!dateString) return "—"
  return new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(dateString))
}

// ── CREATE ──────────────────────────────────────────────────

function CreateProjectDialog({ onSuccess }: { onSuccess: () => void }) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError("")

    const supabase = createSupabaseBrowser()

    const fd = new FormData(e.currentTarget)
    const name = fd.get("name") as string
    const description = fd.get("description") as string

    const { error: err } = await supabase
      .from("projects")
      .insert({ name, description, status: "activo" })

    if (err) {
      setError(err.message)
      setLoading(false)
      return
    }

    setLoading(false)
    setOpen(false)
    onSuccess()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 bg-indigo-600 hover:bg-indigo-700">
          <Plus className="h-4 w-4" />
          Nuevo proyecto
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crear nuevo proyecto</DialogTitle>
          <DialogDescription>Añade un nuevo proyecto a tu panel.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="create-name" className="text-sm font-medium text-gray-700">Nombre</label>
            <Input id="create-name" name="name" placeholder="Mi proyecto" required />
          </div>
          <div className="space-y-2">
            <label htmlFor="create-desc" className="text-sm font-medium text-gray-700">Descripcion</label>
            <Input id="create-desc" name="description" placeholder="Descripcion del proyecto (opcional)" />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
            <Button type="submit" disabled={loading} className="bg-indigo-600 hover:bg-indigo-700">
              {loading ? "Creando..." : "Crear proyecto"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

// ── UPDATE ──────────────────────────────────────────────────

function EditProjectDialog({ project, onSuccess }: { project: Project; onSuccess: () => void }) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError("")

    const supabase = createSupabaseBrowser()
    const fd = new FormData(e.currentTarget)
    const name = fd.get("name") as string
    const description = fd.get("description") as string
    const status = fd.get("status") as string

    const { error: err } = await supabase
      .from("projects")
      .update({ name, description, status })
      .eq("id", project.id)

    if (err) {
      setError(err.message)
      setLoading(false)
      return
    }

    setLoading(false)
    setOpen(false)
    onSuccess()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-indigo-600">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar proyecto</DialogTitle>
          <DialogDescription>Modifica los datos del proyecto.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor={`edit-name-${project.id}`} className="text-sm font-medium text-gray-700">Nombre</label>
            <Input id={`edit-name-${project.id}`} name="name" defaultValue={project.name} required />
          </div>
          <div className="space-y-2">
            <label htmlFor={`edit-desc-${project.id}`} className="text-sm font-medium text-gray-700">Descripcion</label>
            <Input id={`edit-desc-${project.id}`} name="description" defaultValue={project.description || ""} />
          </div>
          <div className="space-y-2">
            <label htmlFor={`edit-status-${project.id}`} className="text-sm font-medium text-gray-700">Estado</label>
            <select
              id={`edit-status-${project.id}`}
              name="status"
              defaultValue={project.status || "activo"}
              className="h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
            >
              {statusOptions.map((s) => (
                <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
              ))}
            </select>
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
            <Button type="submit" disabled={loading} className="bg-indigo-600 hover:bg-indigo-700">
              {loading ? "Guardando..." : "Guardar cambios"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

// ── DELETE ──────────────────────────────────────────────────

function DeleteProjectDialog({ project, onSuccess }: { project: Project; onSuccess: () => void }) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleDelete() {
    setLoading(true)
    const supabase = createSupabaseBrowser()
    await supabase.from("projects").delete().eq("id", project.id)
    setLoading(false)
    setOpen(false)
    onSuccess()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-red-600">
          <Trash2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Eliminar proyecto</DialogTitle>
          <DialogDescription>
            ¿Seguro que quieres eliminar <strong>{project.name}</strong>? Esta accion no se puede deshacer.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
          <Button variant="destructive" disabled={loading} onClick={handleDelete}>
            {loading ? "Eliminando..." : "Eliminar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// ── TABLE PRINCIPAL ─────────────────────────────────────────

export function ProjectsTable({ initialProjects }: { initialProjects: Project[] }) {
  const router = useRouter()
  const [projects, setProjects] = useState(initialProjects)

  async function refresh() {
    const supabase = createSupabaseBrowser()
    const { data } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false })
    if (data) setProjects(data)
    router.refresh()
  }

  return (
    <>
      {/* Header con boton crear */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Proyectos</h1>
          <p className="text-sm text-gray-400">Gestiona tus proyectos</p>
        </div>
        <CreateProjectDialog onSuccess={refresh} />
      </div>

      {/* Tabla */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="text-sm font-semibold text-gray-900">Todos los proyectos</h2>
          <p className="text-xs text-gray-400">{projects.length} proyectos en total</p>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 hover:bg-gray-50">
              <TableHead className="text-gray-500">Nombre</TableHead>
              <TableHead className="text-gray-500">Descripcion</TableHead>
              <TableHead className="text-gray-500">Estado</TableHead>
              <TableHead className="text-gray-500">Fecha</TableHead>
              <TableHead className="text-right text-gray-500">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="py-10 text-center text-gray-400">
                  No hay proyectos aun. Crea tu primer proyecto.
                </TableCell>
              </TableRow>
            ) : (
              projects.map((project) => (
                <TableRow key={project.id} className="border-gray-100 hover:bg-gray-50">
                  <TableCell className="font-medium text-gray-900">{project.name}</TableCell>
                  <TableCell className="max-w-xs truncate text-gray-500">
                    {project.description || "—"}
                  </TableCell>
                  <TableCell>
                    <Badge className={statusStyles[project.status || "activo"] || statusStyles.activo}>
                      {project.status || "activo"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-500">{formatDate(project.created_at)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <EditProjectDialog project={project} onSuccess={refresh} />
                      <DeleteProjectDialog project={project} onSuccess={refresh} />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </>
  )
}

import { supabase } from "@/lib/supabase/client"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Users } from "lucide-react"
import ExportButton from "@/app/dashboard/export-button"

type WaitlistEntry = {
  id: string
  email: string
  created_at: string | null
}

function formatDate(dateString: string | null) {
  if (!dateString) return "N/A"
  return new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(dateString))
}

export default async function EmailsPage() {
  const { data, error } = await supabase
    .from("waitlist")
    .select("id, email, created_at")
    .order("created_at", { ascending: false })

  const emails: WaitlistEntry[] = data || []

  return (
    <main className="space-y-8 px-6 py-8">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Emails</h1>
          <p className="text-sm text-gray-400">
            {emails.length} {emails.length === 1 ? "registro" : "registros"} en
            la waitlist
          </p>
        </div>
        <ExportButton emails={emails} />
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-6 py-4 text-sm text-red-600">
          Error al cargar datos: {error.message}
        </div>
      )}

      {/* Full table */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 hover:bg-gray-50">
              <TableHead className="w-14 text-gray-500">#</TableHead>
              <TableHead className="text-gray-500">Email</TableHead>
              <TableHead className="hidden text-gray-500 sm:table-cell">
                Fecha de registro
              </TableHead>
              <TableHead className="text-right text-gray-500">Estado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {emails.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="py-16 text-center text-gray-400"
                >
                  <div className="flex flex-col items-center gap-2">
                    <Users className="h-8 w-8 opacity-30" />
                    <p>No hay registros aún</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              emails.map((entry, index) => (
                <TableRow
                  key={entry.id}
                  className="border-gray-100 hover:bg-gray-50"
                >
                  <TableCell className="text-gray-400">{index + 1}</TableCell>
                  <TableCell>
                    <div className="font-medium text-gray-900">
                      {entry.email}
                    </div>
                    <div className="mt-0.5 text-xs text-gray-400 sm:hidden">
                      {formatDate(entry.created_at)}
                    </div>
                  </TableCell>
                  <TableCell className="hidden text-gray-500 sm:table-cell">
                    {formatDate(entry.created_at)}
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge className="border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-50">
                      Registrado
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <p className="text-center text-xs text-gray-300">
        Datos en tiempo real desde Supabase
      </p>
    </main>
  )
}

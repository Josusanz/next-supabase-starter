"use client"

import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"

type WaitlistEntry = {
  id: string
  email: string
  created_at: string | null
}

export default function ExportButton({ emails }: { emails: WaitlistEntry[] }) {
  function exportCSV() {
    const headers = ["#", "Email", "Fecha de registro"]
    const rows = emails.map((entry, index) => [
      index + 1,
      entry.email,
      entry.created_at ? new Date(entry.created_at).toLocaleString("es-ES") : "N/A",
    ])

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n")

    const blob = new Blob(["\uFEFF" + csvContent], {
      type: "text/csv;charset=utf-8;",
    })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `waitlist-${new Date().toISOString().split("T")[0]}.csv`
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <Button
      onClick={exportCSV}
      variant="outline"
      size="sm"
      className="gap-2 border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900"
    >
      <Download className="h-4 w-4" />
      Exportar CSV
    </Button>
  )
}

import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.06] bg-[#08090a]/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-500">
            <span className="text-xs font-bold text-white">N</span>
          </div>
          <span className="font-semibold text-white text-sm">next-supabase-starter</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link href="#features" className="text-sm text-slate-400 hover:text-white transition-colors">
            Features
          </Link>
          <Link href="#stack" className="text-sm text-slate-400 hover:text-white transition-colors">
            Stack
          </Link>
          <Link href="#waitlist" className="text-sm text-slate-400 hover:text-white transition-colors">
            Waitlist
          </Link>
        </nav>

        <Button
          asChild
          size="sm"
          className="bg-indigo-500 hover:bg-indigo-400 text-white border-0 font-medium"
        >
          <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
            GitHub →
          </Link>
        </Button>
      </div>
    </header>
  )
}

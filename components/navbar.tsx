import Link from "next/link"
import { Button } from "@/components/ui/button"

const navLinks = [
  { label: "Features", href: "#features", active: true },
  { label: "Stack", href: "#stack" },
  { label: "Waitlist", href: "#waitlist" },
  { label: "GitHub", href: "https://github.com", external: true },
]

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white">
            <span className="text-xs font-bold text-black">N</span>
          </div>
          <span className="font-medium text-white tracking-tight">
            next-supabase-starter
          </span>
        </Link>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-1 text-sm text-zinc-400">
          {navLinks.map((link) =>
            link.active ? (
              <Link
                key={link.label}
                href={link.href}
                className="text-white px-3 py-1.5 bg-gradient-to-r from-zinc-800 to-zinc-900 rounded-full border border-white/10"
              >
                {link.label}
              </Link>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="px-3 py-1.5 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        {/* CTA */}
        <Button
          asChild
          size="sm"
          className="rounded-full bg-gradient-to-b from-white to-zinc-300 text-black hover:opacity-90 transition-opacity font-semibold border-0 px-5"
        >
          <Link href="#waitlist">Get early access</Link>
        </Button>
      </div>
    </header>
  )
}

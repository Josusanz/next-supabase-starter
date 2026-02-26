import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-10 px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-indigo-500">
            <span className="text-[10px] font-bold text-white">N</span>
          </div>
          <span className="text-sm font-medium text-white">next-supabase-starter</span>
        </div>

        <p className="text-xs text-slate-600">
          Open source under MIT license. Built with ❤️ using Claude Code.
        </p>

        <Link
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-slate-500 hover:text-white transition-colors"
        >
          GitHub →
        </Link>
      </div>
    </footer>
  )
}

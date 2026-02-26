import { Navbar } from "@/components/navbar"
import { Features } from "@/components/features"
import { TechStack } from "@/components/tech-stack"
import { Footer } from "@/components/footer"
import { WaitlistForm } from "@/components/waitlist-form"
import { Badge } from "@/components/ui/badge"

export default function Home() {
  return (
    <div className="min-h-screen bg-[#08090a]">
      <Navbar />

      {/* Hero */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-14 text-center">
        {/* Background glow */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-[120px]" />
          <div className="absolute left-1/3 top-2/3 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/8 blur-[100px]" />
        </div>

        {/* Grid overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
          }}
        />

        <div className="relative z-10 flex max-w-4xl flex-col items-center gap-6">
          <Badge
            variant="outline"
            className="border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-medium px-4 py-1.5 hover:bg-indigo-500/10"
          >
            ✦ Coming soon — join the waitlist
          </Badge>

          <h1 className="text-5xl font-bold leading-[1.1] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Ship your SaaS.
            <br />
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-indigo-300 bg-clip-text text-transparent">
              Not your boilerplate.
            </span>
          </h1>

          <p className="max-w-2xl text-lg leading-relaxed text-slate-400 sm:text-xl">
            Production-ready Next.js starter with{" "}
            <span className="text-emerald-400 font-medium">Supabase</span>,{" "}
            <span className="text-violet-400 font-medium">Stripe</span>, and{" "}
            <span className="text-blue-400 font-medium">Resend</span>.
            {" "}Open source. Free forever. No lock-in.
          </p>

          <div id="waitlist" className="flex w-full max-w-md flex-col items-center gap-3 sm:max-w-lg">
            <WaitlistForm />
            <p className="text-xs text-slate-600">
              No spam. Unsubscribe anytime.
            </p>
          </div>

          {/* Tech badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {["Next.js 16", "Supabase", "Stripe", "Resend", "shadcn/ui", "Tailwind v4", "TypeScript"].map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1 text-xs text-slate-500"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="flex h-8 w-5 items-start justify-center rounded-full border border-white/10 pt-1.5">
            <div className="h-1.5 w-1 rounded-full bg-white/20" />
          </div>
        </div>
      </section>

      <Features />
      <TechStack />

      {/* Final CTA */}
      <section className="border-t border-white/[0.06] py-24 px-6">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Ready to launch faster?
          </h2>
          <p className="text-slate-400">
            Join the waitlist and be the first to know when we ship. Early access members get the repo before public launch.
          </p>
          <WaitlistForm />
          <p className="text-xs text-slate-600">
            Already{" "}
            <span className="text-indigo-400 font-medium">—</span>{" "}
            people waiting.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}

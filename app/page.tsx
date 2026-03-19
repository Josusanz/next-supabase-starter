import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { Testimonials } from "@/components/testimonials"
import { TechStack } from "@/components/tech-stack"
import { Footer } from "@/components/footer"
import { WaitlistForm } from "@/components/waitlist-form"
import { Badge } from "@/components/ui/badge"

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <Hero />
      <Features />
      <Testimonials />
      <TechStack />

      {/* Final CTA */}
      <section
        id="waitlist"
        className="relative border-t border-white/[0.06] py-24 px-6 overflow-hidden"
      >
        {/* Glow */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-[100px]" />

        <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
          <Badge
            variant="outline"
            className="border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-medium px-3 py-1"
          >
            Early access
          </Badge>

          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Ready to launch faster?
          </h2>
          <p className="text-zinc-400 max-w-lg">
            Join the waitlist and be the first to know when we ship. Early
            access members get the full repo before public launch — for free.
          </p>

          <div className="w-full max-w-md">
            <WaitlistForm />
          </div>

          <p className="text-xs text-zinc-600">No spam. Unsubscribe anytime.</p>
        </div>
      </section>

      <Footer />
    </div>
  )
}

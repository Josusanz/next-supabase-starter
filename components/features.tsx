import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const features = [
  {
    icon: "⚡",
    title: "Launch in hours, not weeks",
    description:
      "Auth, payments, emails, and database all pre-configured. Skip the boilerplate and ship your actual product from day one.",
  },
  {
    icon: "🔐",
    title: "Secure by default",
    description:
      "Row Level Security, server-side auth with Supabase, and type-safe queries everywhere. Your users' data is protected at every layer.",
  },
  {
    icon: "🚀",
    title: "Production ready",
    description:
      "One-click deploy to Vercel. Automatic preview deployments, analytics, and CI/CD configured from the start.",
  },
]

export function Features() {
  return (
    <section id="features" className="py-24 px-6 border-t border-white/[0.06]">
      <div className="mx-auto max-w-5xl">
        <div className="mb-16 text-center">
          <Badge
            variant="outline"
            className="mb-4 border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-medium px-3 py-1"
          >
            Everything included
          </Badge>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Stop rebuilding the same things
          </h2>
          <p className="mt-4 text-lg text-slate-400 max-w-xl mx-auto">
            Every SaaS needs auth, payments, emails, and a database. We set it
            all up so you can focus on what makes your product unique.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="border-white/[0.08] bg-white/[0.03] text-white hover:border-indigo-500/30 hover:bg-white/[0.05] transition-all duration-200"
            >
              <CardHeader>
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.05] text-2xl">
                  {feature.icon}
                </div>
                <CardTitle className="text-white text-lg leading-snug">
                  {feature.title}
                </CardTitle>
                <CardDescription className="text-slate-400 leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

const features = [
  {
    icon: "🔐",
    title: "Auth out of the box",
    description:
      "Email/password, OAuth (Google, GitHub), magic links, and session management — all wired up with Supabase Auth.",
  },
  {
    icon: "🗄️",
    title: "Database & RLS",
    description:
      "Postgres with Row Level Security enabled by default. Your users' data is protected at the database level.",
  },
  {
    icon: "💳",
    title: "Stripe payments",
    description:
      "Subscription plans, one-time payments, webhooks, and customer portal. Billing just works on day one.",
  },
  {
    icon: "📧",
    title: "Transactional emails",
    description:
      "Welcome emails, password resets, and notifications with Resend and React Email. Beautiful templates included.",
  },
  {
    icon: "🎨",
    title: "UI system ready",
    description:
      "shadcn/ui + Tailwind CSS v4. 50+ accessible components, dark mode, and a design system you can extend.",
  },
  {
    icon: "🚀",
    title: "Deploy in seconds",
    description:
      "One-click deploy to Vercel. Automatic preview deployments on every PR. CI/CD configured from day one.",
  },
  {
    icon: "📊",
    title: "Analytics built-in",
    description:
      "Vercel Analytics and Speed Insights pre-configured. Know who visits your app and how fast it loads.",
  },
  {
    icon: "🛡️",
    title: "Type-safe end to end",
    description:
      "TypeScript everywhere. Supabase generates types from your schema. No more runtime surprises.",
  },
]

export function Features() {
  return (
    <section id="features" className="py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <p className="mb-3 text-sm font-medium tracking-widest text-indigo-400 uppercase">
            Everything included
          </p>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Stop rebuilding the same things
          </h2>
          <p className="mt-4 text-lg text-slate-400 max-w-xl mx-auto">
            Every SaaS needs auth, payments, emails, and a database. We set it all up so you can focus on what makes your product unique.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 transition-all hover:border-white/[0.12] hover:bg-white/[0.04]"
            >
              <div className="mb-4 text-2xl">{feature.icon}</div>
              <h3 className="mb-2 font-semibold text-white">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-slate-500">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

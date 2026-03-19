const stack = [
  {
    name: "Next.js 16",
    desc: "React framework",
    logo: "https://cdn.simpleicons.org/nextdotjs/ffffff",
  },
  {
    name: "Supabase",
    desc: "Database & Auth",
    logo: "https://cdn.simpleicons.org/supabase/3ECF8E",
  },
  {
    name: "Stripe",
    desc: "Payments",
    logo: "https://cdn.simpleicons.org/stripe/635BFF",
  },
  {
    name: "Resend",
    desc: "Email",
    logo: "https://cdn.simpleicons.org/resend/ffffff",
  },
  {
    name: "shadcn/ui",
    desc: "Components",
    logo: "https://cdn.simpleicons.org/shadcnui/ffffff",
  },
  {
    name: "Tailwind v4",
    desc: "Styling",
    logo: "https://cdn.simpleicons.org/tailwindcss/06B6D4",
  },
  {
    name: "TypeScript",
    desc: "Type safety",
    logo: "https://cdn.simpleicons.org/typescript/3178C6",
  },
  {
    name: "Vercel",
    desc: "Deployment",
    logo: "https://cdn.simpleicons.org/vercel/ffffff",
  },
]

export function TechStack() {
  return (
    <section id="stack" className="border-t border-white/[0.06] py-20 px-6">
      <div className="mx-auto max-w-6xl">
        <p className="mb-10 text-center text-sm font-medium tracking-widest text-slate-500 uppercase">
          Built with the best tools in 2026
        </p>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {stack.map((tech) => (
            <div
              key={tech.name}
              className="flex flex-col items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 text-center transition-all hover:border-white/[0.12] hover:bg-white/[0.04]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={tech.logo}
                alt={tech.name}
                width={28}
                height={28}
                className="h-7 w-7"
              />
              <div>
                <p className="text-xs font-semibold text-white">{tech.name}</p>
                <p className="text-[11px] text-slate-600">{tech.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison */}
        <div className="mt-16 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8">
          <h3 className="mb-8 text-center text-lg font-semibold text-white">
            Why not the others?
          </h3>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-red-500/10 bg-red-500/5 p-5">
              <p className="mb-3 text-sm font-semibold text-red-400">next-saas-stripe-starter</p>
              <ul className="space-y-1.5 text-xs text-slate-500">
                <li>⚠️ Prisma + Neon (more complexity)</li>
                <li>⚠️ Auth.js v5 (unstable)</li>
                <li>⚠️ Next.js 14 (outdated)</li>
                <li>⚠️ Last updated 2023</li>
              </ul>
            </div>
            <div className="rounded-xl border border-yellow-500/10 bg-yellow-500/5 p-5">
              <p className="mb-3 text-sm font-semibold text-yellow-400">create-t3-app</p>
              <ul className="space-y-1.5 text-xs text-slate-500">
                <li>⚠️ tRPC adds complexity</li>
                <li>⚠️ No payments included</li>
                <li>⚠️ No email included</li>
                <li>⚠️ Steep learning curve</li>
              </ul>
            </div>
            <div className="rounded-xl border border-emerald-500/10 bg-emerald-500/5 p-5">
              <p className="mb-3 text-sm font-semibold text-emerald-400">next-supabase-starter ✓</p>
              <ul className="space-y-1.5 text-xs text-slate-500">
                <li>✅ Supabase (simple & powerful)</li>
                <li>✅ Next.js 16 (latest)</li>
                <li>✅ Stripe + Resend included</li>
                <li>✅ Zero config auth</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const testimonials = [
  {
    quote:
      "I launched my SaaS in 3 days instead of 3 weeks. The boilerplate saved me countless hours of setup and let me focus on the actual product.",
    author: "Alex Chen",
    role: "Indie hacker",
    avatar: "AC",
    color: "bg-indigo-500/20 text-indigo-300",
  },
  {
    quote:
      "Finally a starter that doesn't try to be everything. Clean code, great stack, and incredibly easy to extend for my specific needs.",
    author: "Sara M.",
    role: "Full-stack developer",
    avatar: "SM",
    color: "bg-violet-500/20 text-violet-300",
  },
  {
    quote:
      "The Supabase + Stripe integration is seamless. My subscription app was live and taking payments before the weekend.",
    author: "Marcos R.",
    role: "SaaS founder",
    avatar: "MR",
    color: "bg-emerald-500/20 text-emerald-300",
  },
]

export function Testimonials() {
  return (
    <section className="py-24 px-6 border-t border-white/[0.06]">
      <div className="mx-auto max-w-5xl">
        <div className="mb-16 text-center">
          <Badge
            variant="outline"
            className="mb-4 border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-medium px-3 py-1"
          >
            Social proof
          </Badge>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Builders love it
          </h2>
          <p className="mt-4 text-slate-400 max-w-md mx-auto">
            Join hundreds of developers already using this starter to ship
            faster and spend less time on infrastructure.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {testimonials.map((t) => (
            <Card
              key={t.author}
              className="border-white/[0.08] bg-white/[0.03] hover:border-white/[0.12] transition-all duration-200"
            >
              <CardContent className="pt-6 pb-6">
                {/* Stars */}
                <div className="mb-4 flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="text-amber-400"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>

                <p className="text-slate-300 leading-relaxed mb-6 text-sm">
                  &ldquo;{t.quote}&rdquo;
                </p>

                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback
                      className={`text-xs font-semibold ${t.color}`}
                    >
                      {t.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-white">{t.author}</p>
                    <p className="text-xs text-slate-500">{t.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Social count */}
        <div className="mt-12 text-center">
          <p className="text-sm text-slate-500">
            Trusted by{" "}
            <span className="text-white font-medium">200+</span> developers
            worldwide
          </p>
        </div>
      </div>
    </section>
  )
}

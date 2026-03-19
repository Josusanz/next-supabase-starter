"use client"

import { useActionState } from "react"
import { joinWaitlist } from "@/app/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const initialState: { error?: string; success?: boolean; message?: string } = {}

export function WaitlistForm() {
  const [state, formAction, pending] = useActionState(joinWaitlist, initialState)

  if (state?.success) {
    return (
      <div className="flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-5 py-3.5">
        <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500">
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path d="M1 4l2.5 2.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p className="text-sm text-emerald-400">{state.message || "Perfecto estás apuntado al proyecto! cuando este en directo te avisamos!"}</p>
      </div>
    )
  }

  return (
    <form action={formAction} className="flex w-full max-w-md flex-col gap-2 sm:flex-row">
      <Input
        name="email"
        type="email"
        placeholder="your@email.com"
        required
        className="h-11 flex-1 border-white/10 bg-white/5 text-white placeholder:text-slate-500 focus-visible:ring-indigo-500 focus-visible:border-indigo-500/50"
      />
      <Button
        type="submit"
        disabled={pending}
        className="h-11 bg-indigo-500 hover:bg-indigo-400 text-white font-medium px-6 shrink-0"
      >
        {pending ? "Joining..." : "Get early access"}
      </Button>
      {state?.error && (
        <p className="w-full text-xs text-red-400">{state.error}</p>
      )}
    </form>
  )
}

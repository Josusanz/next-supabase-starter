"use client"

import React, { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import Hls from "hls.js"
import { Database, CreditCard, Mail } from "lucide-react"
import { WaitlistForm } from "@/components/waitlist-form"
import Link from "next/link"

// --- Memoized Video Player ---
const VideoPlayer = React.memo(function VideoPlayer({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    let hls: Hls | undefined
    if (videoRef.current) {
      if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
        videoRef.current.src = src
      } else if (Hls.isSupported()) {
        hls = new Hls()
        hls.loadSource(src)
        hls.attachMedia(videoRef.current)
      }
    }
    return () => {
      if (hls) hls.destroy()
    }
  }, [src])

  return (
    <div className="absolute bottom-[35vh] left-0 w-full h-[80vh] z-0 overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover opacity-40"
      />
      {/* Gradient overlay so text stays readable */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
    </div>
  )
})

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
}

const integrations = [
  { name: "Supabase", icon: <Database size={14} /> },
  { name: "Stripe", icon: <CreditCard size={14} /> },
  { name: "Resend", icon: <Mail size={14} /> },
]

const logos = ["Vercel", "Supabase", "Stripe", "Next.js", "shadcn", "Resend"]

export function Hero() {
  return (
    <section className="relative min-h-screen bg-black text-white selection:bg-white/30 overflow-x-hidden flex flex-col">
      {/* Video background */}
      <VideoPlayer src="https://stream.mux.com/9JXDljEVWYwWu01PUkAemafDugK89o01BR6zqJ3aS9u00A.m3u8" />

      {/* Hero content */}
      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-1 flex-col items-center text-center px-6 pt-44 pb-32"
      >
        {/* Integration badges */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-3 mb-8"
        >
          {integrations.map((item) => (
            <div
              key={item.name}
              className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl text-[13px] text-zinc-300"
            >
              <span className="opacity-60">Integrated with</span>
              <span className="opacity-70">{item.icon}</span>
              <span className="font-medium text-white">{item.name}</span>
            </div>
          ))}
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={itemVariants}
          className="text-6xl md:text-[80px] font-medium tracking-tighter leading-[1.05] max-w-4xl mb-6"
        >
          Ship your SaaS. <br />
          <span className="text-zinc-400">Not your boilerplate.</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-zinc-400 max-w-2xl font-light mb-10"
        >
          Production-ready Next.js starter with auth, payments, and emails
          pre-configured. Skip the setup and ship what actually matters —{" "}
          <span className="text-white font-normal">your product</span>.
        </motion.p>

        {/* Waitlist form */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center gap-3 w-full max-w-md"
        >
          <WaitlistForm />
          <p className="text-xs text-zinc-600">
            No spam. Unsubscribe anytime.{" "}
            <Link
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 hover:text-white transition-colors underline underline-offset-2"
            >
              View on GitHub →
            </Link>
          </p>
        </motion.div>
      </motion.main>

      {/* Logo marquee */}
      <div className="relative z-10 w-full px-6 pb-12">
        <div className="max-w-7xl mx-auto border-t border-white/5 pt-10">
          <p className="text-center text-xs text-zinc-600 uppercase tracking-widest mb-6">
            Built with the best tools in 2026
          </p>
          <div className="flex justify-between items-center opacity-30 gap-8 overflow-hidden px-4">
            {logos.map((logo) => (
              <span
                key={logo}
                className="text-sm font-bold tracking-widest whitespace-nowrap"
              >
                {logo}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

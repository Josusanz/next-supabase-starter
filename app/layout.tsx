import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] })
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] })

export const metadata: Metadata = {
  title: "next-supabase-starter — Ship your SaaS faster",
  description:
    "Production-ready Next.js starter with Supabase, Stripe, Resend and shadcn/ui. Open source. Free forever.",
  openGraph: {
    title: "next-supabase-starter — Ship your SaaS faster",
    description:
      "Production-ready Next.js starter with Supabase, Stripe, Resend and shadcn/ui. Open source. Free forever.",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}

import Link from "next/link"
import ParticleBackground from "@/components/ParticleBackground"
import { Card } from "@/components/ui/Card"

export default function Home() {
  return (
    <main className="relative overflow-hidden px-6 py-12">
      <ParticleBackground />
      <section className="relative z-10 mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <p className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-1 text-xs uppercase tracking-[0.3em] text-cyan-200">
            KIIT anonymous communication
          </p>
          <h1 className="max-w-3xl text-5xl font-semibold tracking-tight md:text-7xl">
            Speak softly. <span className="text-cyan-300">Echo</span> the truth.
          </h1>
          <p className="max-w-2xl text-base leading-7 text-white/75 md:text-lg">
            A polished campus feed with private threads, live reactions, AI moderation, mood pulse, and a hidden game tucked under the floorboards.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-2xl bg-white px-4 py-2 text-sm font-medium text-slate-900 transition hover:bg-slate-100 shadow-glow"
            >
              Enter Echo
            </Link>
            <Link
              href="/demo"
              className="inline-flex items-center justify-center rounded-2xl bg-slate-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
            >
              See Demo
            </Link>
          </div>
        </div>

        <Card className="space-y-4">
          <h2 className="text-xl font-semibold">What is inside</h2>
          <ul className="space-y-3 text-sm text-white/75">
            <li>• OTP login for KIIT email</li>
            <li>• Threads, messages, reports, reactions</li>
            <li>• Socket.io realtime layer</li>
            <li>• AI moderation and mood analysis</li>
            <li>• Pulse globe and hidden game route</li>
          </ul>
        </Card>
      </section>
    </main>
  )
}

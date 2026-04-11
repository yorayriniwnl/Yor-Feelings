import { Card } from "@/components/ui/Card"
import { Sidebar } from "@/components/ui/Sidebar"
import { TherapyCard } from "@/components/TherapyCard"
import Link from "next/link"

export default function DemoPage() {
  return (
    <main className="mx-auto grid max-w-6xl gap-6 px-6 py-8 lg:grid-cols-[240px_1fr]">
      <Sidebar />
      <section className="space-y-6">
        <Card>
          <h1 className="text-3xl font-semibold">Demo Route</h1>
          <p className="mt-2 text-white/70">A guided preview of the Echo experience.</p>
          <div className="mt-4 flex gap-3">
            <Link
              href="/threads"
              className="inline-flex items-center justify-center rounded-2xl bg-white px-4 py-2 text-sm font-medium text-slate-900 transition hover:bg-slate-100 shadow-glow"
            >
              Open Threads
            </Link>
            <Link
              href="/pulse"
              className="inline-flex items-center justify-center rounded-2xl bg-slate-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
            >
              Open Pulse
            </Link>
          </div>
        </Card>
        <div className="grid gap-4 md:grid-cols-2">
          <TherapyCard title="Support layer" suggestion="Gentle nudges help the feed stay human." />
          <TherapyCard title="Moderation" suggestion="Content is checked before it hits the room." />
        </div>
      </section>
    </main>
  )
}

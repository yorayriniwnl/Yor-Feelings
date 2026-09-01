import Link from "next/link"
import ParticleBackground from "@/components/ParticleBackground"
import { Card } from "@/components/ui/Card"

export default function Home() {
  return (
    <main className="yor-home">
      <ParticleBackground />
      <section className="yor-home-grid">
        <div>
          <p className="yor-label">YOR // private campus signal</p>
          <h1>
            Speak softly.<br /><span>Make room</span> for the truth.
          </h1>
          <p className="yor-lede">
            A campus conversation surface with private threads, live reactions, moderation boundaries, and a pulse view for the room around you.
          </p>
          <div className="yor-actions">
            <Link
              href="/login"
              className="yor-button inline-flex items-center justify-center bg-[#e84b4b] px-4 py-2 text-sm font-medium text-black"
            >
              Enter the room
            </Link>
            <Link
              href="/demo"
              className="yor-button inline-flex items-center justify-center bg-transparent px-4 py-2 text-sm font-medium text-[#f5eaea]"
            >
              Inspect demo
            </Link>
          </div>
        </div>

        <Card className="yor-home-panel">
          <p className="yor-label">Surface map / declared</p>
          <h2 className="mt-3 text-2xl font-medium text-[#f5eaea]">What is inside</h2>
          <ul>
            <li>OTP access for the campus domain</li>
            <li>Threads, messages, reports, and reactions</li>
            <li>Socket.io realtime layer</li>
            <li>AI moderation and mood analysis</li>
            <li>Pulse globe and a hidden game route</li>
          </ul>
        </Card>
      </section>
    </main>
  )
}

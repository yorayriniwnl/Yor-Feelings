"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/Card"
import MoodGlobe from "@/components/MoodGlobe"
import { MoodShareCard } from "@/components/MoodShareCard"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { aggregateMood } from "@/lib/ai/moodAggregator"

export default function PulsePage() {
  const [points, setPoints] = useState([{ name: "Mon", score: 0.2 }, { name: "Tue", score: 0.3 }, { name: "Wed", score: -0.1 }, { name: "Thu", score: 0.4 }, { name: "Fri", score: 0.55 }])

  useEffect(() => {
    fetch("/api/user/profile").catch(() => {})
  }, [])

  const mood = aggregateMood(points)
  return (
    <main className="mx-auto max-w-6xl space-y-6 px-6 py-8">
      <div className="grid gap-6 lg:grid-cols-[1fr_420px]">
        <Card className="space-y-4">
          <h1 className="text-3xl font-semibold">Campus Pulse</h1>
          <p className="text-white/70">A live sentiment lens over the conversation stream.</p>
          <div className="h-[320px] rounded-3xl border border-white/10 bg-black/20 p-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={points}>
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Line type="monotone" dataKey="score" stroke="#22d3ee" strokeWidth={2} dot />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <div className="space-y-4">
          <MoodGlobe />
          <MoodShareCard title="Today's mood" mood={`${mood.label} · average ${mood.average}`} />
        </div>
      </div>
    </main>
  )
}

"use client"

import html2canvas from "html2canvas"
import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"
import { useRef } from "react"
import { toast } from "sonner"

export function MoodShareCard({ title, mood }: { title: string; mood: string }) {
  const ref = useRef<HTMLDivElement>(null)

  const share = async () => {
    if (!ref.current) return
    const canvas = await html2canvas(ref.current)
    const link = document.createElement("a")
    link.href = canvas.toDataURL("image/png")
    link.download = "echo-mood.png"
    link.click()
    toast.success("Mood card exported.")
  }

  return (
    <div className="space-y-3">
      <Card ref={ref as any} className="bg-gradient-to-br from-indigo-500/20 via-cyan-500/10 to-fuchsia-500/20">
        <h4 className="text-lg font-semibold text-white">{title}</h4>
        <p className="mt-2 text-sm text-white/80">{mood}</p>
      </Card>
      <Button onClick={share}>Share Mood Card</Button>
    </div>
  )
}

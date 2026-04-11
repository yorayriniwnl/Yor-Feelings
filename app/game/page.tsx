"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"

export default function GamePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [score, setScore] = useState(0)
  const [running, setRunning] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !running) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let raf = 0
    let x = 100, y = 100, vx = 2.4, vy = 2
    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = "#0f172a"
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = "#22d3ee"
      ctx.beginPath()
      ctx.arc(x, y, 14, 0, Math.PI * 2)
      ctx.fill()
      x += vx
      y += vy
      if (x < 14 || x > canvas.width - 14) vx *= -1
      if (y < 14 || y > canvas.height - 14) vy *= -1
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [running])

  return (
    <main className="mx-auto max-w-4xl space-y-4 px-6 py-8">
      <Card>
        <h1 className="text-3xl font-semibold">Hidden Game</h1>
        <p className="mt-2 text-white/70">Konami unlocked. A little arcade pocket under the campus floorboards.</p>
        <div className="mt-4 flex gap-3">
          <Button onClick={() => setRunning((v) => !v)}>{running ? "Pause" : "Play"}</Button>
          <Button variant="secondary" onClick={() => setScore((s) => s + 1)}>Add Score: {score}</Button>
        </div>
      </Card>
      <canvas ref={canvasRef} width={960} height={420} className="w-full rounded-3xl border border-white/10" />
    </main>
  )
}

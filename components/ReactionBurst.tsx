"use client"

import { useEffect, useState } from "react"

export function ReactionBurst({ trigger, emoji = "✨" }: { trigger?: number; emoji?: string }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!trigger) return
    setVisible(true)
    const timer = setTimeout(() => setVisible(false), 700)
    return () => clearTimeout(timer)
  }, [trigger])

  return visible ? <div className="pointer-events-none absolute right-4 top-4 text-3xl">{emoji}</div> : null
}

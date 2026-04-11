"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export function KonamiListener() {
  const router = useRouter()

  useEffect(() => {
    const code = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"]
    let idx = 0

    const onKeyDown = (event: KeyboardEvent) => {
      const key = event.key.length === 1 ? event.key.toLowerCase() : event.key
      if (key === code[idx]) {
        idx += 1
        if (idx === code.length) {
          router.push("/game")
          idx = 0
        }
      } else {
        idx = 0
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [router])

  return null
}

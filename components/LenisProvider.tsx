"use client"

import { useEffect, type ReactNode } from "react"

export function LenisProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    let raf = 0
    let lenis: any

    ;(async () => {
      const mod = await import("lenis")
      lenis = new mod.default({ smoothWheel: true, duration: 1.1 })
      const loop = (time: number) => {
        lenis.raf(time)
        raf = requestAnimationFrame(loop)
      }
      raf = requestAnimationFrame(loop)
    })()

    return () => {
      if (raf) cancelAnimationFrame(raf)
      if (lenis) lenis.destroy?.()
    }
  }, [])

  return <>{children}</>
}

"use client"

import { ReactNode } from "react"
import { KonamiListener } from "@/components/KonamiListener"

export function ClientShell({ children }: { children: ReactNode }) {
  return (
    <>
      <KonamiListener />
      {children}
    </>
  )
}

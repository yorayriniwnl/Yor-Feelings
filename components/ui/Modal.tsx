"use client"

import { ReactNode } from "react"
import { Card } from "./Card"

export function Modal({ open, children }: { open: boolean; children: ReactNode }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4">
      <Card className="w-full max-w-xl">{children}</Card>
    </div>
  )
}

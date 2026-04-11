"use client"

import Link from "next/link"
import { Card } from "./Card"

const nav = [
  { href: "/", label: "Home" },
  { href: "/threads", label: "Threads" },
  { href: "/pulse", label: "Pulse" },
  { href: "/demo", label: "Demo" },
  { href: "/game", label: "Game" }
]

export function Sidebar() {
  return (
    <Card className="sticky top-4 flex h-fit flex-col gap-2">
      {nav.map((item) => (
        <Link key={item.href} href={item.href} className="rounded-2xl px-3 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white">
          {item.label}
        </Link>
      ))}
    </Card>
  )
}

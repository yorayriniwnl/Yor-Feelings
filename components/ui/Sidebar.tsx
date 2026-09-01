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
        <Link key={item.href} href={item.href} className="border-l-2 border-[#671515] px-3 py-2 text-sm text-white/70 hover:border-[#ff8a7f] hover:bg-[#671515]/30 hover:text-[#f5eaea]">
          {item.label}
        </Link>
      ))}
    </Card>
  )
}

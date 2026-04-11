"use client"

import dynamic from "next/dynamic"
import { cn } from "@/components/ui/utils"

const Avatar3D = dynamic(() => import("@/components/Avatar3D"), { ssr: false })

export function Avatar({ name = "E", className }: { name?: string; className?: string }) {
  return (
    <div className={cn("relative grid h-12 w-12 place-items-center overflow-hidden rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-lg font-semibold text-white", className)}>
      <Avatar3D />
      <span className="relative z-10">{name[0]?.toUpperCase()}</span>
    </div>
  )
}

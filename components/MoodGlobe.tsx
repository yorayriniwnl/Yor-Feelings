"use client"

import dynamic from "next/dynamic"

const MoodGlobeClient = dynamic(() => import("@/components/MoodGlobeClient"), { ssr: false })

export default function MoodGlobe() {
  return <MoodGlobeClient />
}

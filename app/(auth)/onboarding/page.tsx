"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { toast } from "sonner"

export default function OnboardingPage() {
  const [anonymousHandle, setAnonymousHandle] = useState("")
  const [bio, setBio] = useState("")
  const router = useRouter()

  const save = async () => {
    const res = await fetch("/api/user/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ anonymousHandle, bio })
    })
    if (!res.ok) {
      toast.error("Could not save profile.")
      return
    }
    toast.success("Profile saved.")
    router.push("/threads")
  }

  return (
    <div className="mx-auto flex min-h-[calc(100vh-80px)] max-w-md items-center px-6">
      <div className="w-full space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6">
        <h1 className="text-3xl font-semibold">Onboarding</h1>
        <Input placeholder="Anonymous handle" value={anonymousHandle} onChange={(e) => setAnonymousHandle(e.target.value)} />
        <Input placeholder="Short bio" value={bio} onChange={(e) => setBio(e.target.value)} />
        <Button onClick={save}>Continue</Button>
      </div>
    </div>
  )
}

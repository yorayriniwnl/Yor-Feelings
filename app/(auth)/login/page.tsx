"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { toast } from "sonner"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [devOtp, setDevOtp] = useState("")
  const [step, setStep] = useState<"request" | "verify">("request")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const requestOtp = async () => {
    setLoading(true)
    const res = await fetch("/api/auth/request-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    })
    setLoading(false)
    const data = await res.json()
    if (!res.ok) {
      toast.error(data.error || "Unable to send OTP.")
      return
    }
    if (data.emailSent) {
      toast.success(data.message || "OTP sent.")
    } else {
      toast.success(data.message || "OTP generated.")
    }
    if (data.devOtp) {
      setDevOtp(data.devOtp)
      setOtp(data.devOtp)
      toast.info(`Dev OTP: ${data.devOtp}`)
    } else {
      setDevOtp("")
    }
    setStep("verify")
  }

  const verify = async () => {
    setLoading(true)
    const result = await signIn("credentials", {
      email,
      otp,
      redirect: false
    })
    setLoading(false)
    if (result?.error) {
      toast.error("OTP did not match.")
      return
    }
    toast.success("Signed in.")
    router.push("/onboarding")
  }

  return (
    <div className="mx-auto flex min-h-[calc(100vh-80px)] max-w-md items-center px-6">
      <div className="w-full space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
        <h1 className="text-3xl font-semibold">Login</h1>
        <p className="text-sm text-white/70">Use your KIIT email and the OTP on the way in.</p>
        <Input placeholder="name@kiit.ac.in" value={email} onChange={(e) => setEmail(e.target.value)} />
        {step === "verify" && (
          <Input placeholder="6-digit OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
        )}
        {step === "verify" && devOtp && (
          <p className="rounded-2xl border border-cyan-300/30 bg-cyan-400/10 px-3 py-2 text-sm text-cyan-100">
            Dev mode OTP: <span className="font-semibold tracking-widest">{devOtp}</span>
          </p>
        )}
        <div className="flex gap-2">
          {step === "request" ? (
            <Button onClick={requestOtp} disabled={loading}>Send OTP</Button>
          ) : (
            <Button onClick={verify} disabled={loading}>Verify & Continue</Button>
          )}
        </div>
      </div>
    </div>
  )
}

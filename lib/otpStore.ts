import { prisma } from "@/lib/db"

type OtpRecord = { code: string; expiresAt: number; email: string }

export async function createOtp(email: string, ttlMinutes = 10) {
  const code = String(Math.floor(100000 + Math.random() * 900000))
  const expiresAt = Date.now() + ttlMinutes * 60_000
  const normalizedEmail = email.toLowerCase()

  await prisma.otpCode.upsert({
    where: { email: normalizedEmail },
    update: {
      code,
      expiresAt: new Date(expiresAt)
    },
    create: {
      email: normalizedEmail,
      code,
      expiresAt: new Date(expiresAt)
    }
  })

  return code
}

export async function verifyOtp(email: string, code: string) {
  const normalizedEmail = email.toLowerCase()
  const record = await prisma.otpCode.findUnique({ where: { email: normalizedEmail } })
  if (!record) return false

  if (Date.now() > record.expiresAt.getTime()) {
    await prisma.otpCode.delete({ where: { email: normalizedEmail } }).catch(() => null)
    return false
  }

  return record.code === code
}

export async function consumeOtp(email: string, code: string) {
  const normalizedEmail = email.toLowerCase()
  const ok = await verifyOtp(normalizedEmail, code)
  if (ok) await prisma.otpCode.delete({ where: { email: normalizedEmail } }).catch(() => null)
  return ok
}

export async function getOtp(email: string): Promise<OtpRecord | null> {
  const normalizedEmail = email.toLowerCase()
  const record = await prisma.otpCode.findUnique({ where: { email: normalizedEmail } })
  if (!record) return null

  return {
    email: record.email,
    code: record.code,
    expiresAt: record.expiresAt.getTime()
  }
}

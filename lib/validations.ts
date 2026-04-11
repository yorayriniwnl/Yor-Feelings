import { z } from "zod"

export const kiitEmailSchema = z.string().email().refine((email) => {
  const domain = process.env.KIIT_DOMAIN || "kiit.ac.in"
  return email.toLowerCase().endsWith(`@${domain}`)
}, "Only KIIT email addresses are allowed")

export const otpSchema = z.object({
  email: kiitEmailSchema,
  otp: z.string().regex(/^\d{6}$/)
})

export const threadSchema = z.object({
  title: z.string().min(3).max(80)
})

export const messageSchema = z.object({
  threadId: z.string().min(1),
  content: z.string().min(1).max(1000)
})

export const reportSchema = z.object({
  reason: z.string().min(3).max(300)
})

export const reactionSchema = z.object({
  type: z.enum(["like", "love", "clap", "fire", "sad", "support"])
})

export const profileSchema = z.object({
  anonymousHandle: z.string().min(3).max(24).optional(),
  bio: z.string().max(160).optional()
})

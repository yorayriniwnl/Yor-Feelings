import { NextResponse } from "next/server"
import { createOtp } from "@/lib/otpStore"
import { kiitEmailSchema } from "@/lib/validations"
import { Resend } from "resend"
import nodemailer from "nodemailer"

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}))
  const parsed = kiitEmailSchema.safeParse(body?.email)
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid KIIT email." }, { status: 400 })
  }

  const ttl = Number(process.env.OTP_TTL_MINUTES || 10)
  const otp = await createOtp(parsed.data, ttl)
  const isDev = process.env.NODE_ENV === "development"

  const apiKey = process.env.RESEND_API_KEY
  const resendFrom = process.env.RESEND_FROM

  const smtpHost = process.env.SMTP_HOST
  const smtpPort = Number(process.env.SMTP_PORT || 587)
  const smtpSecure = process.env.SMTP_SECURE === "true"
  const smtpUser = process.env.SMTP_USER
  const smtpPass = process.env.SMTP_PASS
  const smtpFrom = process.env.SMTP_FROM
  let emailSent = false

  if (apiKey && resendFrom) {
    try {
      const resend = new Resend(apiKey)
      const result = await resend.emails.send({
        from: resendFrom,
        to: parsed.data,
        subject: "Your Echo OTP",
        html: `<div style="font-family:sans-serif"><p>Your Echo OTP is <b>${otp}</b>.</p><p>It expires in ${ttl} minutes.</p></div>`
      })

      if (result?.error) {
        return NextResponse.json({ error: result.error.message || "Failed to send OTP email." }, { status: 502 })
      }

      emailSent = true
    } catch {
      emailSent = false
    }
  }

  if (!emailSent && smtpHost && smtpUser && smtpPass && smtpFrom) {
    try {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpSecure,
        auth: {
          user: smtpUser,
          pass: smtpPass
        }
      })

      await transporter.sendMail({
        from: smtpFrom,
        to: parsed.data,
        subject: "Your Echo OTP",
        html: `<div style="font-family:sans-serif"><p>Your Echo OTP is <b>${otp}</b>.</p><p>It expires in ${ttl} minutes.</p></div>`
      })

      emailSent = true
    } catch {
      return NextResponse.json({ error: "Unable to send OTP email with SMTP." }, { status: 502 })
    }
  }

  if (!emailSent && !isDev) {
    return NextResponse.json({ error: "OTP email service is not configured." }, { status: 503 })
  }

  return NextResponse.json({
    message: emailSent ? "OTP sent to your email." : "OTP generated in development mode.",
    emailSent,
    devOtp: isDev ? otp : undefined
  })
}

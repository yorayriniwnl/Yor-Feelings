import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "@/lib/db"
import { consumeOtp } from "@/lib/otpStore"
import { otpSchema } from "@/lib/validations"

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "KIIT OTP",
      credentials: {
        email: { label: "Email", type: "email" },
        otp: { label: "OTP", type: "text" }
      },
      async authorize(credentials) {
        const parsed = otpSchema.safeParse(credentials)
        if (!parsed.success) return null

        const { email, otp } = parsed.data
        const ok = await consumeOtp(email, otp)
        if (!ok) return null

        const existing = await prisma.user.upsert({
          where: { email },
          update: {},
          create: { email, name: email.split("@")[0] }
        })

        return {
          id: existing.id,
          email: existing.email,
          name: existing.name || existing.email.split("@")[0]
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.email = token.email as string
        session.user.name = token.name as string
      }
      return session
    }
  },
  pages: {
    signIn: "/login"
  },
  secret: process.env.NEXTAUTH_SECRET
}

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      email: string
      name?: string | null
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string
    email?: string | null
    name?: string | null
  }
}

import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { profileSchema } from "@/lib/validations"

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      threads: true,
      messages: true,
      moods: true,
      reactions: true
    }
  })

  return NextResponse.json({ user })
}

export async function PATCH(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await request.json().catch(() => ({}))
  const parsed = profileSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: "Invalid profile payload" }, { status: 400 })

  const user = await prisma.user.upsert({
    where: { email: session.user.email },
    update: {
      anonymousHandle: parsed.data.anonymousHandle,
      bio: parsed.data.bio
    },
    create: {
      email: session.user.email,
      name: session.user.name || session.user.email.split("@")[0],
      anonymousHandle: parsed.data.anonymousHandle,
      bio: parsed.data.bio
    }
  })

  return NextResponse.json({ user })
}

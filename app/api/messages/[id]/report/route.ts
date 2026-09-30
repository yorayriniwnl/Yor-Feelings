import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { reportSchema } from "@/lib/validations"

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await request.json().catch(() => ({}))
  const parsed = reportSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: "Invalid report reason" }, { status: 400 })

  const user = await prisma.user.upsert({
    where: { email: session.user.email },
    update: {},
    create: { email: session.user.email, name: session.user.name || session.user.email.split("@")[0] }
  })

  const report = await prisma.report.create({
    data: { messageId: id, reporterId: user.id, reason: parsed.data.reason }
  })

  return NextResponse.json({ report }, { status: 201 })
}
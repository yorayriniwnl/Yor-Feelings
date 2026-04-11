import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { reactionSchema } from "@/lib/validations"

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await request.json().catch(() => ({}))
  const parsed = reactionSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: "Invalid reaction" }, { status: 400 })

  const user = await prisma.user.upsert({
    where: { email: session.user.email },
    update: {},
    create: { email: session.user.email, name: session.user.name || session.user.email.split("@")[0] }
  })

  const reaction = await prisma.reaction.create({
    data: { messageId: params.id, userId: user.id, type: parsed.data.type }
  })

  return NextResponse.json({ reaction }, { status: 201 })
}

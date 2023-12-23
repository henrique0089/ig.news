import { prisma } from '@/lib/prisma'
import { auth } from '@clerk/nextjs'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { sessionId } = auth()

  if (!sessionId) {
    return NextResponse.json(
      { message: 'Unauthorized action!' },
      { status: 401 },
    )
  }

  const body = await req.json()
  const { userId, postId } = body
  console.log({ userId, postId })

  if (!userId || !postId) {
    return NextResponse.json(
      { message: 'user id and post id must be provided!' },
      { status: 401 },
    )
  }

  await prisma.like.create({
    data: {
      user_id: userId,
      post_id: postId,
    },
  })

  const like = {
    userId,
    postId,
  }

  return NextResponse.json({ like })
}

export async function DELETE(req: NextRequest) {
  const { sessionId } = auth()

  if (!sessionId) {
    return NextResponse.json(
      { message: 'Unauthorized action!' },
      { status: 401 },
    )
  }

  const { searchParams } = new URL(req.url)

  const userId = searchParams.get('userId')
  const postId = searchParams.get('postId')

  if (!userId || !postId) {
    return NextResponse.json(
      { message: 'user id and post id must be provided!' },
      { status: 401 },
    )
  }

  await prisma.like.delete({
    where: {
      user_id: userId,
      post_id: postId,
    },
  })

  return NextResponse.json({ ok: true })
}

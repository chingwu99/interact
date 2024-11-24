import { NextResponse } from 'next/server'

import getCurrentUser from '@/app/actions/getCurrentUser'
import prisma from '@/libs/prismadb'

export async function POST(request: Request) {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return NextResponse.error()
  }

  const body = await request.json()

  const { userId } = body

  if (!userId || typeof userId !== 'string') {
    throw new Error('Invalid ID')
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  })

  if (!user) {
    throw new Error('Invalid ID')
  }

  let updatedFollowingIds = [...(user.followingIds || [])]

  updatedFollowingIds.push(userId)
  // NOTIFICATION PART START
  try {
    await prisma.notification.create({
      data: {
        body: 'Someone followed you!',
        userId,
      },
    })

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hasNotification: true,
      },
    })
  } catch (error) {
    console.log(error)
  }
  // NOTIFICATION PART END

  const updatedUser = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      followingIds: updatedFollowingIds,
    },
  })

  return NextResponse.json(updatedUser)
}

export async function DELETE(request: Request) {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return NextResponse.error()
  }

  const body = await request.json()

  const { userId } = body

  if (!userId || typeof userId !== 'string') {
    throw new Error('Invalid ID')
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  })

  if (!user) {
    throw new Error('Invalid ID')
  }

  let updatedFollowingIds = [...(user.followingIds || [])]

  updatedFollowingIds = updatedFollowingIds.filter((followingId) => followingId !== userId)

  const updatedUser = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      followingIds: updatedFollowingIds,
    },
  })

  return NextResponse.json(updatedUser)
}

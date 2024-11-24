import { NextResponse } from 'next/server'

import getCurrentUser from '@/app/actions/getCurrentUser'
import prisma from '@/libs/prismadb'

export async function PATCH(request: Request) {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return NextResponse.error()
  }

  const body = await request.json()

  const { name, username, bio, profileImage, coverImage } = body

  if (!name || !username) {
    throw new Error('Missing fields')
  }

  const updatedUser = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      name,
      username,
      bio,
      profileImage,
      coverImage,
    },
  })

  return NextResponse.json(updatedUser)
}

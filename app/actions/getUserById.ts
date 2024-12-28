import prisma from '@/libs/prismadb'

interface IParams {
  userId?: string
}

export default async function getUserById(params: IParams) {
  try {
    const { userId } = params

    const existingUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    })

    if (!existingUser) {
      return null
    }

    const followersCount = await prisma.user.count({
      where: {
        followingIds: {
          has: userId,
        },
      },
    })

    return {
      ...existingUser,
      followersCount,
    }
  } catch (error: any) {
    throw new Error(error)
  }
}

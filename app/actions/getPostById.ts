import prisma from '@/libs/prismadb'

export interface IParams {
  postId: string
}

export default async function getPostById(params: IParams) {
  try {
    const { postId } = params

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        user: true,
        comments: {
          include: {
            user: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    })

    return {
      ...post,
    }
  } catch (error: any) {
    throw new Error(error)
  }
}

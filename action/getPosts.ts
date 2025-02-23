import type { Post } from '@/type/post'
import { serverApiFetch } from '@/api/server/serverApiFetch'

interface GetPostsParams {
  userId?: string
}

export const getPosts = async ({ userId }: GetPostsParams): Promise<Post[]> => {
  try {
    const path = userId ? `/posts?userId=${userId}` : '/posts'

    return await serverApiFetch<Post[]>(path, {
      cache: 'no-store',
    })
  } catch (error) {
    throw new Error('Failed to getPosts')
  }
}

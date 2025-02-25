import type { Post } from '@/type/post'
import { serverApiFetch } from '@/api/server/serverApiFetch'

interface GetPostParams {
  postId?: string
}

export const getPost = async ({ postId }: GetPostParams): Promise<Post> => {
  try {
    return await serverApiFetch<Post>(`/posts/${postId}`, {
      cache: 'no-store',
    })
  } catch (error) {
    throw new Error('Failed to getPosts')
  }
}

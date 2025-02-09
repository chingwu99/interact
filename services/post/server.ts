import { getSsrData } from '../serverApi'

import type { Post } from './type'

export const postServerService = {
  // Get all posts
  getPosts: async (userId: string | undefined) => {
    const data = (await getSsrData(userId ? `/posts?userId=${userId}` : '/posts')) as Post[]
    return data
  },
  // Get single post by id (SSR version)
  getPost: async (postId: string) => {
    const data = (await getSsrData(`/posts/${postId}`)) as Post
    return data
  },
}

import api from '../clientApi'

import type { Post, CreatePostData } from './type'

export const postClientService = {
  // Get all posts
  getPosts: async (userId?: string) => {
    const response = await api.get<Post[]>(userId ? `/posts?userId=${userId}` : '/posts')
    return response.data
  },

  // Get single post by id
  getPost: async (postId: string) => {
    const response = await api.get<Post>(`/posts/${postId}`)
    return response.data
  },

  // Create new post
  createPost: async (data: CreatePostData) => {
    const response = await api.post<Post>('/posts/create', data)
    return response.data
  },
}

import api from '../clientApi'

import type { Post, CreatePostData } from './type'

export const postClientService = {
  // Create new post
  createPost: async (data: CreatePostData) => {
    const response = await api.post<Post>('/posts/create', data)
    return response.data
  },
}

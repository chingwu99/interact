import api from '../clientApi'

import type { CommentResponse, CreateCommentData } from './type'

export const commentClientService = {
  // Create comment
  createComment: async (data: CreateCommentData) => {
    const response = await api.post<CommentResponse>('/comments', data)
    return response.data.comment
  },
}

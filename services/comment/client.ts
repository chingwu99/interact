import api from '../../api/client'
import type { CommentResponse, CreateCommentData } from '../../type/comment'

export const commentClientService = {
  // Create comment
  createComment: async (data: CreateCommentData) => {
    const response = await api.post<CommentResponse>('/comments', data)
    return response.data.comment
  },
}

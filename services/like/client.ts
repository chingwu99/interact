import api from '../../api/client'
import type { LikeResponse, LikePostData } from '../../type/like'

export const likeClientService = {
  // Like a post
  likePost: async (data: LikePostData) => {
    const response = await api.post<LikeResponse>('/likes/add', data)
    return response.data.post
  },

  // Unlike a post
  unlikePost: async (data: LikePostData) => {
    const response = await api.delete<LikeResponse>(`/likes/remove`, { data })
    return response.data.post
  },
}

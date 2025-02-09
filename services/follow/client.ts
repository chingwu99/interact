import api from '../clientApi'

import type { FollowResponse, FollowUserData } from './type'

export const followClientService = {
  // Follow user
  followUser: async (data: FollowUserData) => {
    const response = await api.post<FollowResponse>('/follows/add', data)
    return response.data.user
  },

  // Unfollow user
  unfollowUser: async (data: FollowUserData) => {
    const response = await api.delete<FollowResponse>('/follows/remove', { data })
    return response.data.user
  },
}

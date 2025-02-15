import api from '../clientApi'

import type { User, UpdateUserData, Notification } from './type'

export const userClientService = {
  // Get current user's notifications
  getNotifications: async (userId: string) => {
    const response = await api.get<Notification[]>(`/users/${userId}/notifications`)
    return response.data
  },

  // Update user profile
  updateUser: async (data: UpdateUserData) => {
    const response = await api.patch<User>('/users/update', data)
    return response.data
  },
}

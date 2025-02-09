import api from '../clientApi'

import type { User, UpdateUserData, Notification, UserWithFollowersCount } from './type'

export const userClientService = {
  // Get all users
  getUsers: async () => {
    const response = await api.get<User[]>('/users')
    return response.data
  },

  // Get user by id
  getUser: async (userId: string) => {
    const response = await api.get<UserWithFollowersCount>(`/users/${userId}`)
    return response.data
  },

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

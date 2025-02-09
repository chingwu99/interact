import { getSsrData } from '../serverApi'

import type { UserWithFollowersCount, User } from './type'

export const userServerService = {
  // // Get all users
  getUsers: async () => {
    const data = (await getSsrData(`/users`)) as User[]
    return data
  },

  // Get user by id
  getUser: async (userId: string) => {
    const data = (await getSsrData(`/users/${userId}`)) as UserWithFollowersCount
    return data
  },

  // // Get current user's notifications
  // getNotifications: async (userId: string) => {
  //   const response = await api.get<Notification[]>(`/users/${userId}/notifications`)
  //   return response.data
  // },

  // // Update user profile
  // updateUser: async (data: UpdateUserData) => {
  //   const response = await api.patch<User>('/users', data)
  //   return response.data
  // },
}

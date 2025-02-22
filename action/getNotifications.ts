import type { Notification } from '@/type/user'
import { serverApiFetch } from '@/api/server/serverApiFetch'

interface GetNotificationsParams {
  userId: string | undefined
}

export const getNotifications = async ({ userId }: GetNotificationsParams): Promise<Notification[]> => {
  try {
    return await serverApiFetch<Notification[]>(`/users/${userId}/notifications`, {
      requireAuth: true,
      cache: 'no-store',
    })
  } catch (error) {
    throw new Error('Failed to getNotifications')
  }
}

'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

import { useAuth } from '@/hooks/useAuth'
import { userClientService } from '@/services/user/client'
import type { Notification } from '@/services/user/type'

const NotificationsFeed: React.FC = () => {
  const { user: currentUser } = useAuth()
  const [fetchedNotifications, setFetchedNotifications] = useState<Notification[]>([])

  useEffect(() => {
    const fetchNotifications = async () => {
      if (currentUser) {
        try {
          const notifications = await userClientService.getNotifications(currentUser.id)
          setFetchedNotifications(notifications)
        } catch (error) {
          console.error('Failed to fetch notifications:', error)
        }
      }
    }

    fetchNotifications()
  }, [currentUser])

  if (fetchedNotifications.length === 0) {
    return <div className="text-neutral-600 text-center p-6 text-xl">No notifications</div>
  }

  return (
    <div className="flex flex-col">
      {fetchedNotifications.map((notification) => (
        <div key={notification.id} className="flex flex-row items-center p-6 gap-4 border-b-[1px] border-neutral-800">
          <Image alt="Logo" src="/images/components/layout/logo.svg" quality={100} height={50} width={50} />
          <p className="text-white">{notification.body}</p>
        </div>
      ))}
    </div>
  )
}

export default NotificationsFeed

import { redirect } from 'next/navigation'
// @ts-ignore
import { Notification } from '@prisma/client'

import Header from '@/components/Header'
import NotificationsFeed from '@/components/NotificationsFeed'

import getCurrentUser from '../actions/getCurrentUser'
import getNotificationsByUserId from '../actions/getNotificationsByUserId'

const Notifications = async () => {
  const currentUser = await getCurrentUser()

  let fetchedNotifications: Notification[] = []

  if (!currentUser) {
    return redirect('/')
  }

  if (currentUser) {
    fetchedNotifications = await getNotificationsByUserId({
      userId: currentUser?.id,
    })
  }

  return (
    <>
      <Header showBackArrow label="Notifications" />
      <NotificationsFeed fetchedNotifications={fetchedNotifications} />
    </>
  )
}

export default Notifications

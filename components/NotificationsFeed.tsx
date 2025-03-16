import Image from 'next/image'

import { getServerSession } from '@/action/getServerSession'
import { getNotifications } from '@/action/getNotifications'

const NotificationsFeed: React.FC = async () => {
  const currentUser = await getServerSession()
  const notifications = (await getNotifications({ userId: currentUser?.id })) || []

  if (!notifications || notifications.length === 0) {
    return <div className="text-neutral-600 text-center p-6 text-xl">No notifications</div>
  }

  return (
    <div className="flex flex-col">
      {notifications.map((notification) => (
        <div key={notification.id} className="flex flex-row items-center p-6 gap-4 border-b-[1px] border-neutral-800">
          <Image alt="Logo" src="/images/components/layout/logo.svg" quality={100} height={50} width={50} />
          <p className="text-white">{notification.body}</p>
        </div>
      ))}
    </div>
  )
}

export default NotificationsFeed

import Header from '@/components/Header'
import NotificationsFeed from '@/components/NotificationsFeed'

export const dynamic = 'force-dynamic'

const Notifications = () => (
  <>
    <Header showBackArrow label="Notifications" />
    <NotificationsFeed />
  </>
)

export default Notifications

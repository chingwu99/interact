import { userServerService } from '@/services/user/server'

import Avatar from '../Avatar'

interface FollowBarItemProps {
  user: Record<string, any>
}

const FollowBarItem: React.FC<FollowBarItemProps> = async ({ user }) => {
  const avatarUser = await userServerService.getUser(user.id)

  return (
    <div key={user.id} className="flex flex-row gap-4">
      <Avatar userId={user.id} avatarUser={avatarUser} />

      <div className="flex flex-col">
        <p className="text-white font-semibold text-sm">{user.name}</p>
        <p className="text-neutral-400 text-sm">@{user.username}</p>
      </div>
    </div>
  )
}

export default FollowBarItem

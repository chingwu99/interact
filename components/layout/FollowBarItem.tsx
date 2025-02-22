import type { User, UserWithFollowersCount } from '@/type/user'

import Avatar from '../Avatar'

interface FollowBarItemProps {
  user: User | UserWithFollowersCount
}

const FollowBarItem: React.FC<FollowBarItemProps> = async ({ user }) => (
  <div key={user.id} className="flex flex-row gap-4">
    <Avatar avatarUser={user} />

    <div className="flex flex-col">
      <p className="text-white font-semibold text-sm">{user.name}</p>
      <p className="text-neutral-400 text-sm">@{user.username}</p>
    </div>
  </div>
)

export default FollowBarItem

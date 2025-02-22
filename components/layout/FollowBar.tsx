import type { User, UserWithFollowersCount } from '@/type/user'
import { getUsers } from '@/action/getUsers'

import FollowBarItem from './FollowBarItem'

const FollowBar = async () => {
  const users = await getUsers()

  if (users?.length === 0) {
    return null
  }

  return (
    <div className="px-6 py-4 hidden lg:block ">
      <div className="bg-neutral-800 rounded-xl p-4">
        <h2 className="text-white text-xl font-semibold">Who to follow</h2>
        <div className="flex flex-col gap-6 mt-4">
          {users.map((user: User | UserWithFollowersCount) => (
            <FollowBarItem key={user.id} user={user} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default FollowBar

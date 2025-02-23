import type { UserWithFollowersCount, User } from '@/type/user'
import { formatUserCreatedAt } from '@/utils/formatUserCreatedAt'

import UserBio from './UserBio'

interface UserBioWrapperProps {
  avatarUser: UserWithFollowersCount | null
  currentUser: User | null
  isFollowing: boolean
}

const UserBioWrapper: React.FC<UserBioWrapperProps> = ({ avatarUser, currentUser, isFollowing }) => {
  const createdAt = formatUserCreatedAt(avatarUser?.createdAt)

  return <UserBio avatarUser={avatarUser} currentUser={currentUser} isFollowing={isFollowing} createdAt={createdAt} />
}

export default UserBioWrapper

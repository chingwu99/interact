import Image from 'next/image'

import type { UserWithFollowersCount } from '@/services/user/type'

import Avatar from '../Avatar'

interface UserHeroProps {
  avatarUser: UserWithFollowersCount | null
  userId: string
}

const UserHero: React.FC<UserHeroProps> = ({ avatarUser, userId }) => (
  <div>
    <div className="bg-neutral-700 h-44 relative">
      {avatarUser?.coverImage && (
        <Image src={avatarUser.coverImage} fill alt="Cover Image" style={{ objectFit: 'cover' }} />
      )}
      <div className="absolute -bottom-16 left-4 bg-black rounded-full ">
        <Avatar userId={userId} avatarUser={avatarUser} isLarge hasBorder />
      </div>
    </div>
  </div>
)

export default UserHero

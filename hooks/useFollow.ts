import { useState, useCallback, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'

import useLoginModal from '@/hooks/useLoginModal'
import { followClientService } from '@/services/follow/client'
import { useAuth } from '@/hooks/useAuth'

interface UseFollowProps {
  userId: string
  initialFollowingIds: string[]
}

export const useFollow = ({ userId, initialFollowingIds }: UseFollowProps) => {
  const router = useRouter()
  const loginModal = useLoginModal()
  const { checkAuth } = useAuth()

  const [isFollowing, setIsFollowing] = useState(false)

  useEffect(() => {
    setIsFollowing(initialFollowingIds?.includes(userId))
  }, [userId, initialFollowingIds])

  const toggleFollow = useCallback(async () => {
    if (!userId) {
      return loginModal.onOpen()
    }

    try {
      const request = isFollowing
        ? () => followClientService.unfollowUser({ userId })
        : () => followClientService.followUser({ userId })

      // 執行請求
      await request()

      // 請求成功後才更新狀態
      setIsFollowing((prev) => !prev)
      await checkAuth()
      router.refresh()
    } catch (error) {
      toast.error('Something went wrong')
    }
  }, [userId, isFollowing, loginModal, router, checkAuth])

  return {
    isFollowing,
    toggleFollow,
  }
}

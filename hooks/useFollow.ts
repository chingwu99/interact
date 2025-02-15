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
  const { checkAuth, user: currentUser, isInitialized } = useAuth()

  const [isFollowing, setIsFollowing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsFollowing(initialFollowingIds?.includes(userId))
  }, [userId, initialFollowingIds])

  const toggleFollow = useCallback(async () => {
    if (!currentUser) {
      return loginModal.onOpen(isInitialized)
    }

    try {
      setIsLoading(true)
      const request = isFollowing
        ? () => followClientService.unfollowUser({ userId })
        : () => followClientService.followUser({ userId })

      await request()
      setIsFollowing((prev) => !prev)
      await checkAuth()
      router.refresh()
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }, [userId, isFollowing, loginModal, router, checkAuth, currentUser, isInitialized])

  return {
    isFollowing,
    toggleFollow,
    isLoading,
  }
}

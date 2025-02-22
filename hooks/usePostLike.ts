import { useCallback } from 'react'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'

import useLoginModal from '@/hooks/useLoginModal'
import { likeClientService } from '@/services/like/client'

interface UsePostLikeProps {
  postId: string
  userId?: string
  isLiked: boolean
}

export const usePostLike = ({ postId, userId, isLiked }: UsePostLikeProps) => {
  const router = useRouter()
  const loginModal = useLoginModal()

  const toggleLike = useCallback(
    async (event?: React.MouseEvent) => {
      event?.stopPropagation()

      if (!userId) {
        return loginModal.onOpen()
      }

      try {
        const request = isLiked
          ? () => likeClientService.unlikePost({ postId })
          : () => likeClientService.likePost({ postId })

        // 執行請求
        await request()

        router.refresh()
      } catch (error) {
        toast.error('Something went wrong')
      }
    },
    [postId, userId, isLiked, loginModal, router]
  )

  return {
    isLiked,
    toggleLike,
  }
}

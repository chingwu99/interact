'use client'

import { useEffect } from 'react'
// import { useRouter } from 'next/navigation'

import { useAuth } from '@/hooks/useAuth'
// import useLoginModal from '@/hooks/useLoginModal'

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const {
    // isAuthenticated,
    isLoading,
    checkAuth,
    user,
    setIsLoading,
  } = useAuth()
  //   const router = useRouter()
  //   const loginModal = useLoginModal()

  console.log('user', user)

  useEffect(() => {
    // Check if token exists and validate it
    const token = localStorage.getItem('token')
    if (token) {
      checkAuth()
    } else {
      setIsLoading(false)
    }
  }, [checkAuth, setIsLoading])

  //   useEffect(() => {
  //     if (!isLoading) {
  //       if (!isAuthenticated) {
  //         return loginModal.onOpen()
  //       }
  //       //   router.push('/')
  //     }
  //   }, [isAuthenticated, isLoading, router, loginModal])

  if (isLoading) {
    return <div>Loading...</div>
  }

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>
}

export default AuthGuard

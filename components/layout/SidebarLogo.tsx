'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

const SidebarLogo = () => {
  const router = useRouter()

  return (
    <div
      onClick={() => router.push('/')}
      className="
        rounded-full 
        h-20
        w-20
        p-4 
        flex 
        items-center 
        justify-center 
        hover:bg-blue-300 
        hover:bg-opacity-10 
        cursor-pointer
    "
    >
      <Image alt="Logo" src="/images/components/layout/logo.svg" quality={100} height="100" width="100" />
    </div>
  )
}

export default SidebarLogo

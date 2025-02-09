import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

import Sidebar from '@/components/layout/Sidebar'
import FollowBar from '@/components/layout/FollowBar'
import LoginModal from '@/components/modals/LoginModal'
import RegisterModal from '@/components/modals/RegisterModal'
import EditModal from '@/components/modals/EditModal'
import ToasterProvider from '@/providers/ToasterProvider'
import AuthGuard from '@/components/AuthGuard'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Interact',
  description: 'Interact',
}
// eslint-disable-next-line react/function-component-definition
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToasterProvider />
        <RegisterModal />
        <LoginModal />

        <AuthGuard>
          <EditModal />

          <div className="container h-full mx-auto xl:px-30 max-w-6xl">
            <div className="grid  grid-cols-4 h-full">
              <Sidebar />

              <div
                className="
                col-span-3 
                lg:col-span-2 
                border-x-[1px] 
                border-neutral-800
            "
              >
                {children}
              </div>
              <FollowBar />
            </div>
          </div>
        </AuthGuard>
      </body>
    </html>
  )
}

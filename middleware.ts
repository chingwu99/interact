import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { getServerSession } from '@/action/getServerSession'

export async function middleware(request: NextRequest) {
  const session = await getServerSession()

  // 需要驗證的路徑
  const authRoutes = ['/notifications']
  const isAuthRoute = authRoutes.some((route) => request.nextUrl.pathname.startsWith(route))

  if (isAuthRoute && !session) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/notifications/:path*'],
}

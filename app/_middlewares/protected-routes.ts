import { getToken } from 'next-auth/jwt'
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'
import { protectedRoutes } from '../_constants/route'


const protectRoutesMiddleware = async (request: NextRequest, next: NextFetchEvent) => {
  const pathname = request.nextUrl.pathname
  const hasRoute = (pages: string[] = []): boolean => {
    return pages.some((path) => {
      return pathname.startsWith(path)
    })
  }

  const session = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET
  })

  if (hasRoute(protectedRoutes) && !session) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export default protectRoutesMiddleware

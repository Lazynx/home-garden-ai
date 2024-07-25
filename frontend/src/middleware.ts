import { authMiddleware } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const defaultLang = 'en'
const supportedLangs = ['en', 'ru']

export default authMiddleware({
  publicRoutes: [
    '/',
    '/:lang',
    '/:lang/(.*)',
    '/:lang/sign-in(.*)',
    '/:lang/sign-up(.*)'
  ],
  ignoredRoutes: ['/((?!api|trpc))(_next|.+\\.[\\w]+$)'],
  beforeAuth: (req: any) => {
    const url = req.nextUrl
    const pathname = url.pathname

    if (supportedLangs.some((lang) => pathname.startsWith(`/${lang}`))) {
      return null
    }

    if (pathname === '/') {
      return NextResponse.redirect(new URL(`/${defaultLang}`, req.url))
    }

    return NextResponse.redirect(new URL(`/${defaultLang}${pathname}`, req.url))
  },
  afterAuth: (auth: any, req: any) => {
    const url = req.nextUrl
    const pathname = url.pathname

    // Если пользователь аутентифицирован
    if (auth.userId) {
      // Если URL некорректен или это корневой URL
      if (pathname === '/' || pathname.includes('%5Blang%5D')) {
        return NextResponse.redirect(new URL(`/${defaultLang}`, req.url))
      }
    }

    return null
  }
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)']
}

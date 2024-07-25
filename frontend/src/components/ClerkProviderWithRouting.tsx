'use client'

import { ClerkProvider } from '@clerk/nextjs'
import { useParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useAuth } from '@clerk/nextjs'

export function ClerkProviderWithRouting({
  children
}: {
  children: React.ReactNode
}) {
  const params = useParams()
  const router = useRouter()
  const lang = (params.lang as string) || 'en'

  return (
    <ClerkProvider>
      <AuthHandler lang={lang} router={router}>
        {children}
      </AuthHandler>
    </ClerkProvider>
  )
}

function AuthHandler({
  children,
  lang,
  router
}: {
  children: React.ReactNode
  lang: string
  router: any
}) {
  const { isLoaded, userId } = useAuth()

  useEffect(() => {
    if (isLoaded && userId) {
      router.push(`/${lang}`)
    }
  }, [isLoaded, userId, lang, router])

  return <>{children}</>
}

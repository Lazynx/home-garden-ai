'use client'

import { ClerkProvider } from '@clerk/nextjs'
import { useParams, useRouter } from 'next/navigation'

export function ClerkProviderWithRouting({
  children
}: {
  children: React.ReactNode
}) {
  const params = useParams()
  const router = useRouter()
  const lang = (params.lang as string) || 'en'

  return (
    <ClerkProvider
      navigate={(to: any) => {
        if (to === '/') {
          router.push(`/${lang}`)
        } else {
          router.push(to)
        }
      }}
    >
      {children}
    </ClerkProvider>
  )
}

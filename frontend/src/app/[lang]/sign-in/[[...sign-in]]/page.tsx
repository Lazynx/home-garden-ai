'use client'

import { SignIn } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-[#4CAF50] px-4">
      <SignIn redirectUrl="/en" afterSignInUrl="/en" />
    </div>
  )
}

import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-[#4CAF50] px-4">
      <SignUp redirectUrl="/en" afterSignInUrl="/en" />
    </div>
  )
}

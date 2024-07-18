import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Rubik } from 'next/font/google'
import { Arimo } from 'next/font/google'
import { AuthProvider } from '@/context/AuthContext'
import { TranslationProvider } from '@/context/TranslationContext'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Suspense } from 'react'
import './globals.css'

const rubik = Rubik({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-rubik'
})
const arimo = Arimo({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-arimo'
})

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'HomeGardenAI',
  description:
    'HomeGardenAI: Transform your home garden with smart plant care powered by AI. Diagnose plant diseases, receive personalized care recommendations, and maintain a thriving garden with ease.'
}

export default function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode
  params: { lang: string }
}>) {
  return (
    <html lang={params.lang}>
      <body className={rubik.variable + ' ' + arimo.variable}>
        <Suspense fallback={<div>Loading...</div>}>
          <TranslationProvider initialLocale={params.lang || 'en'}>
            <AuthProvider>{children}</AuthProvider>
            <Analytics />
            <SpeedInsights />
          </TranslationProvider>
        </Suspense>
      </body>
    </html>
  )
}

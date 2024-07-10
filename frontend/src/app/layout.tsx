import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Rubik } from 'next/font/google'
import { Arimo } from 'next/font/google'
import { AuthProvider } from '@/context/AuthContext'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
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
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={rubik.variable + ' ' + arimo.variable}>
        <AuthProvider>{children}</AuthProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}

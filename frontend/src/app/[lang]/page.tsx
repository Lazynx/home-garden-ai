'use client'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import Header from '@/components/Header/index'
import Footer from '@/components/Footer/footer'
import { useRef, useEffect, useState } from 'react'
import { useTranslation } from '@/context/TranslationContext'
// import { useRouter } from 'next/router'

export default function Home() {
  const learnMoreRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  const { locale, setLocale, t } = useTranslation()
  // const router = useRouter()

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const handleLearnMoreClick = () => {
    const offset = isMobile ? 70 : 0 // Adjust this value based on your header height
    const elementPosition = learnMoreRef.current!.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - offset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  }

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <Header bgColor="bg-gradient-to-r from-[#bce0bc] via-[#E0F0E0] to-[#F0F8F0]" />
      <main className="flex-1 mt-14 relative">
        <section className="relative w-full md:py-16 lg:py-32 bg-gradient-to-r from-[#bce0bc] via-[#E0F0E0] to-[#F0F8F0] flex items-center justify-center min-h-[calc(100vh-3.5rem)]">
          <div className="container px-4 md:px-6 flex flex-col items-center justify-center text-center h-full">
            <div className="flex flex-col justify-center space-y-4 mb-12">
              {t('mainHeroTitle')}
              <p className="max-w-[600px] text-[#6A6A6A] md:text-xl mx-auto">
                {t('mainHeroSubtitle')}
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row justify-center w-full p-4">
              <Link
                href={`/${locale}/scan`}
                className="inline-flex h-12 items-center justify-center rounded-md bg-[#4CAF50] px-24 text-sm font-medium text-white transition-colors hover:bg-[#3D8E40] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 w-full sm:w-48"
                prefetch={false}
                style={{ borderRadius: '5px' }}
              >
                {t('buttonStart')}
              </Link>
              <button
                onClick={handleLearnMoreClick}
                className="inline-flex h-12 items-center justify-center rounded-md border border-[#4CAF50] bg-[#F0F8F0] text-sm font-medium transition-colors hover:bg-[#E0F0E0] hover:text-[#4CAF50] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 w-full sm:w-48"
                style={{ borderRadius: '5px' }}
              >
                {t('buttonDetail')}
              </button>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div
            className="container px-4 md:px-6"
            id="learnMore"
            ref={learnMoreRef}
          >
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-[#4CAF50]">
                  {t('mainSectionSubtitle')}
                </h2>
                <p className="max-w-[900px] text-[#6A6A6A] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {t('mainSectionPar')}
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <Image
                src="/images/bg-1.jpg"
                className="mx-auto aspect-video rounded overflow-hidden object-cover object-center sm:w-full lg:order-last"
                style={{ borderRadius: '10px' }}
                alt="My Photo"
                width={550}
                height={310}
              />
              <div className="flex flex-col justify-center space-y-4">
                <ul className="grid gap-6">
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold text-[#4CAF50]">
                        {t('careRecommendations')}
                      </h3>
                      <p className="text-[#6A6A6A]">
                        {t('careRecommendationsText')}
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold text-[#4CAF50]">
                        {t('growthTracking')}
                      </h3>
                      <p className="text-[#6A6A6A]">
                        {t('growthTrackingText')}
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold text-[#4CAF50]">
                        {t('personalizedTips')}
                      </h3>
                      <p className="text-[#6A6A6A]">
                        {t('personalizedTipsText')}
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer bgColor="bg-gradient-to-r from-[#bce0bc] via-[#E0F0E0] to-[#F0F8F0]" />
    </div>
  )
}

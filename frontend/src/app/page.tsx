'use client'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import Header from '@/components/Header/index'
import Footer from '@/components/Footer/footer'
import { useRef, useEffect, useState } from 'react'

export default function Home() {
  const learnMoreRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

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
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-[#4CAF50]">
                Преобразите свой{' '}
                <span className="text-[#0A6847]">домашний сад</span> с легкостью
              </h1>
              <p className="max-w-[600px] text-[#6A6A6A] md:text-xl mx-auto">
                Не упустите ни одной детали в уходе за растениями.
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row justify-center w-full  p-4">
              <Link
                href="/scan"
                className="inline-flex h-12 items-center justify-center rounded-md bg-[#4CAF50] px-24 text-sm font-medium text-white transition-colors hover:bg-[#3D8E40] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 w-full sm:w-auto"
                prefetch={false}
                style={{ borderRadius: '5px' }}
              >
                Начать
              </Link>
              <button
                onClick={handleLearnMoreClick}
                className="inline-flex h-12 items-center justify-center rounded-md border border-[#4CAF50] bg-[#F0F8F0] px-24 text-sm font-medium transition-colors hover:bg-[#E0F0E0] hover:text-[#4CAF50] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 w-full sm:w-auto"
                style={{ borderRadius: '5px' }}
              >
                Узнать больше
              </button>
            </div>
          </div>
        </section>
        {/* <section className="relative w-full md:py-16 lg:py-32 bg-gradient-to-r from-[#bce0bc] via-[#E0F0E0] to-[#F0F8F0] flex items-center justify-center min-h-[calc(100vh-3.5rem)]">
          <div className="container px-4 md:px-6 flex flex-col md:flex-row items-center justify-between h-full">
            <div className="order-2 md:order-1 flex flex-col justify-center space-y-4 mb-12 md:mb-0 md:text-left text-center">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-[#4CAF50]">
                Преобразите свой{' '}
                <span className="text-[#0A6847]">домашний сад</span> с легкостью
              </h1>
              <p className="max-w-[600px] text-[#6A6A6A] md:text-xl mx-auto md:mx-0">
                Не упустите ни одной детали в уходе за растениями.
              </p>
              <div className="flex flex-col gap-2 sm:flex-row justify-start w-full sm:w-auto p-4 md:p-0">
                <Link
                  href="/scan"
                  className="inline-flex h-12 items-center justify-center rounded-md bg-[#4CAF50] px-24 text-sm font-medium text-white transition-colors hover:bg-[#3D8E40] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 w-full sm:w-auto"
                  prefetch={false}
                  style={{ borderRadius: '5px' }}
                >
                  Начать
                </Link>
                <button
                  onClick={handleLearnMoreClick}
                  className="inline-flex h-12 items-center justify-center rounded-md border border-[#4CAF50] bg-[#F0F8F0] px-24 text-sm font-medium transition-colors hover:bg-[#E0F0E0] hover:text-[#4CAF50] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 w-full sm:w-auto"
                  style={{ borderRadius: '5px' }}
                >
                  Узнать больше
                </button>
              </div>
            </div>
            <div className="order-1 md:order-2 md:w-1/2 w-full flex justify-center md:justify-start mb-8 md:mb-0">
              <Image
                src="/images/bg-2.png"
                alt="Flower"
                width={700}
                height={500}
                className="object-cover"
              />
            </div>
          </div>
        </section> */}

        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div
            className="container px-4 md:px-6"
            id="learnMore"
            ref={learnMoreRef}
          >
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-[#4CAF50]">
                  Легкий уход за растениями
                </h2>
                <p className="max-w-[900px] text-[#6A6A6A] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Наше приложение HomeGardenAI избавит вас от догадок в уходе за
                  растениями, предоставляя персонализированные рекомендации и
                  советы, чтобы ваши комнатные и садовые растения процветали.
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
                        Рекомендации по уходу за растениями
                      </h3>
                      <p className="text-[#6A6A6A]">
                        Получайте персонализированные советы по уходу за вашими
                        растениями с учетом их специфических нужд и вашего
                        окружения.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold text-[#4CAF50]">
                        Отслеживание роста
                      </h3>
                      <p className="text-[#6A6A6A]">
                        Мониторьте прогресс ваших растений и получайте
                        уведомления о любых изменениях в их состоянии.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold text-[#4CAF50]">
                        Персонализированные советы
                      </h3>
                      <p className="text-[#6A6A6A]">
                        Получайте индивидуальные советы и рекомендации, чтобы
                        ваши растения процветали в уникальных условиях вашего
                        окружения.
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

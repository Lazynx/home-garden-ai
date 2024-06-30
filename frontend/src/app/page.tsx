'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import Header from '@/components/Header/index'
import Footer from '@/components/Footer/footer'

export default function Home() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <Header />
      <main className="flex-1 mt-14">
        <section className="relative w-full md:py-16 lg:py-32 bg-[#F0F8F0] flex items-center justify-center min-h-[calc(100vh-3.5rem)]">
          <div className="container px-4 md:px-6 flex flex-col items-center justify-center text-center h-full">
            <div className="flex flex-col justify-center space-y-4 mb-24 md:mb-0">
              {/* <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-[#4CAF50]">
                Transform Your{' '}
                <span className="text-[#0A6847]">Home Garden</span> with Ease
              </h1>
              <p className="max-w-[600px] text-[#6A6A6A] md:text-xl mx-auto">
                Our HomeGarden AI app is your personal plant companion,
                providing tailored care recommendations and insights to help
                your indoor and outdoor plants thrive.
              </p> */}
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-[#4CAF50]">
                Преобразите свой{' '}
                <span className="text-[#0A6847]">домашний сад</span> с легкостью
              </h1>
              <p className="max-w-[600px] text-[#6A6A6A] md:text-xl mx-auto">
                Не упустите ни одной детали в уходе за растениями.
              </p>
            </div>
            <div className="absolute bottom-0 left-0 right-0 flex flex-col gap-2 sm:flex-row justify-center w-full sm:w-auto p-4">
              <Link
                href="/scan"
                className="inline-flex h-12 items-center justify-center rounded-md bg-[#4CAF50] px-8 text-sm font-medium text-white transition-colors hover:bg-[#3D8E40] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 w-full sm:w-auto"
                prefetch={false}
                style={{ borderRadius: '5px' }}
              >
                {/* Get Started */}
                Начать
              </Link>
              {/* <Link
                href="#"
                className="inline-flex h-12 items-center justify-center rounded-md border border-[#4CAF50] bg-[#F0F8F0] px-8 text-sm font-medium transition-colors hover:bg-[#E0F0E0] hover:text-[#4CAF50] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 w-full sm:w-auto"
                prefetch={false}
                style={{ borderRadius: '5px' }}
              >
                Learn More
              </Link> */}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-[#4CAF50]">
                  {/* Effortless Plant Care */}
                  Легкий уход за растениями
                </h2>
                <p className="max-w-[900px] text-[#6A6A6A] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {/* Our HomeGarden AI app takes the guesswork out of plant care,
                  providing personalized recommendations and insights to help
                  your indoor and outdoor plants thrive. */}
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
                  {/* <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold text-[#4CAF50]">
                        Plant Care Recommendations
                      </h3>
                      <p className="text-[#6A6A6A]">
                        Get personalized care tips for your plants based on
                        their specific needs and your environment.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold text-[#4CAF50]">
                        Growth Tracking
                      </h3>
                      <p className="text-[#6A6A6A]">
                        Monitor your plants progress and receive alerts for any
                        changes in their health.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold text-[#4CAF50]">
                        Personalized Insights
                      </h3>
                      <p className="text-[#6A6A6A]">
                        Get tailored tips and advice to help your plants thrive
                        in your unique environment.
                      </p>
                    </div>
                  </li> */}
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
      <Footer />
    </div>
  )
}

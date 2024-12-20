'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Header from '@/components/Header/index'
import Footer from '@/components/Footer/footer'
import Image from 'next/image'
import axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import { useTranslation } from '@/context/TranslationContext'

// Определяем интерфейс для растения
interface Plant {
  _id: string
  name: string
  nameEn: string
  description: string
  descriptionEn: string
  soilComposition: string
  soilCompositionEn: string
  homeTemperature: string
  homeTemperatureEn: string
  sunlightExposure: string
  sunlightExposureEn: string
  image: string
  createdAt: string
}

export default function Component() {
  const [plants, setPlants] = useState<Plant[]>([])
  const [loading, setLoading] = useState(true)
  const { locale, t } = useTranslation()

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/plants/get_all`
        )
        const sortedPlants = response.data.sort(
          (a: Plant, b: Plant) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        setPlants(sortedPlants)
      } catch (error) {
        console.error('Error fetching plants:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPlants()
  }, [])

  if (loading) {
    return (
      <div className="flex flex-col min-h-[100dvh]">
        <Header bgColor="bg-[#F0F8F0]" />
        <main className="flex-1 flex items-center justify-center bg-[#F0F8F0]">
          <CircularProgress color="success" />
        </main>
        <Footer bgColor="bg-[#F0F8F0]" />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <Header bgColor="bg-[#F0F8F0]" />
      <main className="flex-1 mt-14 px-4 md:px-6 py-12 md:py-24 lg:py-12 bg-[#F0F8F0]">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {plants.map((plant) => (
              <div
                key={plant._id}
                className="relative overflow-hidden transition-transform duration-300  ease-in-out rounded-lg shadow-lg group hover:shadow-xl hover:-translate-y-2 flex flex-col justify-between"
                style={{ borderRadius: '10px', minHeight: '300px' }}
              >
                <Image
                  src={plant.image}
                  alt={plant.name}
                  width={500}
                  height={400}
                  className="object-cover w-full h-64"
                />
                <div className="p-4 bg-background flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-[#4CAF50]">
                      {locale === 'en' ? plant.nameEn : plant.name}
                    </h3>
                    <p className="text-sm text-[#6A6A6A]">
                      {locale === 'en'
                        ? plant.descriptionEn
                        : plant.description}
                    </p>
                    <div className="flex items-center gap-2">
                      <svg
                        className="h-6 w-6 text-[#4CAF50]"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21.54 15H17a2 2 0 0 0-2 2v4.54" />
                        <path d="M7 3.34V5a3 3 0 0 0 3 3v0a2 2 0 0 1 2 2v0c0 1.1.9 2 2 2v0a2 2 0 0 0 2-2v0c0-1.1.9-2 2-2h3.17" />
                        <path d="M11 21.95V18a2 2 0 0 0-2-2v0a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05" />
                        <circle cx="12" cy="12" r="10" />
                      </svg>
                      <p className="text-[#6A6A6A]">
                        {locale === 'en'
                          ? plant.soilCompositionEn
                          : plant.soilComposition}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg
                        className="h-6 w-6 text-[#4CAF50]"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z" />
                      </svg>
                      <p className="text-[#6A6A6A]">
                        {locale === 'en'
                          ? plant.homeTemperatureEn
                          : plant.homeTemperature}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg
                        className="h-6 w-6 text-[#4CAF50]"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="4" />
                        <path d="M12 2v2" />
                        <path d="M12 20v2" />
                        <path d="m4.93 4.93 1.41 1.41" />
                        <path d="m17.66 17.66 1.41 1.41" />
                        <path d="M2 12h2" />
                        <path d="M20 12h2" />
                        <path d="m6.34 17.66-1.41 1.41" />
                        <path d="m19.07 4.93-1.41 1.41" />
                      </svg>
                      <p className="text-[#6A6A6A]">
                        {locale === 'en'
                          ? plant.sunlightExposureEn
                          : plant.sunlightExposure}
                      </p>
                    </div>
                  </div>
                  <Link
                    href={`/${locale}/plants/${plant._id}`}
                    className="mt-4 inline-flex h-12 items-center justify-center rounded-md bg-[#4CAF50] px-4 text-sm font-medium text-white transition-colors hover:bg-[#3D8E40] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 w-full"
                    style={{ borderRadius: '5px' }}
                    prefetch={false}
                  >
                    {t('go')}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer bgColor="bg-[#F0F8F0]" />
    </div>
  )
}

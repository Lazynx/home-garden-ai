'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/Header/index'
import Footer from '@/components/Footer/footer'
import { useAuth } from '@/context/AuthContext'
import axios from 'axios'

export default function Home() {
  const { user } = useAuth()
  const router = useRouter()
  const [garden, setGarden] = useState(null)
  const [plants, setPlants] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user && user._id) {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/gardens/user/${user._id}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${user.accessToken}`
            }
          }
        )
        .then((response) => {
          setGarden(response.data)
          setPlants(response.data.plants || [])
          setLoading(false)
        })
        .catch((error) => {
          console.error('Error fetching garden:', error)
          setLoading(false)
        })
    }
  }, [user])

  if (loading) {
    return <div>Загрузка...</div>
  }

  if (!garden || plants.length === 0) {
    return (
      <div className="flex flex-col min-h-[100dvh]">
        <Header />
        <main className="flex-1 mt-14 px-4 md:px-6 py-12 md:py-24 lg:py-32 bg-[#F0F8F0]">
          <div className="container text-center">
            <p className="text-lg text-[#6A6A6A]">
              Вы еще не добавили ничего в ваш сад.
            </p>
            <Link href="/scan" className="text-[#4CAF50] hover:underline">
              Отсканируйте растение
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <Header />
      <main className="flex-1 mt-14 px-4 md:px-6 py-12 md:py-24 lg:py-32 bg-[#F0F8F0]">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {plants.map((plant) => (
              <div
                key={plant._id}
                className="relative overflow-hidden transition-transform duration-300 ease-in-out rounded-lg shadow-lg group hover:shadow-xl hover:-translate-y-2"
                style={{ borderRadius: '10px' }}
              >
                <Link
                  href={`/plants/${plant._id}`}
                  className="absolute inset-0 z-10"
                  prefetch={false}
                >
                  <span className="sr-only">View</span>
                </Link>
                <Image
                  src={plant.image}
                  alt={plant.name}
                  width={500}
                  height={400}
                  className="object-cover w-full h-64"
                />
                <div className="p-4 bg-background">
                  <h3 className="text-xl font-bold text-[#4CAF50]">
                    {plant.name}
                  </h3>
                  <p className="text-sm text-[#6A6A6A]">{plant.description}</p>
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
                    <p className="text-[#6A6A6A]">{plant.soilComposition}</p>
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
                    <p className="text-[#6A6A6A]">{plant.homeTemperature}</p>
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
                    <p className="text-[#6A6A6A]">{plant.sunlightExposure}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

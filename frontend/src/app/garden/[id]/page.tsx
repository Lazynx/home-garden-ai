// 'use client'

// import { useState, useEffect } from 'react'
// import { useRouter } from 'next/navigation'
// import Link from 'next/link'
// import Image from 'next/image'
// import Header from '@/components/Header/index'
// import Footer from '@/components/Footer/footer'
// import { useAuth } from '@/context/AuthContext'
// import axios from 'axios'
// import CircularProgress from '@mui/material/CircularProgress'
// import Box from '@mui/material/Box'

// interface Plant {
//   _id: string
//   name: string
//   description: string
//   soilComposition: string
//   homeTemperature: string
//   sunlightExposure: string
//   image: string
//   wateringFrequency: number
// }

// interface Garden {
//   _id: string
//   name: string
//   plants: Plant[]
// }

// export default function Home() {
//   const { user } = useAuth()
//   const router = useRouter()
//   const [garden, setGarden] = useState<Garden | null>(null)
//   const [plants, setPlants] = useState<Plant[]>([])
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     if (user && user._id) {
//       axios
//         .get(
//           `${process.env.NEXT_PUBLIC_BASE_URL}/api/gardens/user/${user._id}`,
//           {
//             headers: {
//               'Content-Type': 'application/json',
//               Authorization: `Bearer ${user.accessToken}`
//             }
//           }
//         )
//         .then((response) => {
//           setGarden(response.data)
//           setPlants(response.data.plants || [])
//           setLoading(false)
//         })
//         .catch((error) => {
//           console.error('Error fetching garden:', error)
//           setLoading(false)
//         })
//     }
//   }, [user])

//   if (loading) {
//     return (
//       <div className="flex flex-col min-h-[100dvh]">
//         <Header bgColor="bg-[#F0F8F0]" />
//         <main className="flex-1 flex items-center justify-center bg-[#F0F8F0]">
//           <CircularProgress color="success" />
//         </main>
//         <Footer bgColor="bg-[#F0F8F0]" />
//       </div>
//     )
//   }

//   if (!garden || plants.length === 0) {
//     return (
//       <div className="flex flex-col min-h-[100dvh]">
//         <Header bgColor="bg-[#F0F8F0]" />
//         <main className="flex-1 mt-14 px-4 md:px-6 py-12 md:py-24 lg:py-32 bg-[#F0F8F0]">
//           <div className="container text-center">
//             <p className="text-lg text-[#6A6A6A]">
//               Вы еще не добавили ничего в ваш сад.
//             </p>
//             <Link href="/scan" className="text-[#4CAF50] hover:underline">
//               Отсканируйте растение
//             </Link>
//           </div>
//         </main>
//         <Footer bgColor="bg-[#F0F8F0]" />
//       </div>
//     )
//   }

//   return (
//     <div className="flex flex-col min-h-[100dvh]">
//       <Header bgColor="bg-[#F0F8F0]" />
//       <main className="flex-1 mt-14 px-4 md:px-6 py-12 md:py-24 lg:py-32 bg-[#F0F8F0]">
//         <div className="container">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {plants.map((plant) => (
//               <div
//                 key={plant._id}
//                 className="relative overflow-hidden transition-transform duration-300 ease-in-out rounded-lg shadow-lg group hover:shadow-xl hover:-translate-y-2"
//                 style={{ borderRadius: '10px' }}
//               >
//                 <div className="absolute top-2 right-2 bg-white p-1 rounded-full">
//                   <svg
//                     viewBox="0 0 32 32"
//                     version="1.1"
//                     xmlSpace="preserve"
//                     width="30"
//                     height="30"
//                     xmlns="http://www.w3.org/2000/svg"
//                     xmlnsXlink="http://www.w3.org/1999/xlink"
//                     fill="#000000"
//                   >
//                     <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
//                     <g
//                       id="SVGRepo_tracerCarrier"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     ></g>
//                     <g id="SVGRepo_iconCarrier">
//                       <g id="Energy20"></g>
//                       <g id="Energy19"></g>
//                       <g id="Energy18"></g>
//                       <g id="Energy17"></g>
//                       <g id="Energy16"></g>
//                       <g id="Energy15"></g>
//                       <g id="Energy14"></g>
//                       <g id="Energy13"></g>
//                       <g id="Energy12"></g>
//                       <g id="Energy11">
//                         <g>
//                           <path
//                             d="M28,19c0,6.62-5.38,12-12,12S4,25.62,4,19C4,12.58,14.83,1.75,15.3,1.29c0.39-0.39,1.01-0.39,1.4,0C17.17,1.75,28,12.58,28,19z"
//                             fill="#2dd5eb"
//                           ></path>
//                         </g>
//                         <g>
//                           <path
//                             d="M14,26c-3.3086,0-6-2.6914-6-6c0-0.5527,0.4478-1,1-1s1,0.4473,1,1c0,2.2061,1.7944,4,4,4c0.5522,0,1,0.4473,1,1S14.5522,26,14,26z"
//                             fill="#FFFFFF"
//                           ></path>
//                         </g>
//                       </g>
//                       <g id="Energy10"></g>
//                       <g id="Energy09"></g>
//                       <g id="Energy08"></g>
//                       <g id="Energy07"></g>
//                       <g id="Energy06"></g>
//                       <g id="Energy05"></g>
//                       <g id="Energy04"></g>
//                       <g id="Energy03"></g>
//                       <g id="Energy02"></g>
//                       <g id="Energy01"></g>
//                     </g>
//                   </svg>
//                   {/* <svg
//                     viewBox="0 0 64 64"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="#000000"
//                     width="30"
//                     height="30"
//                   >
//                     <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
//                     <g
//                       id="SVGRepo_tracerCarrier"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     ></g>
//                     <g id="SVGRepo_iconCarrier">
//                       <g fill="none" fillRule="evenodd">
//                         <path
//                           fill="#B4DFFB"
//                           d="M34,62 C45.045695,62 54,53.045695 54,42 C54,30.954305 34,0.981555368 34,0.981555368 C34,0.981555368 14,30.954305 14,42 C14,53.045695 22.954305,62 34,62 Z"
//                         ></path>
//                         <path
//                           fill="#80D25B"
//                           d="M34,41 C38.418278,41 42,37.418278 42,33 C42,28.581722 34,15 34,15 C34,15 26,28.581722 26,33 C26,37.418278 29.581722,41 34,41 Z"
//                         ></path>
//                         <path
//                           stroke="#22BA8E"
//                           strokeLinecap="square"
//                           strokeWidth="2"
//                           d="M34,56 L34,29.9545689"
//                         ></path>
//                         <path
//                           stroke="#22BA8E"
//                           strokeLinecap="round"
//                           strokeWidth="2"
//                           d="M46,44 C39.372583,44 34,49.372583 34,56"
//                         ></path>
//                         <path
//                           stroke="#22BA8E"
//                           strokeLinecap="round"
//                           strokeWidth="2"
//                           d="M34,44 C27.372583,44 22,49.372583 22,56"
//                           transform="matrix(-1 0 0 1 56 0)"
//                         ></path>
//                       </g>
//                     </g>
//                   </svg> */}
//                 </div>
//                 <Link
//                   href={`/garden/plant/${plant._id}`}
//                   className="absolute inset-0 z-10"
//                   prefetch={false}
//                 >
//                   <span className="sr-only">View</span>
//                 </Link>
//                 <Image
//                   src={plant.image}
//                   alt={plant.name}
//                   width={500}
//                   height={400}
//                   className="object-cover w-full h-64"
//                 />
//                 <div className="p-4 bg-background">
//                   <h3 className="text-xl font-bold text-[#4CAF50]">
//                     {plant.name}
//                   </h3>
//                   <p className="text-sm text-[#6A6A6A]">{plant.description}</p>
//                   <div className="flex items-center gap-2">
//                     <svg
//                       className="h-6 w-6 text-[#4CAF50]"
//                       xmlns="http://www.w3.org/2000/svg"
//                       width="24"
//                       height="24"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     >
//                       <path d="M21.54 15H17a2 2 0 0 0-2 2v4.54" />
//                       <path d="M7 3.34V5a3 3 0 0 0 3 3v0a2 2 0 0 1 2 2v0c0 1.1.9 2 2 2v0a2 2 0 0 0 2-2v0c0-1.1.9-2 2-2h3.17" />
//                       <path d="M11 21.95V18a2 2 0 0 0-2-2v0a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05" />
//                       <circle cx="12" cy="12" r="10" />
//                     </svg>
//                     <p className="text-[#6A6A6A]">{plant.soilComposition}</p>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <svg
//                       className="h-6 w-6 text-[#4CAF50]"
//                       xmlns="http://www.w3.org/2000/svg"
//                       width="24"
//                       height="24"
//                       viewBox="0 0 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     >
//                       <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z" />
//                     </svg>
//                     <p className="text-[#6A6A6A]">{plant.homeTemperature}</p>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <svg
//                       className="h-6 w-6 text-[#4CAF50]"
//                       xmlns="http://www.w3.org/2000/svg"
//                       width="24"
//                       height="24"
//                       viewBox="0 0 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     >
//                       <circle cx="12" cy="12" r="4" />
//                       <path d="M12 2v2" />
//                       <path d="M12 20v2" />
//                       <path d="m4.93 4.93 1.41 1.41" />
//                       <path d="m17.66 17.66 1.41 1.41" />
//                       <path d="M2 12h2" />
//                       <path d="M20 12h2" />
//                       <path d="m6.34 17.66-1.41 1.41" />
//                       <path d="m19.07 4.93-1.41 1.41" />
//                     </svg>
//                     <p className="text-[#6A6A6A]">{plant.sunlightExposure}</p>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <svg
//                       fill="#000000"
//                       width="24"
//                       height="24"
//                       viewBox="0 0 24 24"
//                       id="water-can-2"
//                       data-name="Line Color"
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="icon line-color"
//                     >
//                       <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
//                       <g
//                         id="SVGRepo_tracerCarrier"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       ></g>
//                       <g id="SVGRepo_iconCarrier">
//                         <polyline
//                           id="secondary"
//                           points="15.52 11.76 19.17 9.76 21 11.59 15.96 16.63"
//                           style={{
//                             fill: 'none',
//                             stroke: '#4CAF50',
//                             strokeLinecap: 'round',
//                             strokeLinejoin: 'round',
//                             strokeWidth: 2
//                           }}
//                         ></polyline>
//                         <path
//                           id="secondary-2"
//                           data-name="secondary"
//                           d="M6.35,12.94a4,4,0,1,1,4.47-5.13"
//                           style={{
//                             fill: 'none',
//                             stroke: '#4CAF50',
//                             strokeLinecap: 'round',
//                             strokeLinejoin: 'round',
//                             strokeWidth: 2
//                           }}
//                         ></path>
//                         <path
//                           id="primary"
//                           d="M7.09,19h7.82a1,1,0,0,0,1-1.09l-.82-9a1,1,0,0,0-1-.91H7.91a1,1,0,0,0-1,.91l-.82,9A1,1,0,0,0,7.09,19Z"
//                           style={{
//                             fill: 'none',
//                             stroke: '#4CAF50',
//                             strokeLinecap: 'round',
//                             strokeLinejoin: 'round',
//                             strokeWidth: 2
//                           }}
//                         ></path>
//                       </g>
//                     </svg>
//                     <p className="text-[#6A6A6A]">
//                       {plant.wateringFrequency}{' '}
//                       {plant.wateringFrequency === 1
//                         ? 'раз в неделю'
//                         : 'раза в неделю'}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </main>
//       <Footer bgColor="bg-[#F0F8F0]" />
//     </div>
//   )
// }
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/Header/index'
import Footer from '@/components/Footer/footer'
import { useAuth } from '@/context/AuthContext'
import axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress'
import dayjs from 'dayjs'

interface Plant {
  _id: string
  name: string
  description: string
  soilComposition: string
  homeTemperature: string
  sunlightExposure: string
  image: string
  wateringFrequency: number
  lastWateredDate: string
}

interface Garden {
  _id: string
  name: string
  plants: Plant[]
}

export default function Home() {
  const { user } = useAuth()
  const router = useRouter()
  const [garden, setGarden] = useState<Garden | null>(null)
  const [plants, setPlants] = useState<Plant[]>([])
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

  const isWateringToday = (plant: Plant) => {
    const lastWateredDate = dayjs(plant.lastWateredDate)
    const today = dayjs()
    const daysBetweenWatering = Math.floor(7 / plant.wateringFrequency)
    let nextWateringDate = lastWateredDate

    while (nextWateringDate.isBefore(today, 'day')) {
      nextWateringDate = nextWateringDate.add(daysBetweenWatering, 'day')
    }

    return nextWateringDate.isSame(today, 'day')
  }

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

  if (!garden || plants.length === 0) {
    return (
      <div className="flex flex-col min-h-[100dvh]">
        <Header bgColor="bg-[#F0F8F0]" />
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
        <Footer bgColor="bg-[#F0F8F0]" />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <Header bgColor="bg-[#F0F8F0]" />
      <main className="flex-1 mt-14 px-4 md:px-6 py-12 md:py-24 lg:py-32 bg-[#F0F8F0]">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {plants.map((plant) => (
              <div
                key={plant._id}
                className="relative overflow-hidden transition-transform duration-300 ease-in-out rounded-lg shadow-lg group hover:shadow-xl hover:-translate-y-2"
                style={{ borderRadius: '10px' }}
              >
                {isWateringToday(plant) && (
                  <div className="absolute top-2 right-2 bg-white p-1 rounded-full">
                    <svg
                      viewBox="0 0 32 32"
                      version="1.1"
                      xmlSpace="preserve"
                      width="30"
                      height="30"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      fill="#000000"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <g id="Energy20"></g>
                        <g id="Energy19"></g>
                        <g id="Energy18"></g>
                        <g id="Energy17"></g>
                        <g id="Energy16"></g>
                        <g id="Energy15"></g>
                        <g id="Energy14"></g>
                        <g id="Energy13"></g>
                        <g id="Energy12"></g>
                        <g id="Energy11">
                          <g>
                            <path
                              d="M28,19c0,6.62-5.38,12-12,12S4,25.62,4,19C4,12.58,14.83,1.75,15.3,1.29c0.39-0.39,1.01-0.39,1.4,0C17.17,1.75,28,12.58,28,19z"
                              fill="#2dd5eb"
                            ></path>
                          </g>
                          <g>
                            <path
                              d="M14,26c-3.3086,0-6-2.6914-6-6c0-0.5527,0.4478-1,1-1s1,0.4473,1,1c0,2.2061,1.7944,4,4,4c0.5522,0,1,0.4473,1,1S14.5522,26,14,26z"
                              fill="#FFFFFF"
                            ></path>
                          </g>
                        </g>
                        <g id="Energy10"></g>
                        <g id="Energy09"></g>
                        <g id="Energy08"></g>
                        <g id="Energy07"></g>
                        <g id="Energy06"></g>
                        <g id="Energy05"></g>
                        <g id="Energy04"></g>
                        <g id="Energy03"></g>
                        <g id="Energy02"></g>
                        <g id="Energy01"></g>
                      </g>
                    </svg>
                  </div>
                )}
                <Link
                  href={`/garden/plant/${plant._id}`}
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
                  <div className="flex items-center gap-2">
                    <svg
                      fill="#000000"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      id="water-can-2"
                      data-name="Line Color"
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon line-color"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <polyline
                          id="secondary"
                          points="15.52 11.76 19.17 9.76 21 11.59 15.96 16.63"
                          style={{
                            fill: 'none',
                            stroke: '#4CAF50',
                            strokeLinecap: 'round',
                            strokeLinejoin: 'round',
                            strokeWidth: 2
                          }}
                        ></polyline>
                        <path
                          id="secondary-2"
                          data-name="secondary"
                          d="M6.35,12.94a4,4,0,1,1,4.47-5.13"
                          style={{
                            fill: 'none',
                            stroke: '#4CAF50',
                            strokeLinecap: 'round',
                            strokeLinejoin: 'round',
                            strokeWidth: 2
                          }}
                        ></path>
                        <path
                          id="primary"
                          d="M7.09,19h7.82a1,1,0,0,0,1-1.09l-.82-9a1,1,0,0,0-1-.91H7.91a1,1,0,0,0-1,.91l-.82,9A1,1,0,0,0,7.09,19Z"
                          style={{
                            fill: 'none',
                            stroke: '#4CAF50',
                            strokeLinecap: 'round',
                            strokeLinejoin: 'round',
                            strokeWidth: 2
                          }}
                        ></path>
                      </g>
                    </svg>
                    <p className="text-[#6A6A6A]">
                      {plant.wateringFrequency}{' '}
                      {plant.wateringFrequency === 1
                        ? 'раз в неделю'
                        : 'раза в неделю'}
                    </p>
                  </div>
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

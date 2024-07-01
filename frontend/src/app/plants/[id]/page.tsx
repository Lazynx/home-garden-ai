// 'use client'

// import { useState, useEffect } from 'react'
// import { useParams, useRouter } from 'next/navigation'
// import { Button } from '@/components/ui/button'
// import Header from '@/components/Header/index'
// import Footer from '@/components/Footer/footer'
// import Image from 'next/image'
// import { useAuth } from '@/context/AuthContext'
// import axios from 'axios'
// import CircularProgress from '@mui/material/CircularProgress'
// import Box from '@mui/material/Box'

// // Интерфейс для описания структуры растения
// interface Plant {
//   _id: string
//   name: string
//   description: string
//   soilComposition: string
//   homeTemperature: string
//   sunlightExposure: string
//   image: string
// }

// // Интерфейс для описания структуры сада
// interface Garden {
//   _id: string
//   name: string
//   plants: Plant[]
// }

// export default function Component() {
//   const { id } = useParams()
//   const { user } = useAuth()
//   const router = useRouter()
//   const [plantInfo, setPlantInfo] = useState<Plant | null>(null)
//   const [loading, setLoading] = useState(false)
//   const [isPlantInGarden, setIsPlantInGarden] = useState(false)

//   useEffect(() => {
//     if (id) {
//       const plantId = Array.isArray(id) ? id[0] : id
//       fetchPlantInfo(plantId)
//     }
//   }, [id])

//   useEffect(() => {
//     if (user && id) {
//       const plantId = Array.isArray(id) ? id[0] : id
//       checkUserGarden(plantId)
//     }
//   }, [user, id])

//   const fetchPlantInfo = async (plantId: string) => {
//     try {
//       const response = await axios.get(
//         `${process.env.NEXT_PUBLIC_BASE_URL}/api/plants/${plantId}`
//       )
//       setPlantInfo(response.data)
//     } catch (error) {
//       console.error('Error fetching plant info:', error)
//     }
//   }

//   const checkUserGarden = async (plantId: string) => {
//     try {
//       const response = await axios.get(
//         `${process.env.NEXT_PUBLIC_BASE_URL}/api/gardens/user/${user._id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${user.accessToken}`
//           }
//         }
//       )
//       const garden = response.data
//       const plantExists = garden.plants.some(
//         (plant: Plant) => plant._id === plantId
//       )
//       setIsPlantInGarden(plantExists)
//     } catch (error) {
//       console.error('Error checking user garden:', error)
//     }
//   }

//   const redirectToLogin = () => {
//     router.push('/signin')
//   }

//   const handleAddToGarden = async () => {
//     if (!user) {
//       redirectToLogin()
//       return
//     }

//     setLoading(true)
//     try {
//       let response
//       try {
//         response = await axios.get(
//           `${process.env.NEXT_PUBLIC_BASE_URL}/api/gardens/user/${user._id}`,
//           {
//             headers: {
//               Authorization: `Bearer ${user.accessToken}`
//             }
//           }
//         )
//       } catch (error) {
//         if (axios.isAxiosError(error) && error.response?.status === 404) {
//           response = await axios.post(
//             `${process.env.NEXT_PUBLIC_BASE_URL}/api/gardens/create`,
//             {
//               name: `${user.username}'s Garden`,
//               userIds: [user._id],
//               plantIds: [id]
//             },
//             {
//               headers: {
//                 Authorization: `Bearer ${user.accessToken}`
//               }
//             }
//           )
//         } else {
//           throw error
//         }
//       }

//       let garden: Garden = response.data

//       if (!garden.plants.some((plant: Plant) => plant._id === id)) {
//         await axios.post(
//           `${process.env.NEXT_PUBLIC_BASE_URL}/api/gardens/add_plant`,
//           {
//             gardenId: garden._id,
//             plantId: id
//           },
//           {
//             headers: {
//               Authorization: `Bearer ${user.accessToken}`
//             }
//           }
//         )
//       }

//       setIsPlantInGarden(true)
//     } catch (error) {
//       console.error('Error adding plant to garden:', error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   if (!plantInfo) {
//     return (
//       <div className="flex flex-col min-h-[100dvh]">
//         <Header />
//         <main className="flex-1 flex items-center justify-center bg-[#F0F8F0]">
//           <CircularProgress color="success" />
//         </main>
//         <Footer />
//       </div>
//     )
//   }

//   return (
//     <div className="flex flex-col min-h-[100dvh]">
//       <Header />
//       <main className="flex-1 mt-14 px-4 md:px-6 py-12 md:py-24 lg:py-32 bg-[#F0F8F0]">
//         <div className="container">
//           <div className="grid md:grid-cols-2 gap-8 items-start">
//             <div>
//               <Image
//                 src={plantInfo.image}
//                 alt={plantInfo.name}
//                 width={400}
//                 height={400}
//                 className="rounded-lg object-cover w-full aspect-square"
//                 style={{ borderRadius: '10px' }}
//               />
//             </div>
//             <div className="space-y-6">
//               <div className="space-y-2">
//                 <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-[#4CAF50]">
//                   {plantInfo.name}
//                 </h1>
//                 <p className="max-w-[600px] text-[#6A6A6A] md:text-xl">
//                   {plantInfo.description}
//                 </p>
//               </div>
//               <div className="grid gap-2">
//                 <div className="flex items-center gap-2">
//                   <svg
//                     className="h-6 w-6 text-[#4CAF50]"
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="24"
//                     height="24"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   >
//                     <path d="M21.54 15H17a2 2 0 0 0-2 2v4.54" />
//                     <path d="M7 3.34V5a3 3 0 0 0 3 3v0a2 2 0 0 1 2 2v0c0 1.1.9 2 2 2v0a2 2 0 0 0 2-2v0c0-1.1.9-2 2-2h3.17" />
//                     <path d="M11 21.95V18a2 2 0 0 0-2-2v0a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05" />
//                     <circle cx="12" cy="12" r="10" />
//                   </svg>
//                   <div>
//                     <h3 className="font-semibold text-[#4CAF50]">
//                       Состав почвы
//                     </h3>
//                     <p className="text-[#6A6A6A]">
//                       {plantInfo.soilComposition}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <svg
//                     className="h-6 w-6 text-[#4CAF50]"
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="24"
//                     height="24"
//                     viewBox="0 0 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   >
//                     <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z" />
//                   </svg>
//                   <div>
//                     <h3 className="font-semibold text-[#4CAF50]">
//                       Температура в доме
//                     </h3>
//                     <p className="text-[#6A6A6A]">
//                       {plantInfo.homeTemperature}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <svg
//                     className="h-6 w-6 text-[#4CAF50]"
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="24"
//                     height="24"
//                     viewBox="0 0 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   >
//                     <circle cx="12" cy="12" r="4" />
//                     <path d="M12 2v2" />
//                     <path d="M12 20v2" />
//                     <path d="m4.93 4.93 1.41 1.41" />
//                     <path d="m17.66 17.66 1.41 1.41" />
//                     <path d="M2 12h2" />
//                     <path d="M20 12h2" />
//                     <path d="m6.34 17.66-1.41 1.41" />
//                     <path d="m19.07 4.93-1.41 1.41" />
//                   </svg>
//                   <div>
//                     <h3 className="font-semibold text-[#4CAF50]">
//                       Воздействие солнечного света
//                     </h3>
//                     <p className="text-[#6A6A6A]">
//                       {plantInfo.sunlightExposure}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//               {!isPlantInGarden && (
//                 <Button
//                   type="button"
//                   className="w-full rounded-md bg-[#4CAF50] px-4 py-2 text-white transition-colors hover:bg-[#3D8E40] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
//                   style={{ borderRadius: '5px' }}
//                   onClick={handleAddToGarden}
//                   disabled={loading}
//                 >
//                   {loading ? 'Добавление...' : 'Добавить в сад'}
//                 </Button>
//               )}
//             </div>
//           </div>
//         </div>
//       </main>
//       <Footer />
//     </div>
//   )
// }
'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import Header from '@/components/Header/index'
import Footer from '@/components/Footer/footer'
import Image from 'next/image'
import { useAuth } from '@/context/AuthContext'
import axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

// Интерфейс для описания структуры растения
interface Plant {
  _id: string
  name: string
  description: string
  soilComposition: string
  homeTemperature: string
  sunlightExposure: string
  image: string
}

// Интерфейс для описания структуры сада
interface Garden {
  _id: string
  name: string
  plants: Plant[]
}

export default function Component() {
  const { id } = useParams()
  const { user, setRedirectedFrom, clearRedirectedFrom, redirectedFrom } =
    useAuth()
  const router = useRouter()
  const [plantInfo, setPlantInfo] = useState<Plant | null>(null)
  const [loading, setLoading] = useState(false)
  const [isPlantInGarden, setIsPlantInGarden] = useState(false)

  useEffect(() => {
    if (id) {
      const plantId = Array.isArray(id) ? id[0] : id
      fetchPlantInfo(plantId)
    }
  }, [id])

  useEffect(() => {
    if (user && id) {
      const plantId = Array.isArray(id) ? id[0] : id
      checkUserGarden(plantId)
      if (redirectedFrom) {
        handleAddToGardenAfterLogin()
      }
    }
  }, [user, id])

  const fetchPlantInfo = async (plantId: string) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/plants/${plantId}`
      )
      setPlantInfo(response.data)
    } catch (error) {
      console.error('Error fetching plant info:', error)
    }
  }

  const checkUserGarden = async (plantId: string) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/gardens/user/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`
          }
        }
      )
      const garden = response.data
      const plantExists = garden.plants.some(
        (plant: Plant) => plant._id === plantId
      )
      setIsPlantInGarden(plantExists)
    } catch (error) {
      console.error('Error checking user garden:', error)
    }
  }

  const redirectToLogin = () => {
    setRedirectedFrom(router.asPath)
    router.push('/signin')
  }

  const handleAddToGarden = async () => {
    if (!user) {
      redirectToLogin()
      return
    }

    setLoading(true)
    try {
      let response
      try {
        response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/gardens/user/${user._id}`,
          {
            headers: {
              Authorization: `Bearer ${user.accessToken}`
            }
          }
        )
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
          response = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/gardens/create`,
            {
              name: `${user.username}'s Garden`,
              userIds: [user._id],
              plantIds: [id]
            },
            {
              headers: {
                Authorization: `Bearer ${user.accessToken}`
              }
            }
          )
        } else {
          throw error
        }
      }

      let garden: Garden = response.data

      if (!garden.plants.some((plant: Plant) => plant._id === id)) {
        await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/gardens/add_plant`,
          {
            gardenId: garden._id,
            plantId: id
          },
          {
            headers: {
              Authorization: `Bearer ${user.accessToken}`
            }
          }
        )
      }

      setIsPlantInGarden(true)
    } catch (error) {
      console.error('Error adding plant to garden:', error)
    } finally {
      setLoading(false)
      clearRedirectedFrom()
    }
  }

  const handleAddToGardenAfterLogin = () => {
    if (redirectedFrom && redirectedFrom.includes(`/plants/${id}`)) {
      handleAddToGarden()
    }
  }

  if (!plantInfo) {
    return (
      <div className="flex flex-col min-h-[100dvh]">
        <Header />
        <main className="flex-1 flex items-center justify-center bg-[#F0F8F0]">
          <CircularProgress color="success" />
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
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div>
              <Image
                src={plantInfo.image}
                alt={plantInfo.name}
                width={400}
                height={400}
                className="rounded-lg object-cover w-full aspect-square"
                style={{ borderRadius: '10px' }}
              />
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-[#4CAF50]">
                  {plantInfo.name}
                </h1>
                <p className="max-w-[600px] text-[#6A6A6A] md:text-xl">
                  {plantInfo.description}
                </p>
              </div>
              <div className="grid gap-2">
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
                  <div>
                    <h3 className="font-semibold text-[#4CAF50]">
                      Состав почвы
                    </h3>
                    <p className="text-[#6A6A6A]">
                      {plantInfo.soilComposition}
                    </p>
                  </div>
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
                  <div>
                    <h3 className="font-semibold text-[#4CAF50]">
                      Температура в доме
                    </h3>
                    <p className="text-[#6A6A6A]">
                      {plantInfo.homeTemperature}
                    </p>
                  </div>
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
                  <div>
                    <h3 className="font-semibold text-[#4CAF50]">
                      Воздействие солнечного света
                    </h3>
                    <p className="text-[#6A6A6A]">
                      {plantInfo.sunlightExposure}
                    </p>
                  </div>
                </div>
              </div>
              {!isPlantInGarden && (
                <Button
                  type="button"
                  className="w-full rounded-md bg-[#4CAF50] px-4 py-2 text-white transition-colors hover:bg-[#3D8E40] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  style={{ borderRadius: '5px' }}
                  onClick={handleAddToGarden}
                  disabled={loading}
                >
                  {loading ? 'Добавление...' : 'Добавить в сад'}
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

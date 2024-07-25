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
// import dayjs from 'dayjs'
// import { useTranslation } from '@/context/TranslationContext'
// import { format } from 'date-fns'

// interface Plant {
//   _id: string
//   name: string
//   nameEn: string
//   description: string
//   descriptionEn: string
//   soilComposition: string
//   soilCompositionEn: string
//   homeTemperature: string
//   homeTemperatureEn: string
//   sunlightExposure: string
//   sunlightExposureEn: string
//   image: string
//   wateringFrequency: number
//   lastWateredDate: string
//   createdAt: string
//   fertilizer: string
//   fertilizerEn: string
//   fertilizerFrequency: string
//   fertilizerFrequencyEn: string
//   nextWateringDate: Date
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
//   const { locale, t } = useTranslation()

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
//           const sortedPlants = (response.data.plants || []).sort(
//             (a: Plant, b: Plant) =>
//               new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
//           )
//           setPlants(sortedPlants)
//           setLoading(false)
//         })
//         .catch((error) => {
//           console.error('Error fetching garden:', error)
//           setLoading(false)
//         })
//     }
//   }, [user])

//   const isWateringToday = (plant: Plant) => {
//     const lastWateredDate = dayjs(plant.lastWateredDate)
//     const today = dayjs()
//     const daysBetweenWatering = Math.floor(7 / plant.wateringFrequency)
//     let nextWateringDate = lastWateredDate

//     while (nextWateringDate.isBefore(today, 'day')) {
//       nextWateringDate = nextWateringDate.add(daysBetweenWatering, 'day')
//     }

//     return nextWateringDate.isSame(today, 'day')
//   }

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
//             <p className="text-lg text-[#6A6A6A]">{t('noPlantsInGarden')}</p>
//             <Link
//               href={`/${locale}/scan`}
//               className="text-[#4CAF50] hover:underline"
//             >
//               {t('scanPlant')}
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
//       <main className="flex-1 mt-14 px-4 md:px-6 py-12 md:py-24 lg:py-12 bg-[#F0F8F0]">
//         <div className="container">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {plants.map((plant) => (
//               <div
//                 key={plant._id}
//                 className="relative overflow-hidden transition-transform duration-300 ease-in-out rounded-lg shadow-lg group hover:shadow-xl hover:-translate-y-2 flex flex-col justify-between"
//                 style={{ borderRadius: '10px', minHeight: '300px' }}
//               >
//                 {isWateringToday(plant) && (
//                   <div className="absolute top-2 right-2 bg-white p-1 rounded-full">
//                     <svg
//                       viewBox="0 0 32 32"
//                       version="1.1"
//                       xmlSpace="preserve"
//                       width="30"
//                       height="30"
//                       xmlns="http://www.w3.org/2000/svg"
//                       xmlnsXlink="http://www.w3.org/1999/xlink"
//                       fill="#000000"
//                     >
//                       <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
//                       <g
//                         id="SVGRepo_tracerCarrier"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       ></g>
//                       <g id="SVGRepo_iconCarrier">
//                         <g id="Energy20"></g>
//                         <g id="Energy19"></g>
//                         <g id="Energy18"></g>
//                         <g id="Energy17"></g>
//                         <g id="Energy16"></g>
//                         <g id="Energy15"></g>
//                         <g id="Energy14"></g>
//                         <g id="Energy13"></g>
//                         <g id="Energy12"></g>
//                         <g id="Energy11">
//                           <g>
//                             <path
//                               d="M28,19c0,6.62-5.38,12-12,12S4,25.62,4,19C4,12.58,14.83,1.75,15.3,1.29c0.39-0.39,1.01-0.39,1.4,0C17.17,1.75,28,12.58,28,19z"
//                               fill="#2dd5eb"
//                             ></path>
//                           </g>
//                           <g>
//                             <path
//                               d="M14,26c-3.3086,0-6-2.6914-6-6c0-0.5527,0.4478-1,1-1s1,0.4473,1,1c0,2.2061,1.7944,4,4,4c0.5522,0,1,0.4473,1,1S14.5522,26,14,26z"
//                               fill="#FFFFFF"
//                             ></path>
//                           </g>
//                         </g>
//                         <g id="Energy10"></g>
//                         <g id="Energy09"></g>
//                         <g id="Energy08"></g>
//                         <g id="Energy07"></g>
//                         <g id="Energy06"></g>
//                         <g id="Energy05"></g>
//                         <g id="Energy04"></g>
//                         <g id="Energy03"></g>
//                         <g id="Energy02"></g>
//                         <g id="Energy01"></g>
//                       </g>
//                     </svg>
//                   </div>
//                 )}
//                 <Image
//                   src={plant.image}
//                   alt={plant.name}
//                   width={500}
//                   height={400}
//                   className="object-cover w-full h-64"
//                 />
//                 <div className="p-4 bg-background flex-grow flex flex-col justify-between">
//                   <div>
//                     <h3 className="text-xl font-bold text-[#4CAF50]">
//                       {locale === 'en' ? plant.nameEn : plant.name}
//                     </h3>
//                     <p className="text-sm text-[#6A6A6A]">
//                       {locale === 'en'
//                         ? plant.descriptionEn
//                         : plant.description}
//                     </p>
//                     <div className="flex items-center gap-2">
//                       <svg
//                         className="h-6 w-6 text-[#4CAF50]"
//                         xmlns="http://www.w3.org/2000/svg"
//                         width="24"
//                         height="24"
//                         viewBox="0 0 24 24"
//                         fill="none"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       >
//                         <path d="M21.54 15H17a2 2 0 0 0-2 2v4.54" />
//                         <path d="M7 3.34V5a3 3 0 0 0 3 3v0a2 2 0 0 1 2 2v0c0 1.1.9 2 2 2v0a2 2 0 0 0 2-2v0c0-1.1.9-2 2-2h3.17" />
//                         <path d="M11 21.95V18a2 2 0 0 0-2-2v0a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05" />
//                         <circle cx="12" cy="12" r="10" />
//                       </svg>
//                       <p className="text-[#6A6A6A]">
//                         {locale === 'en'
//                           ? plant.soilCompositionEn
//                           : plant.soilComposition}
//                       </p>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <svg
//                         className="h-6 w-6 text-[#4CAF50]"
//                         xmlns="http://www.w3.org/2000/svg"
//                         width="24"
//                         height="24"
//                         viewBox="0 0 24"
//                         fill="none"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       >
//                         <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z" />
//                       </svg>
//                       <p className="text-[#6A6A6A]">
//                         {locale === 'en'
//                           ? plant.homeTemperatureEn
//                           : plant.homeTemperature}
//                       </p>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <svg
//                         className="h-6 w-6 text-[#4CAF50]"
//                         xmlns="http://www.w3.org/2000/svg"
//                         width="24"
//                         height="24"
//                         viewBox="0 0 24"
//                         fill="none"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       >
//                         <circle cx="12" cy="12" r="4" />
//                         <path d="M12 2v2" />
//                         <path d="M12 20v2" />
//                         <path d="m4.93 4.93 1.41 1.41" />
//                         <path d="m17.66 17.66 1.41 1.41" />
//                         <path d="M2 12h2" />
//                         <path d="M20 12h2" />
//                         <path d="m6.34 17.66-1.41 1.41" />
//                         <path d="m19.07 4.93-1.41 1.41" />
//                       </svg>
//                       <p className="text-[#6A6A6A]">
//                         {locale === 'en'
//                           ? plant.sunlightExposureEn
//                           : plant.sunlightExposure}
//                       </p>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <svg
//                         fill="#000000"
//                         width="24"
//                         height="24"
//                         viewBox="0 0 24 24"
//                         id="water-can-2"
//                         data-name="Line Color"
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="icon line-color"
//                       >
//                         <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
//                         <g
//                           id="SVGRepo_tracerCarrier"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                         ></g>
//                         <g id="SVGRepo_iconCarrier">
//                           <polyline
//                             id="secondary"
//                             points="15.52 11.76 19.17 9.76 21 11.59 15.96 16.63"
//                             style={{
//                               fill: 'none',
//                               stroke: '#4CAF50',
//                               strokeLinecap: 'round',
//                               strokeLinejoin: 'round',
//                               strokeWidth: 2
//                             }}
//                           ></polyline>
//                           <path
//                             id="secondary-2"
//                             data-name="secondary"
//                             d="M6.35,12.94a4,4,0,1,1,4.47-5.13"
//                             style={{
//                               fill: 'none',
//                               stroke: '#4CAF50',
//                               strokeLinecap: 'round',
//                               strokeLinejoin: 'round',
//                               strokeWidth: 2
//                             }}
//                           ></path>
//                           <path
//                             id="primary"
//                             d="M7.09,19h7.82a1,1,0,0,0,1-1.09l-.82-9a1,1,0,0,0-1-.91H7.91a1,1,0,0,0-1,.91l-.82,9A1,1,0,0,0,7.09,19Z"
//                             style={{
//                               fill: 'none',
//                               stroke: '#4CAF50',
//                               strokeLinecap: 'round',
//                               strokeLinejoin: 'round',
//                               strokeWidth: 2
//                             }}
//                           ></path>
//                         </g>
//                       </svg>
//                       <p className="text-[#6A6A6A]">
//                         {plant.wateringFrequency}{' '}
//                         {locale === 'en'
//                           ? plant.wateringFrequency === 1
//                             ? 'time a week'
//                             : 'times a week'
//                           : plant.wateringFrequency === 1
//                           ? 'раз в неделю'
//                           : 'раза в неделю'}
//                       </p>
//                     </div>
//                     {plant.fertilizer && plant.fertilizerFrequency && (
//                       <div className="flex items-center gap-2">
//                         <svg
//                           fill="#4CAF50"
//                           width="24"
//                           height="24"
//                           version="1.1"
//                           id="Capa_1"
//                           xmlns="http://www.w3.org/2000/svg"
//                           xmlnsXlink="http://www.w3.org/1999/xlink"
//                           viewBox="0 0 415.325 415.325"
//                           xmlSpace="preserve"
//                         >
//                           <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
//                           <g
//                             id="SVGRepo_tracerCarrier"
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                           ></g>
//                           <g id="SVGRepo_iconCarrier">
//                             <g>
//                               <g>
//                                 <g>
//                                   <path d="M279.967,194.722c-0.523-1.479-1.68-2.537-3.051-3.023l0.007-0.021c-14.108-4.997-33.258,5.555-42.348,14.644 c-8.169,8.167-9.94,20.086-4.947,28.667l-16.981,17.018v-32.85c11.587-2.629,20.342-14.208,20.342-28.055 c0-17.762-8.865-41.161-23.189-47.991c-1.417-0.675-2.98-0.605-4.294,0.02l-0.009-0.02 c-14.326,6.829-23.193,30.228-23.193,47.991c0,13.847,8.756,25.425,20.344,28.054v32.586l-16.851-16.885 c4.991-8.58,3.218-20.498-4.948-28.665c-9.088-9.088-28.238-19.64-42.348-14.643l0.008,0.021 c-1.371,0.487-2.527,1.544-3.051,3.022c-5.002,14.114,5.551,33.261,14.641,42.35c5.129,5.129,11.74,7.745,18.076,7.745 c3.733,0,7.359-0.932,10.54-2.77l23.933,23.98v12.52c0,2.761,2.238,5,5,5c2.762,0,5-2.239,5-5v-12.254l24.064-24.115 c3.181,1.838,6.806,2.768,10.539,2.768c6.335,0,12.948-2.616,18.076-7.744C274.415,227.985,284.967,208.837,279.967,194.722z M157.168,229.87c-7.467-7.465-13.922-20.844-12.854-29.463c8.618-1.068,21.996,5.39,29.463,12.855 c4.078,4.078,5.635,9.557,4.45,14.011l-12.222-12.247c-1.95-1.956-5.115-1.958-7.071-0.007c-1.954,1.95-1.958,5.115-0.007,7.07 l12.216,12.241C166.696,235.498,161.235,233.939,157.168,229.87z M192.303,191.101c0-13.453,6.201-31.28,15.344-37.69 c9.143,6.411,15.342,24.238,15.342,37.69c0,8.14-4.333,15.058-10.342,17.582V185.71c0-2.761-2.238-5-5-5c-2.762,0-5,2.239-5,5 v22.973C196.637,206.158,192.303,199.24,192.303,191.101z M258.254,230c-4.067,4.068-9.525,5.628-13.973,4.461l12.345-12.371 c1.951-1.955,1.947-5.121-0.007-7.07c-1.956-1.951-5.121-1.948-7.071,0.007l-12.352,12.378c-1.186-4.453,0.371-9.933,4.45-14.012 c7.466-7.465,20.841-13.925,29.462-12.856C272.177,209.157,265.721,222.536,258.254,230z"></path>
//                                   <g>
//                                     <path d="M207.647,303.12c-52.664,0-95.51-42.845-95.51-95.508c0-52.663,42.846-95.508,95.51-95.508 c52.664,0,95.51,42.845,95.51,95.508C303.156,260.276,260.311,303.12,207.647,303.12z M207.647,122.104 c-47.15,0-85.51,38.359-85.51,85.508c0,47.15,38.359,85.508,85.51,85.508s85.51-38.358,85.51-85.508 C293.156,160.463,254.797,122.104,207.647,122.104z"></path>
//                                   </g>
//                                 </g>
//                                 <path d="M342.322,360.331c-6.002-2.865-11.791-3.016-16.395-2.297c24.244-98.549,24.246-202.271,0.006-300.822 c1.424,0.222,2.953,0.366,4.578,0.366c3.623,0,7.67-0.688,11.811-2.664c13.109-6.256,21.977-22.791,26.039-49.193 c0.744-4.836-4.037-5.899-5.715-5.699l-0.004-0.02c-26.385,4.169-42.936,12.93-49.191,26.039c-2.156,4.519-2.762,8.913-2.63,12.78 c-5.389-2.141-12.839-4.234-23.122-6.147c-21.43-3.987-49.859-6.183-80.053-6.183c-30.193,0-58.623,2.196-80.055,6.183 c-10.275,1.912-17.722,4.003-23.109,6.143c0.13-3.865-0.486-8.261-2.641-12.775C95.586,12.932,79.035,4.172,52.651,0.002 l-0.004,0.021c-3.531-0.074-6.146,2.97-5.715,5.698c4.168,26.386,12.93,42.937,26.039,49.193 c4.141,1.977,8.188,2.664,11.811,2.664c1.624,0,3.153-0.143,4.576-0.364c-24.238,98.55-24.236,202.271,0.006,300.82 c-4.604-0.718-10.408-0.597-16.393,2.297c-15.781,7.632-26.102,43.53-26.039,50.754c0.021,2.493,2.514,4.219,4.932,4.219 c5.063,0,43.512-10.123,49.978-26.1c1.879-4.643,2.773-8.927,2.641-12.797c5.389,2.14,12.834,4.23,23.109,6.143 c21.432,3.988,49.861,6.184,80.053,6.184c30.193,0,58.623-2.195,80.055-6.184c10.278-1.912,17.727-4.004,23.114-6.145 c-0.134,3.871,0.48,8.275,2.638,12.799c6.256,13.109,22.852,21.594,49.191,26.039c1.082,0.183,1.561,0,1.561,0 c2.728-0.432,4.59-2.992,4.158-5.719C364.194,383.138,355.432,366.587,342.322,360.331z M322.477,30.348 c4.182-8.762,16.131-15.339,34.727-19.193c-3.838,18.513-10.373,30.455-19.08,34.682c-6.642,3.224-13.031,1.226-15.682,0.104 C321.352,43.323,319.351,36.899,322.477,30.348z M132.43,41.966c20.475-3.531,47.186-5.475,75.217-5.475 c28.029,0,54.742,1.944,75.215,5.476c23.635,4.076,30.822,8.912,31.707,10.553c0.001,0.005,0.002,0.01,0.003,0.016 c0.005,0.111,1.286,5.547,1.841,7.813c-5.895-2.387-14.494-4.761-27.098-6.913c-22.117-3.777-51.121-5.857-81.67-5.857 c-30.529,0-59.52,2.078-81.635,5.852c-12.625,2.154-21.231,4.53-27.131,6.917c0.555-2.265,1.843-7.822,1.844-7.827 C101.608,50.878,108.797,46.042,132.43,41.966z M77.277,45.889c-8.762-4.181-15.339-16.131-19.193-34.727 C76.596,15,88.537,21.534,92.764,30.24c3.23,6.652,1.222,13.052,0.107,15.683C90.256,47.013,83.83,49.017,77.277,45.889z M92.817,384.898c-4.182,8.761-16.131,15.339-34.726,19.191c3.838-18.513,10.372-30.453,19.079-34.682 c6.641-3.225,13.029-1.228,15.682-0.104C93.942,371.92,95.944,378.346,92.817,384.898z M314.569,362.704 c-0.885,1.643-8.074,6.479-31.709,10.555c-20.473,3.529-47.186,5.475-75.215,5.475s-54.74-1.945-75.213-5.475 c-23.635-4.076-30.824-8.912-31.709-10.555c-0.001-0.006-1.285-5.562-1.84-7.827c5.895,2.387,14.493,4.761,27.096,6.913 c22.117,3.777,51.123,5.858,81.67,5.858c30.527,0,59.52-2.078,81.635-5.854c12.621-2.153,21.227-4.528,27.125-6.915 C315.854,357.144,314.569,362.698,314.569,362.704z M286.1,352.189c-21.377,3.52-49.238,5.459-78.451,5.459 c-29.215,0-57.074-1.94-78.451-5.457c-25.246-4.156-32.707-9.156-33.422-10.639c-0.002-0.006-0.006-0.012-0.007-0.018 c-19.464-88.021-19.46-179.796-0.001-267.818c0.871-1.626,8.429-6.566,33.424-10.681c21.377-3.52,49.24-5.458,78.453-5.458 c29.215,0,57.076,1.938,78.451,5.457c25.195,4.147,32.676,9.134,33.416,10.628c19.469,88.025,19.479,179.806,0.02,267.832 C318.693,343.11,311.158,348.063,286.1,352.189z M322.529,385.005c-3.23-6.653-1.222-13.054-0.107-15.685 c2.615-1.089,9.041-3.092,15.594,0.036c8.762,4.18,15.339,16.129,19.193,34.726C338.697,400.245,326.756,393.71,322.529,385.005z"></path>
//                               </g>
//                             </g>
//                           </g>
//                         </svg>
//                         <p className="text-[#6A6A6A]">
//                           {locale === 'en'
//                             ? plant.fertilizerEn
//                             : plant.fertilizer}
//                           ,{' '}
//                           {locale === 'en'
//                             ? plant.fertilizerFrequencyEn
//                             : plant.fertilizerFrequency}
//                         </p>
//                       </div>
//                     )}
//                     <div className="flex items-center gap-2">
//                       <svg
//                         height="30px"
//                         width="30px"
//                         version="1.1"
//                         id="Layer_1"
//                         xmlns="http://www.w3.org/2000/svg"
//                         xmlnsXlink="http://www.w3.org/1999/xlink"
//                         viewBox="0 0 512.001 512.001"
//                         xmlSpace="preserve"
//                         fill="#000000"
//                       >
//                         <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
//                         <g
//                           id="SVGRepo_tracerCarrier"
//                           stroke-linecap="round"
//                           stroke-linejoin="round"
//                         ></g>
//                         <g id="SVGRepo_iconCarrier">
//                           {' '}
//                           <path
//                             style={{ fill: '#E8E6D9' }}
//                             d="M351.912,158.284l-125.876-5.994c-2.315-0.11-4.575,0.732-6.253,2.332 c-1.669,1.588-2.628,3.817-2.628,6.135v23.976c0,4.218,3.103,7.796,7.277,8.391l167.835,23.976c2.692,0.385,5.344-0.547,7.195-2.398 c0.633-0.633,1.172-1.372,1.587-2.203c1.632-3.264,0.992-7.204-1.588-9.785l-41.959-41.959 C356.012,159.267,354.018,158.385,351.912,158.284z"
//                           ></path>{' '}
//                           <path
//                             style={{ fill: '#11BBA3' }}
//                             d="M433.971,101.676c-13.025,0-26.049-4.958-35.965-14.874l0,0c-19.83-19.831-19.83-52.098,0-71.929 c19.832-19.831,52.097-19.832,71.931,0c19.83,19.831,19.83,52.098,0,71.929C460.02,96.718,446.996,101.676,433.971,101.676z M409.995,74.815c13.222,13.221,34.733,13.22,47.953,0c13.221-13.221,13.221-34.732,0-47.953c-13.222-13.222-34.733-13.221-47.953,0 C396.775,40.083,396.775,61.594,409.995,74.815L409.995,74.815z"
//                           ></path>{' '}
//                           <g>
//                             {' '}
//                             <path
//                               style={{ fill: '#72CCC5' }}
//                               d="M405.216,55.271L405.216,55.271l-31.9-28.355c-3.145-2.795-7.925-2.654-10.899,0.32l-83.918,83.918 c-2.975,2.975-3.116,7.754-0.32,10.899l28.355,31.9l0,0l55.347-47.93L405.216,55.271z"
//                             ></path>{' '}
//                             <path
//                               style={{ fill: '#72CCC5' }}
//                               d="M481.211,122.821L443.297,89.12l0,0l-55.27,48.912l-47.643,54l0,0l33.702,37.914 c2.992,3.366,8.372,3.527,11.559,0.339l95.906-95.906C484.738,131.193,484.577,125.814,481.211,122.821z"
//                             ></path>{' '}
//                           </g>{' '}
//                           <path
//                             style={{ fill: '#11BBA3' }}
//                             d="M307.216,127.921c-7.701-7.701-14.808-15.772-21.336-24.148l-7.379,7.379 c-2.975,2.975-3.116,7.754-0.32,10.899l95.906,107.893c2.993,3.366,8.372,3.527,11.559,0.339l35.816-35.816 C379.618,182.974,340.094,160.8,307.216,127.921z"
//                           ></path>{' '}
//                           <polygon
//                             style={{ fill: '#E8E6D9' }}
//                             points="405.216,55.271 306.535,153.953 340.383,192.033 443.297,89.12 "
//                           ></polygon>{' '}
//                           <path
//                             style={{ fill: '#72CCC5' }}
//                             d="M199.599,130.891c-4.327,0.001-7.947,3.62-7.948,7.948v67.816c0,4.389,3.558,7.947,7.947,7.947 c10.75,0,21.33-4.266,29.029-11.707c0.171-0.164,0.337-0.328,0.504-0.497c12-12,15.635-30.374,9.024-45.956 C231.671,141.161,216.176,130.892,199.599,130.891z"
//                           ></path>{' '}
//                           <path
//                             style={{ fill: '#DDDAC5' }}
//                             d="M320.335,140.152l-13.802,13.802l33.85,38.081l22.017-22.017 C347.649,161.626,333.548,151.672,320.335,140.152z"
//                           ></path>{' '}
//                           <path
//                             style={{ fill: '#11BBA3' }}
//                             d="M191.652,200.612v6.043c0,4.389,3.558,7.947,7.947,7.947c10.75,0,21.33-4.266,29.029-11.707 c0.171-0.164,0.337-0.328,0.504-0.497c4.937-4.937,8.455-10.954,10.429-17.411C225.674,196.2,208.55,201.412,191.652,200.612z"
//                           ></path>{' '}
//                           <g>
//                             {' '}
//                             <path
//                               style={{ fill: '#198A82' }}
//                               d="M148.77,261.247c-6.406,0-10.167-7.508-6.405-12.643c5.237-7.15,11.087-13.945,17.385-20.196 c3.115-3.091,8.147-3.072,11.238,0.043c3.092,3.115,3.072,8.147-0.042,11.238c-5.711,5.667-11.013,11.825-15.759,18.305 C153.631,260.121,151.217,261.247,148.77,261.247z"
//                             ></path>{' '}
//                             <path
//                               style={{ fill: '#198A82' }}
//                               d="M112.112,259.255c-6.039,0-9.885-6.765-6.857-11.955c4.432-7.593,9.416-14.969,14.812-21.923 c2.69-3.468,7.684-4.095,11.15-1.406c3.467,2.691,4.096,7.683,1.405,11.15c-4.97,6.404-9.56,13.199-13.642,20.191 C117.505,257.844,114.845,259.255,112.112,259.255z M143.205,219.187c-6.971,0-10.525-8.715-5.587-13.598 c6.251-6.181,12.973-12.01,19.98-17.323c3.5-2.653,8.482-1.966,11.134,1.531c2.651,3.498,1.966,8.482-1.531,11.134 c-6.456,4.894-12.65,10.263-18.408,15.959C147.245,218.423,145.224,219.187,143.205,219.187z"
//                             ></path>{' '}
//                             <path
//                               style={{ fill: '#198A82' }}
//                               d="M72.088,257.921c-5.754,0-9.636-6.197-7.168-11.37c3.76-7.882,8.009-15.645,12.626-23.073 c2.318-3.728,7.219-4.87,10.945-2.553c3.728,2.318,4.871,7.218,2.553,10.946c-4.308,6.929-8.271,14.17-11.778,21.522 C77.903,256.251,75.056,257.921,72.088,257.921z M98.888,214.817c-6.529,0-10.254-7.767-6.238-12.865 c5.4-6.856,11.247-13.491,17.382-19.724c3.078-3.13,8.11-3.167,11.238-0.088c3.127,3.079,3.167,8.11,0.088,11.238 c-5.725,5.817-11.184,12.01-16.224,18.409C103.568,213.778,101.24,214.817,98.888,214.817z M134.503,178.654 c-3.468,0-6.618-2.335-7.617-5.658c-0.917-3.052,0.125-6.444,2.598-8.455c6.778-5.513,13.938-10.704,21.278-15.431 c3.691-2.375,8.608-1.311,10.984,2.379c2.376,3.69,1.311,8.608-2.379,10.984c-6.849,4.411-13.53,9.256-19.856,14.399 C138.038,178.072,136.264,178.654,134.503,178.654z"
//                             ></path>{' '}
//                           </g>{' '}
//                           <path
//                             style={{ fill: '#66BF00' }}
//                             d="M77.408,269.796c-2.928-4.023-8.998-4.339-12.33-0.645c-5.583,6.192-33.48,38.009-34.435,56.26 c-0.527,10.035,2.886,19.672,9.609,27.139c6.724,7.467,15.953,11.869,25.986,12.394c0.674,0.036,1.346,0.054,2.014,0.054 c9.303,0,18.159-3.392,25.124-9.664c7.467-6.723,11.869-15.951,12.394-25.985C106.729,311.097,82.312,276.539,77.408,269.796z"
//                           ></path>{' '}
//                           <path
//                             style={{ fill: '#58AB23' }}
//                             d="M76.2,355.403c-0.67,0-1.341-0.018-2.014-0.054c-10.035-0.526-19.263-4.927-25.986-12.394 s-10.135-17.105-9.609-27.139c0.639-12.188,13.285-30.416,23.284-43.032c-9.178,10.606-30.399,36.748-31.232,52.628 c-0.527,10.035,2.886,19.672,9.609,27.139c6.724,7.467,15.953,11.869,25.986,12.394c0.674,0.036,1.346,0.054,2.014,0.054 c9.303,0,18.159-3.392,25.124-9.664c2.976-2.68,5.457-5.763,7.408-9.132C93.903,352.172,85.268,355.403,76.2,355.403z"
//                           ></path>{' '}
//                           <path
//                             style={{ fill: '#66BF00' }}
//                             d="M167.993,313.749c-1.94-4.573-7.787-6.259-11.866-3.41c-6.835,4.774-41.188,29.478-46.235,47.044 c-5.729,19.935,5.828,40.814,25.762,46.544c3.459,0.994,6.944,1.468,10.374,1.468c16.348,0,31.434-10.753,36.169-27.23 C187.246,360.598,171.251,321.424,167.993,313.749z"
//                           ></path>{' '}
//                           <path
//                             style={{ fill: '#58AB23' }}
//                             d="M157.486,395.085c-3.43,0-6.915-0.473-10.374-1.468c-19.935-5.729-31.493-26.608-25.762-46.544 c2.001-6.964,8.612-15.047,16.283-22.568c-11.679,9.761-24.773,22.551-27.74,32.879c-5.729,19.935,5.828,40.814,25.762,46.544 c3.459,0.994,6.944,1.468,10.374,1.468c12.02,0,23.352-5.818,30.395-15.446C170.749,393.252,164.226,395.085,157.486,395.085z"
//                           ></path>{' '}
//                           <path
//                             style={{ fill: '#508913' }}
//                             d="M158.22,350.219c-0.189-4.386-3.893-7.768-8.281-7.599c-4.385,0.189-7.787,3.896-7.599,8.281 c0.019,0.424,1.174,40.755-45.303,61.318c-2.665-8.694-5.656-16.737-8.506-24.398c-8.584-23.074-15.996-43.003-12.707-70.919 c0.514-4.359-2.603-8.308-6.962-8.822c-4.366-0.509-8.31,2.603-8.822,6.963c-3.737,31.723,4.681,54.357,13.595,78.32 c7.543,20.28,15.344,41.251,15.961,69.743c0.093,4.33,3.632,7.776,7.942,7.776c0.058,0,0.117,0,0.175-0.002 c4.389-0.094,7.869-3.729,7.773-8.117c-0.28-12.917-1.94-24.457-4.317-35.021c29.518-12.335,43.46-31.651,49.99-46.09 C158.753,364.857,158.246,350.808,158.22,350.219z"
//                           ></path>{' '}
//                           <path
//                             style={{ fill: '#B9873C' }}
//                             d="M98.406,453.015c-31.88,0-59.175,19.561-70.578,47.331c-2.282,5.559,1.856,11.655,7.866,11.655 h125.426c6.009,0,10.148-6.096,7.866-11.655C157.581,472.575,130.285,453.015,98.406,453.015z"
//                           ></path>{' '}
//                         </g>
//                       </svg>
//                       <p className="text-[#6A6A6A]">
//                         {t('nextWateredDate')} :{' '}
//                         {format(plant.nextWateringDate, 'yyyy-MM-dd')}
//                       </p>
//                     </div>
//                   </div>
//                   <Link
//                     href={`/${locale}/garden/plant/${plant._id}`}
//                     className="mt-4 inline-flex h-12 items-center justify-center rounded-md bg-[#4CAF50] px-4 text-sm font-medium text-white transition-colors hover:bg-[#3D8E40] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 w-full"
//                     style={{ borderRadius: '5px' }}
//                     prefetch={false}
//                   >
//                     {t('go')}
//                   </Link>
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
import axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress'
import dayjs from 'dayjs'
import { useTranslation } from '@/context/TranslationContext'
import { format } from 'date-fns'
import { useUser } from '@clerk/nextjs'

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
  wateringFrequency: number
  lastWateredDate: string
  createdAt: string
  fertilizer: string
  fertilizerEn: string
  fertilizerFrequency: string
  fertilizerFrequencyEn: string
  nextWateringDate: Date
}

interface Garden {
  _id: string
  name: string
  plants: Plant[]
}

export default function Home() {
  const { user, isLoaded, isSignedIn } = useUser()
  const router = useRouter()
  const [garden, setGarden] = useState<Garden | null>(null)
  const [plants, setPlants] = useState<Plant[]>([])
  const [loading, setLoading] = useState(true)
  const { locale, t } = useTranslation()

  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      console.log('User is loaded and signed in')
      axios
        .get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/gardens/user/${user.id}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${user.id}` // Изменено с user.sessionClaims.sid на user.id
            }
          }
        )
        .then((response) => {
          console.log('Garden data:', response.data)
          setGarden(response.data)
          const sortedPlants = (response.data.plants || []).sort(
            (a: Plant, b: Plant) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          console.log('Sorted plants:', sortedPlants)
          setPlants(sortedPlants)
          setLoading(false)
        })
        .catch((error) => {
          console.error('Error fetching garden:', error)
          setLoading(false)
        })
    } else if (isLoaded) {
      console.log('User is loaded but not signed in')
      setLoading(false)
    }
  }, [isLoaded, isSignedIn, user])

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
            <p className="text-lg text-[#6A6A6A]">{t('noPlantsInGarden')}</p>
            <Link
              href={`/${locale}/scan`}
              className="text-[#4CAF50] hover:underline"
            >
              {t('scanPlant')}
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
      <main className="flex-1 mt-14 px-4 md:px-6 py-12 md:py-24 lg:py-12 bg-[#F0F8F0]">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {plants.map((plant) => (
              <div
                key={plant._id}
                className="relative overflow-hidden transition-transform duration-300 ease-in-out rounded-lg shadow-lg group hover:shadow-xl hover:-translate-y-2 flex flex-col justify-between"
                style={{ borderRadius: '10px', minHeight: '300px' }}
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
                        {locale === 'en'
                          ? plant.wateringFrequency === 1
                            ? 'time a week'
                            : 'times a week'
                          : plant.wateringFrequency === 1
                          ? 'раз в неделю'
                          : 'раза в неделю'}
                      </p>
                    </div>
                    {plant.fertilizer && plant.fertilizerFrequency && (
                      <div className="flex items-center gap-2">
                        <svg
                          fill="#4CAF50"
                          width="24"
                          height="24"
                          version="1.1"
                          id="Capa_1"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          viewBox="0 0 415.325 415.325"
                          xmlSpace="preserve"
                        >
                          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                          <g
                            id="SVGRepo_tracerCarrier"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></g>
                          <g id="SVGRepo_iconCarrier">
                            <g>
                              <g>
                                <g>
                                  <path d="M279.967,194.722c-0.523-1.479-1.68-2.537-3.051-3.023l0.007-0.021c-14.108-4.997-33.258,5.555-42.348,14.644 c-8.169,8.167-9.94,20.086-4.947,28.667l-16.981,17.018v-32.85c11.587-2.629,20.342-14.208,20.342-28.055 c0-17.762-8.865-41.161-23.189-47.991c-1.417-0.675-2.98-0.605-4.294,0.02l-0.009-0.02 c-14.326,6.829-23.193,30.228-23.193,47.991c0,13.847,8.756,25.425,20.344,28.054v32.586l-16.851-16.885 c4.991-8.58,3.218-20.498-4.948-28.665c-9.088-9.088-28.238-19.64-42.348-14.643l0.008,0.021 c-1.371,0.487-2.527,1.544-3.051,3.022c-5.002,14.114,5.551,33.261,14.641,42.35c5.129,5.129,11.74,7.745,18.076,7.745 c3.733,0,7.359-0.932,10.54-2.77l23.933,23.98v12.52c0,2.761,2.238,5,5,5c2.762,0,5-2.239,5-5v-12.254l24.064-24.115 c3.181,1.838,6.806,2.768,10.539,2.768c6.335,0,12.948-2.616,18.076-7.744C274.415,227.985,284.967,208.837,279.967,194.722z M157.168,229.87c-7.467-7.465-13.922-20.844-12.854-29.463c8.618-1.068,21.996,5.39,29.463,12.855 c4.078,4.078,5.635,9.557,4.45,14.011l-12.222-12.247c-1.95-1.956-5.115-1.958-7.071-0.007c-1.954,1.95-1.958,5.115-0.007,7.07 l12.216,12.241C166.696,235.498,161.235,233.939,157.168,229.87z M192.303,191.101c0-13.453,6.201-31.28,15.344-37.69 c9.143,6.411,15.342,24.238,15.342,37.69c0,8.14-4.333,15.058-10.342,17.582V185.71c0-2.761-2.238-5-5-5c-2.762,0-5,2.239-5,5 v22.973C196.637,206.158,192.303,199.24,192.303,191.101z M258.254,230c-4.067,4.068-9.525,5.628-13.973,4.461l12.345-12.371 c1.951-1.955,1.947-5.121-0.007-7.07c-1.956-1.951-5.121-1.948-7.071,0.007l-12.352,12.378c-1.186-4.453,0.371-9.933,4.45-14.012 c7.466-7.465,20.841-13.925,29.462-12.856C272.177,209.157,265.721,222.536,258.254,230z"></path>
                                  <g>
                                    <path d="M207.647,303.12c-52.664,0-95.51-42.845-95.51-95.508c0-52.663,42.846-95.508,95.51-95.508 c52.664,0,95.51,42.845,95.51,95.508C303.156,260.276,260.311,303.12,207.647,303.12z M207.647,122.104 c-47.15,0-85.51,38.359-85.51,85.508c0,47.15,38.359,85.508,85.51,85.508s85.51-38.358,85.51-85.508 C293.156,160.463,254.797,122.104,207.647,122.104z"></path>
                                  </g>
                                </g>
                                <path d="M342.322,360.331c-6.002-2.865-11.791-3.016-16.395-2.297c24.244-98.549,24.246-202.271,0.006-300.822 c1.424,0.222,2.953,0.366,4.578,0.366c3.623,0,7.67-0.688,11.811-2.664c13.109-6.256,21.977-22.791,26.039-49.193 c0.744-4.836-4.037-5.899-5.715-5.699l-0.004-0.02c-26.385,4.169-42.936,12.93-49.191,26.039c-2.156,4.519-2.762,8.913-2.63,12.78 c-5.389-2.141-12.839-4.234-23.122-6.147c-21.43-3.987-49.859-6.183-80.053-6.183c-30.193,0-58.623,2.196-80.055,6.183 c-10.275,1.912-17.722,4.003-23.109,6.143c0.13-3.865-0.486-8.261-2.641-12.775C95.586,12.932,79.035,4.172,52.651,0.002 l-0.004,0.021c-3.531-0.074-6.146,2.97-5.715,5.698c4.168,26.386,12.93,42.937,26.039,49.193 c4.141,1.977,8.188,2.664,11.811,2.664c1.624,0,3.153-0.143,4.576-0.364c-24.238,98.55-24.236,202.271,0.006,300.82 c-4.604-0.718-10.408-0.597-16.393,2.297c-15.781,7.632-26.102,43.53-26.039,50.754c0.021,2.493,2.514,4.219,4.932,4.219 c5.063,0,43.512-10.123,49.978-26.1c1.879-4.643,2.773-8.927,2.641-12.797c5.389,2.14,12.834,4.23,23.109,6.143 c21.432,3.988,49.861,6.184,80.053,6.184c30.193,0,58.623-2.195,80.055-6.184c10.278-1.912,17.727-4.004,23.114-6.145 c-0.134,3.871,0.48,8.275,2.638,12.799c6.256,13.109,22.852,21.594,49.191,26.039c1.082,0.183,1.561,0,1.561,0 c2.728-0.432,4.59-2.992,4.158-5.719C364.194,383.138,355.432,366.587,342.322,360.331z M322.477,30.348 c4.182-8.762,16.131-15.339,34.727-19.193c-3.838,18.513-10.373,30.455-19.08,34.682c-6.642,3.224-13.031,1.226-15.682,0.104 C321.352,43.323,319.351,36.899,322.477,30.348z M132.43,41.966c20.475-3.531,47.186-5.475,75.217-5.475 c28.029,0,54.742,1.944,75.215,5.476c23.635,4.076,30.822,8.912,31.707,10.553c0.001,0.005,0.002,0.01,0.003,0.016 c0.005,0.111,1.286,5.547,1.841,7.813c-5.895-2.387-14.494-4.761-27.098-6.913c-22.117-3.777-51.121-5.857-81.67-5.857 c-30.529,0-59.52,2.078-81.635,5.852c-12.625,2.154-21.231,4.53-27.131,6.917c0.555-2.265,1.843-7.822,1.844-7.827 C101.608,50.878,108.797,46.042,132.43,41.966z M77.277,45.889c-8.762-4.181-15.339-16.131-19.193-34.727 C76.596,15,88.537,21.534,92.764,30.24c3.23,6.652,1.222,13.052,0.107,15.683C90.256,47.013,83.83,49.017,77.277,45.889z M92.817,384.898c-4.182,8.761-16.131,15.339-34.726,19.191c3.838-18.513,10.372-30.453,19.079-34.682 c6.641-3.225,13.029-1.228,15.682-0.104C93.942,371.92,95.944,378.346,92.817,384.898z M314.569,362.704 c-0.885,1.643-8.074,6.479-31.709,10.555c-20.473,3.529-47.186,5.475-75.215,5.475s-54.74-1.945-75.213-5.475 c-23.635-4.076-30.824-8.912-31.709-10.555c-0.001-0.006-1.285-5.562-1.84-7.827c5.895,2.387,14.493,4.761,27.096,6.913 c22.117,3.777,51.123,5.858,81.67,5.858c30.527,0,59.52-2.078,81.635-5.854c12.621-2.153,21.227-4.528,27.125-6.915 C315.854,357.144,314.569,362.698,314.569,362.704z M286.1,352.189c-21.377,3.52-49.238,5.459-78.451,5.459 c-29.215,0-57.074-1.94-78.451-5.457c-25.246-4.156-32.707-9.156-33.422-10.639c-0.002-0.006-0.006-0.012-0.007-0.018 c-19.464-88.021-19.46-179.796-0.001-267.818c0.871-1.626,8.429-6.566,33.424-10.681c21.377-3.52,49.24-5.458,78.453-5.458 c29.215,0,57.076,1.938,78.451,5.457c25.195,4.147,32.676,9.134,33.416,10.628c19.469,88.025,19.479,179.806,0.02,267.832 C318.693,343.11,311.158,348.063,286.1,352.189z M322.529,385.005c-3.23-6.653-1.222-13.054-0.107-15.685 c2.615-1.089,9.041-3.092,15.594,0.036c8.762,4.18,15.339,16.129,19.193,34.726C338.697,400.245,326.756,393.71,322.529,385.005z"></path>
                              </g>
                            </g>
                          </g>
                        </svg>
                        <p className="text-[#6A6A6A]">
                          {locale === 'en'
                            ? plant.fertilizerEn
                            : plant.fertilizer}
                          ,{' '}
                          {locale === 'en'
                            ? plant.fertilizerFrequencyEn
                            : plant.fertilizerFrequency}
                        </p>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <svg
                        height="30px"
                        width="30px"
                        version="1.1"
                        id="Layer_1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        viewBox="0 0 512.001 512.001"
                        xmlSpace="preserve"
                        fill="#000000"
                      >
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          {' '}
                          <path
                            style={{ fill: '#E8E6D9' }}
                            d="M351.912,158.284l-125.876-5.994c-2.315-0.11-4.575,0.732-6.253,2.332 c-1.669,1.588-2.628,3.817-2.628,6.135v23.976c0,4.218,3.103,7.796,7.277,8.391l167.835,23.976c2.692,0.385,5.344-0.547,7.195-2.398 c0.633-0.633,1.172-1.372,1.587-2.203c1.632-3.264,0.992-7.204-1.588-9.785l-41.959-41.959 C356.012,159.267,354.018,158.385,351.912,158.284z"
                          ></path>{' '}
                          <path
                            style={{ fill: '#11BBA3' }}
                            d="M433.971,101.676c-13.025,0-26.049-4.958-35.965-14.874l0,0c-19.83-19.831-19.83-52.098,0-71.929 c19.832-19.831,52.097-19.832,71.931,0c19.83,19.831,19.83,52.098,0,71.929C460.02,96.718,446.996,101.676,433.971,101.676z M409.995,74.815c13.222,13.221,34.733,13.22,47.953,0c13.221-13.221,13.221-34.732,0-47.953c-13.222-13.222-34.733-13.221-47.953,0 C396.775,40.083,396.775,61.594,409.995,74.815L409.995,74.815z"
                          ></path>{' '}
                          <g>
                            {' '}
                            <path
                              style={{ fill: '#72CCC5' }}
                              d="M405.216,55.271L405.216,55.271l-31.9-28.355c-3.145-2.795-7.925-2.654-10.899,0.32l-83.918,83.918 c-2.975,2.975-3.116,7.754-0.32,10.899l28.355,31.9l0,0l55.347-47.93L405.216,55.271z"
                            ></path>{' '}
                            <path
                              style={{ fill: '#72CCC5' }}
                              d="M481.211,122.821L443.297,89.12l0,0l-55.27,48.912l-47.643,54l0,0l33.702,37.914 c2.992,3.366,8.372,3.527,11.559,0.339l95.906-95.906C484.738,131.193,484.577,125.814,481.211,122.821z"
                            ></path>{' '}
                          </g>{' '}
                          <path
                            style={{ fill: '#11BBA3' }}
                            d="M307.216,127.921c-7.701-7.701-14.808-15.772-21.336-24.148l-7.379,7.379 c-2.975,2.975-3.116,7.754-0.32,10.899l95.906,107.893c2.993,3.366,8.372,3.527,11.559,0.339l35.816-35.816 C379.618,182.974,340.094,160.8,307.216,127.921z"
                          ></path>{' '}
                          <polygon
                            style={{ fill: '#E8E6D9' }}
                            points="405.216,55.271 306.535,153.953 340.383,192.033 443.297,89.12 "
                          ></polygon>{' '}
                          <path
                            style={{ fill: '#72CCC5' }}
                            d="M199.599,130.891c-4.327,0.001-7.947,3.62-7.948,7.948v67.816c0,4.389,3.558,7.947,7.947,7.947 c10.75,0,21.33-4.266,29.029-11.707c0.171-0.164,0.337-0.328,0.504-0.497c12-12,15.635-30.374,9.024-45.956 C231.671,141.161,216.176,130.892,199.599,130.891z"
                          ></path>{' '}
                          <path
                            style={{ fill: '#DDDAC5' }}
                            d="M320.335,140.152l-13.802,13.802l33.85,38.081l22.017-22.017 C347.649,161.626,333.548,151.672,320.335,140.152z"
                          ></path>{' '}
                          <path
                            style={{ fill: '#11BBA3' }}
                            d="M191.652,200.612v6.043c0,4.389,3.558,7.947,7.947,7.947c10.75,0,21.33-4.266,29.029-11.707 c0.171-0.164,0.337-0.328,0.504-0.497c4.937-4.937,8.455-10.954,10.429-17.411C225.674,196.2,208.55,201.412,191.652,200.612z"
                          ></path>{' '}
                          <g>
                            {' '}
                            <path
                              style={{ fill: '#198A82' }}
                              d="M148.77,261.247c-6.406,0-10.167-7.508-6.405-12.643c5.237-7.15,11.087-13.945,17.385-20.196 c3.115-3.091,8.147-3.072,11.238,0.043c3.092,3.115,3.072,8.147-0.042,11.238c-5.711,5.667-11.013,11.825-15.759,18.305 C153.631,260.121,151.217,261.247,148.77,261.247z"
                            ></path>{' '}
                            <path
                              style={{ fill: '#198A82' }}
                              d="M112.112,259.255c-6.039,0-9.885-6.765-6.857-11.955c4.432-7.593,9.416-14.969,14.812-21.923 c2.69-3.468,7.684-4.095,11.15-1.406c3.467,2.691,4.096,7.683,1.405,11.15c-4.97,6.404-9.56,13.199-13.642,20.191 C117.505,257.844,114.845,259.255,112.112,259.255z M143.205,219.187c-6.971,0-10.525-8.715-5.587-13.598 c6.251-6.181,12.973-12.01,19.98-17.323c3.5-2.653,8.482-1.966,11.134,1.531c2.651,3.498,1.966,8.482-1.531,11.134 c-6.456,4.894-12.65,10.263-18.408,15.959C147.245,218.423,145.224,219.187,143.205,219.187z"
                            ></path>{' '}
                            <path
                              style={{ fill: '#198A82' }}
                              d="M72.088,257.921c-5.754,0-9.636-6.197-7.168-11.37c3.76-7.882,8.009-15.645,12.626-23.073 c2.318-3.728,7.219-4.87,10.945-2.553c3.728,2.318,4.871,7.218,2.553,10.946c-4.308,6.929-8.271,14.17-11.778,21.522 C77.903,256.251,75.056,257.921,72.088,257.921z M98.888,214.817c-6.529,0-10.254-7.767-6.238-12.865 c5.4-6.856,11.247-13.491,17.382-19.724c3.078-3.13,8.11-3.167,11.238-0.088c3.127,3.079,3.167,8.11,0.088,11.238 c-5.725,5.817-11.184,12.01-16.224,18.409C103.568,213.778,101.24,214.817,98.888,214.817z M134.503,178.654 c-3.468,0-6.618-2.335-7.617-5.658c-0.917-3.052,0.125-6.444,2.598-8.455c6.778-5.513,13.938-10.704,21.278-15.431 c3.691-2.375,8.608-1.311,10.984,2.379c2.376,3.69,1.311,8.608-2.379,10.984c-6.849,4.411-13.53,9.256-19.856,14.399 C138.038,178.072,136.264,178.654,134.503,178.654z"
                            ></path>{' '}
                          </g>{' '}
                          <path
                            style={{ fill: '#66BF00' }}
                            d="M77.408,269.796c-2.928-4.023-8.998-4.339-12.33-0.645c-5.583,6.192-33.48,38.009-34.435,56.26 c-0.527,10.035,2.886,19.672,9.609,27.139c6.724,7.467,15.953,11.869,25.986,12.394c0.674,0.036,1.346,0.054,2.014,0.054 c9.303,0,18.159-3.392,25.124-9.664c7.467-6.723,11.869-15.951,12.394-25.985C106.729,311.097,82.312,276.539,77.408,269.796z"
                          ></path>{' '}
                          <path
                            style={{ fill: '#58AB23' }}
                            d="M76.2,355.403c-0.67,0-1.341-0.018-2.014-0.054c-10.035-0.526-19.263-4.927-25.986-12.394 s-10.135-17.105-9.609-27.139c0.639-12.188,13.285-30.416,23.284-43.032c-9.178,10.606-30.399,36.748-31.232,52.628 c-0.527,10.035,2.886,19.672,9.609,27.139c6.724,7.467,15.953,11.869,25.986,12.394c0.674,0.036,1.346,0.054,2.014,0.054 c9.303,0,18.159-3.392,25.124-9.664c2.976-2.68,5.457-5.763,7.408-9.132C93.903,352.172,85.268,355.403,76.2,355.403z"
                          ></path>{' '}
                          <path
                            style={{ fill: '#66BF00' }}
                            d="M167.993,313.749c-1.94-4.573-7.787-6.259-11.866-3.41c-6.835,4.774-41.188,29.478-46.235,47.044 c-5.729,19.935,5.828,40.814,25.762,46.544c3.459,0.994,6.944,1.468,10.374,1.468c16.348,0,31.434-10.753,36.169-27.23 C187.246,360.598,171.251,321.424,167.993,313.749z"
                          ></path>{' '}
                          <path
                            style={{ fill: '#58AB23' }}
                            d="M157.486,395.085c-3.43,0-6.915-0.473-10.374-1.468c-19.935-5.729-31.493-26.608-25.762-46.544 c2.001-6.964,8.612-15.047,16.283-22.568c-11.679,9.761-24.773,22.551-27.74,32.879c-5.729,19.935,5.828,40.814,25.762,46.544 c3.459,0.994,6.944,1.468,10.374,1.468c12.02,0,23.352-5.818,30.395-15.446C170.749,393.252,164.226,395.085,157.486,395.085z"
                          ></path>{' '}
                          <path
                            style={{ fill: '#508913' }}
                            d="M158.22,350.219c-0.189-4.386-3.893-7.768-8.281-7.599c-4.385,0.189-7.787,3.896-7.599,8.281 c0.019,0.424,1.174,40.755-45.303,61.318c-2.665-8.694-5.656-16.737-8.506-24.398c-8.584-23.074-15.996-43.003-12.707-70.919 c0.514-4.359-2.603-8.308-6.962-8.822c-4.366-0.509-8.31,2.603-8.822,6.963c-3.737,31.723,4.681,54.357,13.595,78.32 c7.543,20.28,15.344,41.251,15.961,69.743c0.093,4.33,3.632,7.776,7.942,7.776c0.058,0,0.117,0,0.175-0.002 c4.389-0.094,7.869-3.729,7.773-8.117c-0.28-12.917-1.94-24.457-4.317-35.021c29.518-12.335,43.46-31.651,49.99-46.09 C158.753,364.857,158.246,350.808,158.22,350.219z"
                          ></path>{' '}
                          <path
                            style={{ fill: '#B9873C' }}
                            d="M98.406,453.015c-31.88,0-59.175,19.561-70.578,47.331c-2.282,5.559,1.856,11.655,7.866,11.655 h125.426c6.009,0,10.148-6.096,7.866-11.655C157.581,472.575,130.285,453.015,98.406,453.015z"
                          ></path>{' '}
                        </g>
                      </svg>
                      <p className="text-[#6A6A6A]">
                        {t('nextWateredDate')} :{' '}
                        {format(plant.nextWateringDate, 'yyyy-MM-dd')}
                      </p>
                    </div>
                  </div>
                  <Link
                    href={`/${locale}/garden/plant/${plant._id}`}
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

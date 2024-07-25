'use client'
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import Header from '@/components/Header/index'
import Footer from '@/components/Footer/footer'
import Image from 'next/image'
import axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress'
import WateringCalendar from '@/components/WateringCalendar/index'
import { useTranslation } from '@/context/TranslationContext'

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
  wateringFrequency: number
  lastWateredDate: Date
  image: string
  fertilizer: string
  fertilizerEn: string
  fertilizerFrequency: string
  fertilizerFrequencyEn: string
}

interface Garden {
  _id: string
  name: string
  plants: Plant[]
}

export default function Component() {
  const { id } = useParams()
  const [plantInfo, setPlantInfo] = useState<Plant | null>(null)
  const { locale, t } = useTranslation()

  useEffect(() => {
    if (id) {
      const plantId = Array.isArray(id) ? id[0] : id
      fetchPlantInfo(plantId)
    }
  }, [id])

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

  if (!plantInfo) {
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
      <main className="flex-1 mt-14 px-4 md:px-6 py-12 md:py-24 lg:py-16 bg-[#F0F8F0]">
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
                  {locale === 'en' ? plantInfo.nameEn : plantInfo.name}
                </h1>
                <p className="max-w-[600px] text-[#6A6A6A] md:text-xl">
                  {locale === 'en'
                    ? plantInfo.descriptionEn
                    : plantInfo.description}
                </p>
              </div>
              <div className="grid gap-2">
                <h2 className="text-xl font-bold tracking-tighter sm:text-3xl md:text-4xl text-[#4CAF50]">
                  {t('careRecommendationsOne')}:
                </h2>
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
                      {t('soilComposition')}
                    </h3>
                    <p className="text-[#6A6A6A]">
                      {locale === 'en'
                        ? plantInfo.soilCompositionEn
                        : plantInfo.soilComposition}
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
                      {t('homeTemperature')}
                    </h3>
                    <p className="text-[#6A6A6A]">
                      {locale === 'en'
                        ? plantInfo.homeTemperatureEn
                        : plantInfo.homeTemperature}
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
                      {t('sunlightExposure')}
                    </h3>
                    <p className="text-[#6A6A6A]">
                      {locale === 'en'
                        ? plantInfo.sunlightExposureEn
                        : plantInfo.sunlightExposure}
                    </p>
                  </div>
                </div>
                {plantInfo.fertilizer && plantInfo.fertilizerFrequency && (
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
                    <div>
                      <h3 className="font-semibold text-[#4CAF50]">
                        {t('fertilizer')}
                      </h3>
                      <p className="text-[#6A6A6A]">
                        {locale === 'en'
                          ? plantInfo.fertilizerEn
                          : plantInfo.fertilizer}
                        ,{' '}
                        {locale === 'en'
                          ? plantInfo.fertilizerFrequencyEn
                          : plantInfo.fertilizerFrequency}
                      </p>
                    </div>
                  </div>
                )}
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
                  <div>
                    <h3 className="font-semibold text-[#4CAF50]">
                      {t('wateringFrequency')}
                    </h3>
                    <p className="text-[#6A6A6A]">
                      {plantInfo.wateringFrequency}{' '}
                      {locale === 'en'
                        ? plantInfo.wateringFrequency === 1
                          ? 'time a week'
                          : 'times a week'
                        : plantInfo.wateringFrequency === 1
                        ? 'раз в неделю'
                        : 'раза в неделю'}
                    </p>
                  </div>
                </div>
                <div className="flex justify-center md:justify-start">
                  <WateringCalendar
                    wateringFrequency={plantInfo.wateringFrequency}
                    lastWateredDate={new Date(plantInfo.lastWateredDate)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer bgColor="bg-[#F0F8F0]" />
    </div>
  )
}

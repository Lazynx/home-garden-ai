// 'use client'

// import { useState } from 'react'
// import { useRouter } from 'next/navigation'
// import Link from 'next/link'
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import Header from '@/components/Header/index'
// import Footer from '@/components/Footer/footer'

// export default function Component() {
//   const [file, setFile] = useState(null)
//   const [fileUrl, setFileUrl] = useState(null)
//   const [loading, setLoading] = useState(false)
//   const router = useRouter()

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0]
//     setFile(selectedFile)
//     setFileUrl(URL.createObjectURL(selectedFile))
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     if (!file) {
//       alert('Please select a file to upload.')
//       return
//     }

//     setLoading(true)

//     const formData = new FormData()
//     formData.append('plant', file)

//     try {
//       const response = await fetch('http://localhost:8000/api/plants/create', {
//         method: 'POST',
//         body: formData
//       })

//       if (!response.ok) {
//         throw new Error('Failed to upload file')
//       }

//       const data = await response.json()
//       router.push(`/plants/${data._id}`)
//     } catch (error) {
//       console.error('Error uploading file:', error)
//       alert('Error uploading file. Please try again.')
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="flex flex-col min-h-[100dvh]">
//       <Header />
//       <main className="flex-1 mt-14 px-4 md:px-6 py-12 md:py-24 lg:py-32 bg-[#F0F8F0]">
//         <div className="container">
//           <div className="flex flex-col items-center justify-center space-y-6">
//             <div className="space-y-2">
//               {/* <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-[#4CAF50]">
//                 Grow Your Home Garden with Ease
//               </h1>
//               <p className="max-w-[600px] text-[#6A6A6A] md:text-xl">
//                 Our HomeGarden AI app is your personal plant companion,
//                 providing tailored care recommendations and insights to help
//                 your indoor and outdoor plants thrive.
//               </p> */}
//               <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-[#4CAF50]">
//                 Преобразите свой{' '}
//                 <span className="text-[#0A6847]">домашний сад</span> с легкостью
//               </h1>
//               <p className="max-w-[600px] text-[#6A6A6A] md:text-xl mx-auto">
//                 Не упустите ни одной детали в уходе за растениями.
//               </p>
//             </div>
//             <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
//               <div>
//                 <label
//                   htmlFor="file"
//                   className="block text-sm font-medium text-[#4CAF50]"
//                 >
//                   {/* Upload a photo of your plant */}
//                   Загрузите фото вашего растения
//                 </label>
//                 <div className="mt-1">
//                   <div
//                     className="flex items-center justify-center px-6 pt-5 pb-6 border-2 border-[#4CAF50] border-dashed rounded-md cursor-pointer hover:bg-white transition-background"
//                     style={{ borderRadius: '5px' }}
//                     onClick={() => document.getElementById('file').click()}
//                   >
//                     {file ? (
//                       <div className="flex items-center space-x-2">
//                         <svg
//                           className="h-6 w-6 text-[#4CAF50]"
//                           xmlns="http://www.w3.org/2000/svg"
//                           width="24"
//                           height="24"
//                           viewBox="0 0 24 24"
//                           fill="none"
//                           stroke="currentColor"
//                           strokeWidth="2"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                         >
//                           <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
//                           <polyline points="17 8 12 3 7 8" />
//                           <line x1="12" x2="12" y1="3" y2="15" />
//                         </svg>
//                         <span className="truncate max-w-xs text-[#4CAF50]">
//                           {file.name}
//                         </span>
//                       </div>
//                     ) : (
//                       <div className="space-y-1 text-center">
//                         <svg
//                           className="mx-auto h-12 w-12 text-[#4CAF50]"
//                           xmlns="http://www.w3.org/2000/svg"
//                           width="24"
//                           height="24"
//                           viewBox="0 0 24 24"
//                           fill="none"
//                           stroke="currentColor"
//                           strokeWidth="2"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                         >
//                           <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
//                           <polyline points="17 8 12 3 7 8" />
//                           <line x1="12" x2="12" y1="3" y2="15" />
//                         </svg>
//                         <div className="flex text-sm text-[#4CAF50]">
//                           <label
//                             htmlFor="file"
//                             className="relative cursor-pointer rounded-md font-medium text-[#4CAF50] hover:text-[#3D8E40] focus-within:outline-none focus-within:ring-2 focus-within:ring-[#4CAF50] focus-within:ring-offset-2"
//                           >
//                             {/* <span>Upload a file</span> */}
//                             <span>Загрузите файл</span>
//                             <Input
//                               type="file"
//                               id="file"
//                               onChange={handleFileChange}
//                               className="sr-only"
//                             />
//                           </label>
//                         </div>
//                         <p className="text-xs text-[#6A6A6A]">PNG, JPG</p>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//               <Button
//                 type="submit"
//                 className="w-full rounded-md bg-[#4CAF50] px-4 py-2 text-white transition-colors hover:bg-[#3D8E40] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
//                 disabled={loading}
//                 style={{ borderRadius: '5px' }}
//               >
//                 {/* {loading ? 'Uploading...' : 'Get Plant Care Recommendations'} */}
//                 {loading ? 'Загрузка...' : 'Получить рекомендации'}
//               </Button>
//             </form>
//           </div>
//         </div>
//       </main>
//       <Footer />
//     </div>
//   )
// }
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Header from '@/components/Header/index'
import Footer from '@/components/Footer/footer'
import axios from 'axios'

export default function Component() {
  const [file, setFile] = useState<File | null>(null)
  const [fileUrl, setFileUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null
    setFile(selectedFile)
    setFileUrl(selectedFile ? URL.createObjectURL(selectedFile) : null)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!file) {
      alert('Please select a file to upload.')
      return
    }

    setLoading(true)

    const formData = new FormData()
    formData.append('plant', file)

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/plants/create`,
        formData
      )

      if (response.status !== 201) {
        throw new Error('Failed to upload file')
      }

      const data = response.data
      router.push(`/plants/${data._id}`)
    } catch (error) {
      console.error('Error uploading file:', error)
      alert('Error uploading file. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <Header />
      <main className="flex-1 mt-14 px-4 md:px-6 py-12 md:py-24 lg:py-32 bg-gradient-to-r from-[#bce0bc] via-[#E0F0E0] to-[#F0F8F0]">
        <div className="container">
          <div className="flex flex-col items-center justify-center space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-[#4CAF50]">
                Преобразите свой{' '}
                <span className="text-[#0A6847]">домашний сад</span> с легкостью
              </h1>
              <p className="max-w-[600px] text-[#6A6A6A] md:text-xl mx-auto">
                Не упустите ни одной детали в уходе за растениями.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
              <div>
                <label
                  htmlFor="file"
                  className="block text-sm font-medium text-[#4CAF50]"
                >
                  Загрузите фото вашего растения
                </label>
                <div className="mt-1">
                  <div
                    className="flex items-center justify-center px-6 pt-5 pb-6 border-2 border-[#4CAF50] border-dashed rounded-md cursor-pointer hover:bg-white transition-background"
                    style={{ borderRadius: '5px' }}
                    onClick={() => document.getElementById('file')?.click()}
                  >
                    {file ? (
                      <div className="flex items-center space-x-2">
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
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <polyline points="17 8 12 3 7 8" />
                          <line x1="12" x2="12" y1="3" y2="15" />
                        </svg>
                        <span className="truncate max-w-xs text-[#4CAF50]">
                          {file.name}
                        </span>
                      </div>
                    ) : (
                      <div className="space-y-1 text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-[#4CAF50]"
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
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <polyline points="17 8 12 3 7 8" />
                          <line x1="12" x2="12" y1="3" y2="15" />
                        </svg>
                        <div className="flex text-sm text-[#4CAF50]">
                          <label
                            htmlFor="file"
                            className="relative cursor-pointer rounded-md font-medium text-[#4CAF50] hover:text-[#3D8E40] focus-within:outline-none focus-within:ring-2 focus-within:ring-[#4CAF50] focus-within:ring-offset-2"
                          >
                            <span>Загрузите файл</span>
                            <Input
                              type="file"
                              id="file"
                              onChange={handleFileChange}
                              className="sr-only"
                            />
                          </label>
                        </div>
                        <p className="text-xs text-[#6A6A6A]">PNG, JPG</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <Button
                type="submit"
                className="w-full rounded-md bg-[#4CAF50] px-4 py-2 text-white transition-colors hover:bg-[#3D8E40] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                disabled={loading}
                style={{ borderRadius: '5px' }}
              >
                {loading ? 'Загрузка...' : 'Получить рекомендации'}
              </Button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

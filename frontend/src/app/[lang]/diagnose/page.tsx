'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useDropzone } from 'react-dropzone'
import axios from 'axios'
import Image from 'next/image'
import Header from '@/components/Header/index'
import Footer from '@/components/Footer/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useTranslation } from '@/context/TranslationContext'

export default function DiseaseDetection() {
  const [file, setFile] = useState<File | null>(null)
  const [fileUrl, setFileUrl] = useState<string | null>(null)
  const [loadingMessage, setLoadingMessage] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState<string[]>([])
  const [questionsEn, setQuestionsEn] = useState<string[]>([])
  const [userAnswer, setUserAnswer] = useState<string>('')
  const [initialDiagnosis, setInitialDiagnosis] = useState<string | null>(null)
  const [initialDiagnosisEn, setInitialDiagnosisEn] = useState<string | null>(
    null
  )
  const [finalDiagnosis, setFinalDiagnosis] = useState<string | null>(null)
  const [finalDiagnosisEn, setFinalDiagnosisEn] = useState<string | null>(null)
  const [previousContext, setPreviousContext] = useState<any>(null)
  const { locale, t } = useTranslation()
  const router = useRouter()

  const loadingMessages: string[] = [
    t('uploadingFile') as string,
    t('processingPhoto') as string,
    t('identifyingPlant') as string,
    t('gettingServerResponse') as string,
    t('pleaseWait') as string,
    t('loading') as string
  ]

  useEffect(() => {
    if (loading) {
      let index = 0
      const intervalId = setInterval(() => {
        setLoadingMessage(loadingMessages[index])
        if (index < loadingMessages.length - 1) {
          index++
        }
      }, 2000)

      return () => clearInterval(intervalId)
    }
  }, [loading])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null
    setFile(selectedFile)
    setFileUrl(selectedFile ? URL.createObjectURL(selectedFile) : null)
  }

  const onDrop = (acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0]
    setFile(selectedFile)
    setFileUrl(URL.createObjectURL(selectedFile))
  }

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: false
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!file) {
      alert('Please select a file to upload.')
      return
    }

    setLoading(true)
    setLoadingMessage(t('loading') as string)

    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/diseases/diagnose`,
        formData
      )

      if (response.status !== 200) {
        throw new Error('Failed to upload file')
      }

      const data = response.data
      console.log('Received data:', data)
      setQuestions(data.questions || [])
      setQuestionsEn(data.questionsEn || [])
      setPreviousContext(data.context)
      setInitialDiagnosis(data.initialDiagnosis || null)
      setInitialDiagnosisEn(data.initialDiagnosisEn || null)
    } catch (error) {
      console.error('Error uploading file:', error)
      alert('Error uploading file. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleAnswerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('handleAnswerSubmit called')
    console.log('Previous context:', previousContext)
    if (!userAnswer.trim() || !previousContext) {
      console.log('Error: No answer or context')
      alert('Please provide an answer to the question.')
      return
    }

    setLoading(true)

    try {
      console.log('Try called')
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/diseases/continue`,
        {
          userAnswer,
          previousContext
        }
      )

      if (response.status !== 200) {
        throw new Error('Failed to continue diagnosis')
      }

      const data = response.data
      console.log('Received continue data:', data)
      if (data.finalDiagnosis) {
        setFinalDiagnosis(data.finalDiagnosis)
        setFinalDiagnosisEn(data.finalDiagnosisEn)
      } else {
        setQuestions(data.questions || [])
        setQuestionsEn(data.questionsEn || [])
        setPreviousContext(data.context)
        setUserAnswer('') // Clear the answer input
      }
    } catch (error) {
      console.error('Error continuing diagnosis:', error)
      alert('Error continuing diagnosis. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <Header bgColor="bg-[#F0F8F0]" />
      <main className="flex-1 mt-14 px-4 md:px-6 py-12 md:py-24 lg:py-32 bg-[#F0F8F0]">
        <div className="container">
          <div className="flex flex-col items-center justify-center space-y-6">
            <div className="space-y-2 w-full max-w-md">
              {t('diagnoseHeroTitle')}
              <p className="max-w-[600px] text-[#6A6A6A] md:text-xl mx-auto">
                {t('diagnoseHeroSubtitle')}
              </p>
            </div>
            <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
              <div>
                <label
                  htmlFor="file"
                  className="block text-sm font-medium text-[#4CAF50]"
                >
                  {t('plantUpload')}
                </label>
                <div className="mt-1">
                  <div
                    {...getRootProps()}
                    className="flex items-center justify-center px-6 pt-5 pb-6 border-2 border-[#4CAF50] border-dashed rounded-md cursor-pointer hover:bg-white transition-background"
                    style={{ borderRadius: '5px' }}
                  >
                    <input {...getInputProps()} />
                    {file ? (
                      <div className="flex items-center space-x-2">
                        <Image
                          src={fileUrl || ''}
                          alt="Preview"
                          width={80}
                          height={80}
                          className="object-cover rounded-xl"
                        />
                        <span className="truncate max-w-xs text-[#4CAF50]">
                          {file.name}
                        </span>
                      </div>
                    ) : (
                      <div className="space-y-1 text-center">
                        <svg
                          className="mx-auto text-[#4CAF50]"
                          xmlns="http://www.w3.org/2000/svg"
                          width="34"
                          height="34"
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
                            <span>{t('fileUpload')}</span>
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
              {!questions.length && (
                <Button
                  type="submit"
                  className="w-full rounded-md bg-[#4CAF50] px-4 py-2 text-white transition-colors hover:bg-[#3D8E40] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  disabled={loading}
                  style={{ borderRadius: '5px' }}
                >
                  {loading ? loadingMessage : t('getDiagnose')}
                </Button>
              )}
            </form>
            {initialDiagnosis && (
              <div className="w-full max-w-md space-y-4">
                <h2 className="text-xl font-semibold text-[#4CAF50]">
                  {t('initialDiagnosis')}:
                </h2>
                <p className="text-[#6A6A6A]">
                  {locale === 'en' ? initialDiagnosisEn : initialDiagnosis}
                </p>
              </div>
            )}
            {questions && questions.length > 0 && !finalDiagnosis && (
              <form
                onSubmit={handleAnswerSubmit}
                className="w-full max-w-md space-y-4"
              >
                <h2 className="text-xl font-semibold text-[#4CAF50]">
                  {t('questions')}:
                </h2>
                <ul className="list-disc list-inside text-[#6A6A6A]">
                  {locale === 'en'
                    ? questionsEn.map((question, index) => (
                        <li key={index}>{question}</li>
                      ))
                    : questions.map((question, index) => (
                        <li key={index}>{question}</li>
                      ))}
                </ul>
                <textarea
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  className="w-full rounded-md border-2 border-[#4CAF50] p-2"
                  rows={4}
                  placeholder={t('yourAnswer') as string}
                ></textarea>
                <Button
                  type="submit"
                  className="w-full rounded-md bg-[#4CAF50] px-4 py-2 text-white transition-colors hover:bg-[#3D8E40] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  disabled={loading}
                  style={{ borderRadius: '5px' }}
                >
                  {loading ? t('loading') : t('submitAnswer')}
                </Button>
              </form>
            )}

            {finalDiagnosis && (
              <div className="w-full max-w-md space-y-4">
                <h2 className="text-xl font-semibold text-[#4CAF50]">
                  {t('finalDiagnosis')}:
                </h2>
                <p className="text-[#6A6A6A]">
                  {locale === 'en' ? finalDiagnosisEn : finalDiagnosis}
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer bgColor="bg-[#F0F8F0]" />
    </div>
  )
}

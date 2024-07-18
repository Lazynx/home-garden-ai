'use client'

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect
} from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import translations from './locales/translations'

interface TranslationContextProps {
  locale: string
  setLocale: (locale: string) => void
  t: (key: string) => string
}

const TranslationContext = createContext<TranslationContextProps | undefined>(
  undefined
)

export const TranslationProvider: React.FC<{
  children: ReactNode
  initialLocale: string
}> = ({ children, initialLocale }) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [locale, setLocale] = useState(initialLocale)

  useEffect(() => {
    const urlLocale = pathname.split('/')[1]
    if (urlLocale === 'en' || urlLocale === 'ru') {
      setLocale(urlLocale)
    }
  }, [pathname])

  const t = (key: string) => {
    if (translations[locale] && translations[locale][key]) {
      return translations[locale][key]
    }
    // Fallback to English if translation is missing
    if (translations['en'] && translations['en'][key]) {
      return translations['en'][key]
    }
    // Return the key if no translation is found
    return key
  }

  const changeLocale = (newLocale: string) => {
    setLocale(newLocale)
    const currentPathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, '')
    router.push(
      `/${newLocale}${currentPathWithoutLocale}${
        searchParams.toString() ? `?${searchParams.toString()}` : ''
      }`
    )
  }

  return (
    <TranslationContext.Provider value={{ locale, setLocale: changeLocale, t }}>
      {children}
    </TranslationContext.Provider>
  )
}

export const useTranslation = () => {
  const context = useContext(TranslationContext)
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider')
  }
  return context
}

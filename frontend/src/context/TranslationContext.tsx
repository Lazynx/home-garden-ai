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

interface Translations {
  [locale: string]: {
    [key: string]: string | JSX.Element
  }
}

interface TranslationContextProps {
  locale: string
  setLocale: (locale: string) => void
  t: (key: string) => string | JSX.Element
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
    const localeTranslations = (translations as Translations)[locale]
    const enTranslations = (translations as Translations)['en']

    if (localeTranslations && localeTranslations[key]) {
      return localeTranslations[key]
    }

    if (enTranslations && enTranslations[key]) {
      return enTranslations[key]
    }

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

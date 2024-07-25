'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Select from 'react-select'
import { FormControl } from '@mui/material'
import { useTranslation } from '@/context/TranslationContext'
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser
} from '@clerk/nextjs'

interface HeaderProps {
  bgColor: string
}

interface LanguageOption {
  value: string
  label: string
  icon: string
}

export default function Header({ bgColor }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { locale, setLocale, t } = useTranslation()
  const { user } = useUser()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [isMenuOpen])

  const handleLocaleChange = (selectedOption: LanguageOption | null) => {
    if (selectedOption) {
      setLocale(selectedOption.value)
    }
  }

  const languageOptions: LanguageOption[] = [
    { value: 'en', label: 'English', icon: '🇬🇧' },
    { value: 'ru', label: 'Русский', icon: '🇷🇺' }
  ]

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      minWidth: 120,
      borderColor: 'transparent',
      '&:hover': { borderColor: '#F0F8F0' },
      boxShadow: 'none',
      backgroundColor: 'transparent',
      cursor: 'pointer'
    }),
    menu: (provided: any) => ({
      ...provided,
      backgroundColor: '#F0F8F0'
    }),
    option: (provided: any) => ({
      ...provided,
      display: 'flex',
      alignItems: 'center',
      color: '#4CAF50',
      backgroundColor: '#F0F8F0',
      '&:hover': { backgroundColor: '#e6f4ea' }
    }),
    singleValue: (provided: any) => ({
      ...provided,
      display: 'flex',
      alignItems: 'center',
      backgroundColor: 'transparent',
      color: '#4CAF50'
    })
  }

  const formatOptionLabel = ({ label, icon }: LanguageOption) => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <span style={{ marginRight: 10 }}>{icon}</span>
      {label}
    </div>
  )

  const DotIcon = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        fill="currentColor"
      >
        <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" />
      </svg>
    )
  }

  return (
    <div>
      <header
        className={`fixed top-0 left-0 right-0 px-4 lg:px-6 h-14 flex items-center ${bgColor} z-50 transition-shadow duration-300 ${
          isScrolled ? 'shadow-md' : 'shadow-none'
        }`}
      >
        <div className="flex items-center justify-between w-full lg:w-auto">
          <SignedOut>
            <Link
              href={`/${locale}/`}
              className="flex items-center"
              prefetch={false}
            >
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
                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
              </svg>
              <span className="text-[#4CAF50] font-medium ml-2">
                HomeGardenAI
              </span>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden rounded-full ml-auto"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
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
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              ) : (
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
                  <line x1="4" x2="20" y1="12" y2="12" />
                  <line x1="4" x2="20" y1="6" y2="6" />
                  <line x1="4" x2="20" y1="18" y2="18" />
                </svg>
              )}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SignedOut>
          <SignedIn>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden rounded-full"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
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
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              ) : (
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
                  <line x1="4" x2="20" y1="12" y2="12" />
                  <line x1="4" x2="20" y1="6" y2="6" />
                  <line x1="4" x2="20" y1="18" y2="18" />
                </svg>
              )}
              <span className="sr-only">Toggle menu</span>
            </Button>
            <Link
              href={`/${locale}/`}
              className="flex items-center mx-auto lg:ml-0"
              prefetch={false}
            >
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
                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
              </svg>
              <span className="text-[#4CAF50] font-medium ml-2">
                HomeGardenAI
              </span>
            </Link>
            <div className="lg:hidden">
              <SignedIn>
                {/* <UserButton>
                  <UserButton.UserProfileLink
                    label="My garden"
                    url={`/${locale}/garden/${user?.id}`}
                    //   href={`/${locale}/garden/${user._id}`}
                    labelIcon=""
                  />
                </UserButton> */}
                <UserButton>
                  <UserButton.UserProfileLink
                    label="Homepage"
                    url="/"
                    labelIcon={<DotIcon />}
                  />
                </UserButton>
              </SignedIn>
            </div>
          </SignedIn>
        </div>
        <nav className="hidden lg:flex ml-auto gap-4 sm:gap-6 items-center">
          <Link
            href={`/${locale}/`}
            className="text-sm font-medium hover:underline underline-offset-4 text-[#4CAF50] mr-5"
            prefetch={false}
          >
            {t('home')}
          </Link>
          <Link
            href={`/${locale}/scan`}
            className="text-sm font-medium hover:underline underline-offset-4 text-[#4CAF50] mr-5"
            prefetch={false}
          >
            {t('scan')}
          </Link>
          <Link
            href={`/${locale}/diagnose`}
            className="text-sm font-medium hover:underline underline-offset-4 text-[#4CAF50] mr-5"
            prefetch={false}
          >
            {t('diagnose')}
          </Link>
          <Link
            href={`/${locale}/plants`}
            className="text-sm font-medium hover:underline underline-offset-4 text-[#4CAF50] mr-5"
            prefetch={false}
          >
            {t('garden')}
          </Link>
          <FormControl
            variant="outlined"
            className="mr-5"
            sx={{ backgroundColor: 'transparent' }}
          >
            <Select
              value={languageOptions.find((option) => option.value === locale)}
              onChange={(selectedOption: any) =>
                handleLocaleChange(selectedOption)
              }
              options={languageOptions}
              styles={customStyles}
              formatOptionLabel={formatOptionLabel}
              placeholder={t('language')}
            />
          </FormControl>
          <SignedOut>
            <Link
              href={`/${locale}/sign-in`}
              className="text-sm font-medium hover:underline underline-offset-4 text-[#4CAF50] mr-5"
              prefetch={false}
            >
              {t('login')}
            </Link>
          </SignedOut>
          <SignedIn>
            <Link
              href={`/${locale}/garden/${user?.id}`}
              className="text-sm font-medium hover:underline underline-offset-4 text-[#4CAF50] mr-5"
              prefetch={false}
            >
              {t('userGarden')}
            </Link>
            <UserButton />
          </SignedIn>
        </nav>
      </header>

      <div
        className={`fixed inset-0 z-40 bg-white overflow-hidden transition-transform duration-300 ${
          isMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
        style={{ backgroundColor: 'white' }}
      >
        <div className="flex items-center justify-between px-4 h-14 border-b">
          <Link
            href={`/${locale}/`}
            className="flex items-center"
            prefetch={false}
          >
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
              <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
              <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
            </svg>
            <span className="text-[#4CAF50] font-medium ml-2">
              HomeGardenAI
            </span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={() => setIsMenuOpen(false)}
          >
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
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
            <span className="sr-only">Close menu</span>
          </Button>
        </div>
        <div className="flex flex-col gap-4 p-6 pt-10 bg-white w-full h-full items-left">
          <Link
            href={`/${locale}/`}
            className="text-base font-bold text-[#4CAF50] hover:underline underline-offset-4"
            prefetch={false}
            onClick={() => setIsMenuOpen(false)}
          >
            {t('home')}
          </Link>
          <Link
            href={`/${locale}/scan`}
            className="text-base font-bold text-[#4CAF50] hover:underline underline-offset-4"
            prefetch={false}
            onClick={() => setIsMenuOpen(false)}
          >
            {t('scan')}
          </Link>
          <Link
            href={`/${locale}/diagnose`}
            className="text-base font-bold text-[#4CAF50] hover:underline underline-offset-4"
            prefetch={false}
            onClick={() => setIsMenuOpen(false)}
          >
            {t('diagnose')}
          </Link>
          <Link
            href={`/${locale}/plants`}
            className="text-base font-bold text-[#4CAF50] hover:underline underline-offset-4"
            prefetch={false}
            onClick={() => setIsMenuOpen(false)}
          >
            {t('garden')}
          </Link>
          <SignedOut>
            <Link
              href={`/${locale}/sign-in`}
              className="text-base font-bold text-[#4CAF50] hover:underline underline-offset-4"
              prefetch={false}
            >
              {t('login')}
            </Link>
          </SignedOut>
          <SignedIn>
            <Link
              href={`/${locale}/garden/${user?.id}`}
              className="text-base font-bold text-[#4CAF50] hover:underline underline-offset-4"
              prefetch={false}
            >
              {t('userGarden')}
            </Link>
          </SignedIn>
          <FormControl
            variant="outlined"
            className="mr-5"
            sx={{ backgroundColor: '#F0F8F0' }}
          >
            <Select
              value={languageOptions.find((option) => option.value === locale)}
              onChange={(selectedOption: any) =>
                handleLocaleChange(selectedOption)
              }
              options={languageOptions}
              styles={customStyles}
              formatOptionLabel={formatOptionLabel}
              placeholder={t('language')}
            />
          </FormControl>
        </div>
      </div>
    </div>
  )
}

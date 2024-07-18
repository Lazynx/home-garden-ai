'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/context/AuthContext'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import Select from 'react-select'
import { FormControl } from '@mui/material'
import { useTranslation } from '@/context/TranslationContext'

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
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { locale, setLocale, t } = useTranslation()

  const { user, logout } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

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

  const handleLogout = () => {
    logout()
    setIsMenuOpen(false)
  }

  const handleLocaleChange = (selectedOption: LanguageOption) => {
    setLocale(selectedOption.value)
  }

  const languageOptions: LanguageOption[] = [
    { value: 'en', label: 'English', icon: '🇬🇧' },
    { value: 'ru', label: 'Русский', icon: '🇷🇺' }
  ]

  const customStyles = {
    control: (provided) => ({
      ...provided,
      minWidth: 120,
      borderColor: '#F0F8F0',
      '&:hover': { borderColor: '#F0F8F0' },
      boxShadow: 'none',
      backgroundColor: '#F0F8F0',
      cursor: 'pointer'
    }),
    option: (provided) => ({
      ...provided,
      display: 'flex',
      alignItems: 'center',
      color: '#4CAF50',
      backgroundColor: '#F0F8F0',
      '&:hover': { backgroundColor: '#e6f4ea' }
    }),
    singleValue: (provided) => ({
      ...provided,
      display: 'flex',
      alignItems: 'center',
      backgroundColor: '#F0F8F0',
      color: '#4CAF50'
    })
  }

  const formatOptionLabel = ({ label, icon }: LanguageOption) => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <span style={{ marginRight: 10 }}>{icon}</span>
      {label}
    </div>
  )

  return (
    <div>
      <header
        className={`fixed top-0 left-0 right-0 px-4 lg:px-6 h-14 flex items-center ${bgColor} z-50 transition-shadow duration-300 ${
          isScrolled ? 'shadow-md' : 'shadow-none'
        }`}
      >
        <div className="flex items-center justify-between w-full lg:w-auto">
          {user ? (
            <>
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
            </>
          ) : (
            <>
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
            </>
          )}
          {user && (
            <div className="lg:hidden">
              <svg
                onClick={() => setIsModalOpen(true)}
                viewBox="0 0 24 24"
                width="27"
                height="27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="cursor-pointer"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <circle
                    cx="12"
                    cy="9"
                    r="3"
                    stroke="#4CAF50"
                    strokeWidth="1.5"
                  ></circle>
                  <path
                    d="M17.9691 20C17.81 17.1085 16.9247 15 11.9999 15C7.07521 15 6.18991 17.1085 6.03076 20"
                    stroke="#4CAF50"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  ></path>
                  <path
                    d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7"
                    stroke="#4CAF50"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  ></path>
                </g>
              </svg>
              {isModalOpen && (
                <div
                  className="absolute top-8 right-0 mt-2 w-64 bg-white shadow-lg rounded-md py-4 z-50"
                  style={{ borderRadius: '10px' }}
                >
                  <div className="relative p-4">
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="absolute top-0 right-5 text-[#4CAF50] text-xl"
                    >
                      &times;
                    </button>
                    <div className="flex flex-col items-center">
                      <svg
                        viewBox="0 0 24 24"
                        width="75"
                        height="75"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          <path
                            opacity="0.5"
                            d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                            fill="#4CAF50"
                          ></path>
                          <path
                            d="M16.807 19.0112C15.4398 19.9504 13.7841 20.5 12 20.5C10.2159 20.5 8.56023 19.9503 7.193 19.0111C6.58915 18.5963 6.33109 17.8062 6.68219 17.1632C7.41001 15.8302 8.90973 15 12 15C15.0903 15 16.59 15.8303 17.3178 17.1632C17.6689 17.8062 17.4108 18.5964 16.807 19.0112Z"
                            fill="#4CAF50"
                          ></path>
                          <path
                            d="M12 12C13.6569 12 15 10.6569 15 9C15 7.34315 13.6569 6 12 6C10.3432 6 9.00004 7.34315 9.00004 9C9.00004 10.6569 10.3432 12 12 12Z"
                            fill="#4CAF50"
                          ></path>
                        </g>
                      </svg>
                      <p className="text-sm text-[#4CAF50] mt-2">
                        {t('hello')},{' '}
                        <span className="text-[#0A6847]">{user.username}</span>!
                      </p>
                      <Link
                        href={`/${locale}/garden/${user._id}`}
                        className="mt-4 w-full text-center px-4 py-2 text-sm text-[#4CAF50] hover:bg-gray-100 mb-2 inline-block"
                        prefetch={false}
                      >
                        {t('garden')}
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-center px-4 py-2 text-sm text-[#4CAF50] hover:bg-gray-100"
                      >
                        {t('logout')}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
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
            sx={{ backgroundColor: '#F0F8F0' }}
          >
            <Select
              value={languageOptions.find((option) => option.value === locale)}
              onChange={(selectedOption) => handleLocaleChange(selectedOption)}
              options={languageOptions}
              styles={customStyles}
              formatOptionLabel={formatOptionLabel}
              placeholder={t('language')}
            />
          </FormControl>
          {user ? (
            <div className="relative flex items-center gap-2">
              <svg
                onClick={() => setIsModalOpen(true)}
                viewBox="0 0 24 24"
                width="27"
                height="27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="cursor-pointer"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <circle
                    cx="12"
                    cy="9"
                    r="3"
                    stroke="#4CAF50"
                    strokeWidth="1.5"
                  ></circle>
                  <path
                    d="M17.9691 20C17.81 17.1085 16.9247 15 11.9999 15C7.07521 15 6.18991 17.1085 6.03076 20"
                    stroke="#4CAF50"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  ></path>
                  <path
                    d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7"
                    stroke="#4CAF50"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  ></path>
                </g>
              </svg>
              {isModalOpen && (
                <div
                  className="absolute top-8 right-0 mt-2 w-64 bg-white shadow-lg rounded-md py-4 z-50"
                  style={{ borderRadius: '10px' }}
                >
                  <div className="relative p-4">
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="absolute top-0 right-5 text-[#4CAF50] text-xl"
                    >
                      &times;
                    </button>
                    <div className="flex flex-col items-center">
                      <svg
                        viewBox="0 0 24 24"
                        width="75"
                        height="75"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          <path
                            opacity="0.5"
                            d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                            fill="#4CAF50"
                          ></path>
                          <path
                            d="M16.807 19.0112C15.4398 19.9504 13.7841 20.5 12 20.5C10.2159 20.5 8.56023 19.9503 7.193 19.0111C6.58915 18.5963 6.33109 17.8062 6.68219 17.1632C7.41001 15.8302 8.90973 15 12 15C15.0903 15 16.59 15.8303 17.3178 17.1632C17.6689 17.8062 17.4108 18.5964 16.807 19.0112Z"
                            fill="#4CAF50"
                          ></path>
                          <path
                            d="M12 12C13.6569 12 15 10.6569 15 9C15 7.34315 13.6569 6 12 6C10.3432 6 9.00004 7.34315 9.00004 9C9.00004 10.6569 10.3432 12 12 12Z"
                            fill="#4CAF50"
                          ></path>
                        </g>
                      </svg>
                      <p className="text-sm text-[#4CAF50] mt-2">
                        {t('hello')},{' '}
                        <span className="text-[#0A6847]">{user.username}</span>!
                      </p>
                      <Link
                        href={`/${locale}/garden/${user._id}`}
                        className="mt-4 w-full text-center px-4 py-2 text-sm text-[#4CAF50] hover:bg-gray-100 mb-2 inline-block"
                        prefetch={false}
                      >
                        {t('userGarden')}
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-center px-4 py-2 text-sm text-[#4CAF50] hover:bg-gray-100"
                      >
                        {t('logout')}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              href={`/${locale}/signin`}
              className="text-sm font-medium hover:underline underline-offset-4 text-[#4CAF50] mr-5"
              prefetch={false}
            >
              {t('login')}
            </Link>
          )}
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
          {user ? (
            <></>
          ) : (
            <Link
              href={`/${locale}/signin`}
              className="text-base font-bold text-[#4CAF50] hover:underline underline-offset-4"
              prefetch={false}
              onClick={() => setIsMenuOpen(false)}
            >
              {t('login')}
            </Link>
          )}
          <FormControl
            variant="outlined"
            className="mr-5"
            sx={{ backgroundColor: '#F0F8F0' }}
          >
            <Select
              value={languageOptions.find((option) => option.value === locale)}
              onChange={(selectedOption) => handleLocaleChange(selectedOption)}
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

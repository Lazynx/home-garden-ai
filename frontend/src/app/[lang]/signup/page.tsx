'use client'
import React, { useState, ChangeEvent, FormEvent } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { useTranslation } from '@/context/TranslationContext'

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false)
  const { register, error } = useAuth()
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const { locale, t } = useTranslation()

  const router = useRouter()

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      alert('Passwords do not match')
      return
    }
    const success = await register(email, username, password)
    if (success) {
      router.back() // Вернуться на предыдущую страницу
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-[#4CAF50] px-4">
      <div
        className="w-full max-w-md mx-auto p-8 rounded-lg shadow-lg bg-[#F0F8F0]"
        style={{ borderRadius: '20px' }}
      >
        <Link
          href={`/${locale}/`}
          className="flex items-center justify-center mb-8"
          prefetch={false}
        >
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
            <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
            <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
          </svg>
          <span className="text-[#4CAF50] font-medium ml-2">HomeGardenAI</span>
        </Link>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mt-4">{t('registration')}</h1>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              className="w-full p-3 mt-1 text-black rounded-lg border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
              placeholder={t('inputEmail') as string}
              style={{ borderRadius: '10px' }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">{t('username')}</label>
            <input
              type="text"
              value={username}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setUsername(e.target.value)
              }
              className="w-full p-3 mt-1 text-black rounded-lg border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
              placeholder={t('inputName') as string}
              style={{ borderRadius: '10px' }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">
              {t('passwordCreation')}
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
                className="w-full p-3 mt-1 text-black rounded-lg border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
                placeholder={t('passwordCreationText') as string}
                style={{ borderRadius: '10px' }}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 px-3 flex items-center text-sm text-gray-600"
              >
                {showPassword ? t('hide') : t('show')}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium">
              {t('passwordConfirmation')}
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setConfirmPassword(e.target.value)
                }
                className="w-full p-3 mt-1 text-black rounded-lg border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
                placeholder={t('passwordConfirmationText') as string}
                style={{ borderRadius: '10px' }}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 px-3 flex items-center text-sm text-gray-600"
              >
                {showPassword ? t('hide') : t('show')}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full p-3 mt-4 bg-[#4CAF50] text-white rounded-lg font-semibold hover:bg-green-700 transition"
            style={{ borderRadius: '10px' }}
          >
            {t('signUpButtonText')}
          </button>
        </form>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            {t('alreadyLoginText')}{' '}
            <Link
              href={`/${locale}/signin`}
              className="text-green-400 hover:underline"
            >
              {t('login')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Signup

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/context/AuthContext'

interface HeaderProps {
  bgColor: string
}

export default function Header({ bgColor }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { user, logout } = useAuth()

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

  return (
    <div>
      <header
        className={`fixed top-0 left-0 right-0 px-4 lg:px-6 h-14 flex items-center ${bgColor} z-50 transition-shadow duration-300 ${
          isScrolled ? 'shadow-md' : 'shadow-none'
        }`}
      >
        <Link href="/" className="flex items-center" prefetch={false}>
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
          <span className="text-[#4CAF50] font-medium ml-2">HomeGardenAI</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
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
          </div>
          <div className="hidden lg:flex items-center">
            <Link
              href="/"
              className="text-sm font-medium hover:underline underline-offset-4 text-[#4CAF50] mr-5"
              prefetch={false}
            >
              Главная
            </Link>
            <Link
              href="/scan"
              className="text-sm font-medium hover:underline underline-offset-4 text-[#4CAF50] mr-5"
              prefetch={false}
            >
              Сканировать
            </Link>
            <Link
              href="/diagnose"
              className="text-sm font-medium hover:underline underline-offset-4 text-[#4CAF50] mr-5"
              prefetch={false}
            >
              Заболевания
            </Link>
            <Link
              href="/plants"
              className="text-sm font-medium hover:underline underline-offset-4 text-[#4CAF50] mr-5"
              prefetch={false}
            >
              Общий Сад
            </Link>
            {user ? (
              <div className="flex items-center gap-2">
                <Link
                  href={`/garden/${user._id}`}
                  className="text-sm font-medium hover:underline underline-offset-4 text-[#4CAF50] mr-5"
                  prefetch={false}
                >
                  Мой Сад
                </Link>
                <span className="text-sm font-medium text-[#4CAF50]">
                  {user.username}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-sm font-medium hover:underline underline-offset-4 text-[#4CAF50] mr-5"
                >
                  Выйти
                </button>
              </div>
            ) : (
              <Link
                href="/signin"
                className="text-sm font-medium hover:underline underline-offset-4 text-[#4CAF50] mr-5"
                prefetch={false}
              >
                Войти
              </Link>
            )}
          </div>
        </nav>
      </header>

      <div
        className={`fixed inset-0 z-40 bg-white overflow-hidden transition-transform duration-300 ${
          isMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
        style={{ backgroundColor: 'white' }}
      >
        <div className="flex items-center justify-between px-4 h-14 border-b">
          <Link href="/" className="flex items-center" prefetch={false}>
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
            href="/"
            className="text-base font-bold text-[#4CAF50] hover:underline underline-offset-4"
            prefetch={false}
            onClick={() => setIsMenuOpen(false)}
          >
            Главная
          </Link>
          <Link
            href="/scan"
            className="text-base font-bold text-[#4CAF50] hover:underline underline-offset-4"
            prefetch={false}
            onClick={() => setIsMenuOpen(false)}
          >
            Сканировать
          </Link>
          <Link
            href="/diagnose"
            className="text-base font-bold text-[#4CAF50] hover:underline underline-offset-4"
            prefetch={false}
            onClick={() => setIsMenuOpen(false)}
          >
            Заболевания
          </Link>
          <Link
            href="/plants"
            className="text-base font-bold text-[#4CAF50] hover:underline underline-offset-4"
            prefetch={false}
            onClick={() => setIsMenuOpen(false)}
          >
            Общий Сад
          </Link>
          {user ? (
            <div className="flex flex-col gap-2">
              <Link
                href={`/garden/${user._id}`}
                className="text-base font-bold text-[#4CAF50] hover:underline underline-offset-4 pb-2"
                prefetch={false}
                onClick={() => setIsMenuOpen(false)}
              >
                Мой Сад
              </Link>
              <span className="text-base font-bold text-[#4CAF50] pb-2">
                {user.username}
              </span>
              <button
                onClick={handleLogout}
                className="text-base font-bold hover:underline underline-offset-4 text-[#4CAF50] self-start"
              >
                Выйти
              </button>
            </div>
          ) : (
            <Link
              href="/signin"
              className="text-base font-bold text-[#4CAF50] hover:underline underline-offset-4"
              prefetch={false}
              onClick={() => setIsMenuOpen(false)}
            >
              Войти
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

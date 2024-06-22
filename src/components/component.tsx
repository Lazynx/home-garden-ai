"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image";

export function Component() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [isMenuOpen])

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className={`fixed top-0 left-0 right-0 px-4 lg:px-6 h-14 flex items-center bg-[#F0F8F0] z-10 transition-shadow duration-300 ${isScrolled ? 'shadow-md' : 'shadow-none'}`}>
        <Link href="#" className="flex items-center justify-center" prefetch={false}>
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
          <span className="text-[#4CAF50] font-medium">HomeGarden AI</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
          <div className="lg:hidden">
            <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setIsMenuOpen(!isMenuOpen)}>
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
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
          <div className="hidden lg:flex">
            <Link
              href="#"
              className="text-sm font-medium hover:underline underline-offset-4 text-[#4CAF50] mr-5"
              prefetch={false}
            >
              Features
            </Link>
            <Link
              href="#"
              className="text-sm font-medium hover:underline underline-offset-4 text-[#4CAF50] mr-5"
              prefetch={false}
            >
              Pricing
            </Link>
            <Link
              href="#"
              className="text-sm font-medium hover:underline underline-offset-4 text-[#4CAF50] mr-5"
              prefetch={false}
            >
              About
            </Link>
            <Link
              href="#"
              className="text-sm font-medium hover:underline underline-offset-4 text-[#4CAF50] mr-5"
              prefetch={false}
            >
              Contact
            </Link>
          </div>
        </nav>
      </header>
      <main className="flex-1 mt-14">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-[#F0F8F0]">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-[#4CAF50]">
                    Grow Your Home Garden with Ease
                  </h1>
                  <p className="max-w-[600px] text-[#6A6A6A] md:text-xl">
                    Our HomeGarden AI app is your personal plant companion, providing tailored care recommendations and
                    insights to help your indoor and outdoor plants thrive.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    href="#"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-[#4CAF50] px-8 text-sm font-medium text-white transition-colors hover:bg-[#3D8E40] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Get Started
                  </Link>
                  <Link
                    href="#"
                    className="inline-flex h-10 items-center justify-center rounded-md border border-[#4CAF50] bg-[#F0F8F0] px-8 text-sm font-medium transition-colors hover:bg-[#E0F0E0] hover:text-[#4CAF50] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-[#4CAF50]">
                  Effortless Plant Care
                </h2>
                <p className="max-w-[900px] text-[#6A6A6A] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our HomeGarden AI app takes the guesswork out of plant care, providing personalized recommendations
                  and insights to help your indoor and outdoor plants thrive.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <Image src="/images/bg-1.jpg" className="mx-auto aspect-video rounded overflow-hidden object-cover object-center sm:w-full lg:order-last" style={{borderRadius: "10px"}} alt="My Photo" width={550} height={310} />
              <div className="flex flex-col justify-center space-y-4">
                <ul className="grid gap-6">
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold text-[#4CAF50]">Plant Care Recommendations</h3>
                      <p className="text-[#6A6A6A]">
                        Get personalized care tips for your plants based on their specific needs and your environment.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold text-[#4CAF50]">Growth Tracking</h3>
                      <p className="text-[#6A6A6A]">
                        Monitor your plants progress and receive alerts for any changes in their health.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold text-[#4CAF50]">Personalized Insights</h3>
                      <p className="text-[#6A6A6A]">
                        Get tailored tips and advice to help your plants thrive in your unique environment.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-[#F0F8F0]">
          <div className="container grid items-center justify-center gap-4 px-4 md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-[#4CAF50]">
                Unlock the Secrets to Thriving Plants
              </h2>
              <p className="mx-auto max-w-[600px] text-[#6A6A6A] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our HomeGarden AI app provides the tools and insights you need to create a lush, vibrant home garden.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              <form className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="max-w-lg flex-1 rounded-md border-[#4CAF50] focus:border-[#4CAF50] focus:ring-[#4CAF50]"
                />
                <Button
                  type="submit"
                  className="rounded-md bg-[#4CAF50] px-4 py-2 text-white transition-colors hover:bg-[#3D8E40] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                  Get Started
                </Button>
              </form>
              <p className="text-xs text-[#6A6A6A]">
                Sign up to get notified when we launch.{" "}
                <Link href="#" className="underline underline-offset-2" prefetch={false}>
                  Terms &amp; Conditions
                </Link>
              </p>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-[#F0F8F0] shadow-none transition-shadow duration-300 hover:shadow-md">
        <p className="text-xs text-[#6A6A6A]">&copy; 2024 HomeGarden. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4 text-[#4CAF50]" prefetch={false}>
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4 text-[#4CAF50]" prefetch={false}>
            Privacy
          </Link>
        </nav>
      </footer>
      {isMenuOpen && (
        <div className="fixed inset-0 z-20 bg-black flex items-center justify-center overflow-hidden" style={{backgroundColor: "white"}}>
          <div className="flex flex-col gap-4 bg-black p-4 rounded-md shadow-lg w-full h-full">
            <Link
              href="#"
              className="text-sm font-medium text-[#4CAF50] hover:underline underline-offset-4"
              prefetch={false}
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="#"
              className="text-sm font-medium text-[#4CAF50] hover:underline underline-offset-4"
              prefetch={false}
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href="#"
              className="text-sm font-medium text-[#4CAF50] hover:underline underline-offset-4"
              prefetch={false}
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="#"
              className="text-sm font-medium text-[#4CAF50] hover:underline underline-offset-4"
              prefetch={false}
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 rounded-full"
            onClick={() => setIsMenuOpen(false)}
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
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
            <span className="sr-only">Close menu</span>
          </Button>
        </div>
      )}
    </div>
  )
}

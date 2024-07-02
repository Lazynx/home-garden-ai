import Link from 'next/link'

interface FooterProps {
  bgColor: string
}
export default function Footer({ bgColor }: FooterProps) {
  return (
    <footer
      className={`flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 ${bgColor} shadow-none transition-shadow duration-300 hover:shadow-md`}
    >
      <p className="text-xs text-[#6A6A6A]">
        &copy; 2024 HomeGarden. All rights reserved.
      </p>
      <nav className="sm:ml-auto flex gap-4 sm:gap-6">
        <Link
          href="#"
          className="text-xs hover:underline underline-offset-4 text-[#4CAF50]"
          prefetch={false}
        >
          Terms of Service
        </Link>
        <Link
          href="#"
          className="text-xs hover:underline underline-offset-4 text-[#4CAF50]"
          prefetch={false}
        >
          Privacy
        </Link>
      </nav>
    </footer>
  )
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Rubik } from 'next/font/google'
import { Arimo } from 'next/font/google'
import "./globals.css";

const rubik = Rubik({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-rubik',
})
const arimo = Arimo({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-arimo',
})

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HomeGarden AI",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={rubik.variable + ' ' + arimo.variable}>
        {children}
      </body>
    </html>
  );
}

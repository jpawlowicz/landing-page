import type { Metadata } from 'next'
import { Space_Mono, Syne, Space_Grotesk } from 'next/font/google'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-space-grotesk',
})

const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-space-mono',
})

const syne = Syne({
  weight: ['700'],
  subsets: ['latin'],
  variable: '--font-syne',
})

export const metadata: Metadata = {
  title: 'Joanna Wrobel — UX Design & AI Products',
  description:
    'UX designer, Figma expert, AI design, mentor, illustrator, and front-end developer based in Warsaw.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${spaceMono.variable} ${syne.variable} ${spaceGrotesk.variable}`}>
      <body className="bg-paper">{children}</body>
    </html>
  )
}

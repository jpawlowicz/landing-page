import type { Metadata } from 'next'
import { Space_Mono, Syne, Space_Grotesk } from 'next/font/google'
import Script from 'next/script'
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
  weight: ['700', '800'],
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
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-SBMP3B3VT1" strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-SBMP3B3VT1');
      `}</Script>
      <Script id="mailerlite-universal" strategy="afterInteractive">{`
        (function(w,d,e,u,f,l,n){w[f]=w[f]||function(){(w[f].q=w[f].q||[])
        .push(arguments);},l=d.createElement(e),l.async=1,l.src=u,
        n=d.getElementsByTagName(e)[0],n.parentNode.insertBefore(l,n);})
        (window,document,'script','https://assets.mailerlite.com/js/universal.js','ml');
        ml('account', '608732');
      `}</Script>
    </html>
  )
}

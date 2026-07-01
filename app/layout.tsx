import type { Metadata } from 'next'
import { Space_Mono, Syne, Space_Grotesk } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const SITE_URL = 'https://joannawrobel.com'

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
  metadataBase: new URL(SITE_URL),
  title: 'Joanna Wrobel — UX Designer, Figma Expert & Design Mentor',
  description:
    'Joanna Wrobel is a UX designer and mentor with 12 years of experience, specialising in Figma, design systems, advanced prototyping, and AI-assisted UX. Based in Gdansk, Poland — available for remote work and 1:1 design mentorship worldwide.',
  keywords: [
    'UX designer',
    'Figma expert',
    'design mentor',
    'UX mentor',
    'design systems',
    'UI designer',
    'product designer',
    'Figma prototyping',
    'Figma variables',
    'AI UX design',
    'design systems specialist',
    'UX portfolio review',
    'senior UX designer',
    'remote UX designer',
    'UX designer Poland',
    'UX designer Gdansk',
    'design mentorship',
    '1:1 design mentor',
    'Joanna Wrobel',
  ],
  authors: [{ name: 'Joanna Wrobel', url: SITE_URL }],
  creator: 'Joanna Wrobel',
  publisher: 'Joanna Wrobel',
  formatDetection: { email: false, address: false, telephone: false },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: 'profile',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'Joanna Wrobel',
    title: 'Joanna Wrobel — UX Designer, Figma Expert & Design Mentor',
    description:
      'UX designer and mentor with 12 years of experience. Figma expert specialising in design systems, advanced prototyping, and AI-assisted UX. Based in Gdansk, available remotely.',
    images: [
      {
        url: '/photo.png',
        width: 800,
        height: 800,
        alt: 'Joanna Wrobel — UX Designer & Mentor',
      },
    ],
    firstName: 'Joanna',
    lastName: 'Wrobel',
    username: 'joannawrobel_ux',
    gender: 'female',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Joanna Wrobel — UX Designer, Figma Expert & Design Mentor',
    description:
      'UX designer and mentor with 12 years of experience. Figma expert specialising in design systems, prototyping, and AI-assisted UX. Based in Gdansk, available remotely.',
    images: ['/photo.png'],
    creator: '@joannawrobel_ux',
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'design',
}

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Joanna Wrobel',
  givenName: 'Joanna',
  familyName: 'Wrobel',
  url: SITE_URL,
  image: `${SITE_URL}/photo.png`,
  email: 'joannawrobel.ux@gmail.com',
  jobTitle: 'UX Designer & Mentor',
  description:
    'UX designer with 12 years of experience, 8 of which are focused on UX. Specialises in design systems, Figma, advanced prototyping, and AI-assisted UX workflows. Offers paid 1:1 design mentorship sessions. Based in Gdansk, Poland.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Gdansk',
    addressCountry: 'PL',
  },
  sameAs: [
    'https://www.linkedin.com/in/joannawrobel-ux/',
    'https://instagram.com/joannawrobel_ux',
    'https://www.instagram.com/_joannawrobel/',
    'https://joannawrobel.gumroad.com',
    'https://newsletter.joannawrobel.com',
  ],
  knowsAbout: [
    'UX Design',
    'User Experience Design',
    'Figma',
    'Design Systems',
    'Advanced Prototyping',
    'AI in UX',
    'Figma Variables',
    'UI Design',
    'Product Design',
    'Digital Illustration',
    'Animation',
    'Design Thinking',
    'Design Critique',
    'UX Mentorship',
  ],
  hasOccupation: {
    '@type': 'Occupation',
    name: 'UX Designer',
    occupationLocation: {
      '@type': 'Country',
      name: 'Poland',
    },
    description:
      'Designing digital products with focus on design systems, Figma, and AI-assisted workflows. Available remotely worldwide.',
    skills:
      'UX Design, Figma, Design Systems, Prototyping, Figma Variables, AI-assisted UX, Illustration, Animation',
  },
  offers: [
    {
      '@type': 'Offer',
      name: '1:1 UX Design Mentorship',
      description:
        'Paid 1:1 mentorship sessions covering Figma, design process, career advice, and project feedback.',
      url: SITE_URL,
    },
    {
      '@type': 'Offer',
      name: 'Notion Case Study Template',
      description:
        'A Notion template for documenting UX work. Process-first approach for case studies.',
      url: 'https://joannawrobel.gumroad.com/l/notion-case-study',
    },
  ],
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Joanna Wrobel',
  url: SITE_URL,
  description:
    'Personal portfolio and website of Joanna Wrobel — UX Designer, Figma expert, and design mentor based in Gdansk, Poland.',
  author: {
    '@type': 'Person',
    name: 'Joanna Wrobel',
    url: SITE_URL,
  },
  inLanguage: 'en',
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'UX Design Mentorship',
  serviceType: 'Design Mentorship',
  provider: {
    '@type': 'Person',
    name: 'Joanna Wrobel',
    url: SITE_URL,
  },
  description:
    'Paid 1:1 mentorship sessions on Figma, UX design process, career guidance, and project feedback. Topics include Figma deep dives, career advice for designers, design critique, and process improvement. Limited spots.',
  areaServed: 'Worldwide',
  url: SITE_URL,
  audience: {
    '@type': 'Audience',
    audienceType:
      'UX designers, UI designers, product designers, design students, Figma users',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${spaceMono.variable} ${syne.variable} ${spaceGrotesk.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([personSchema, websiteSchema, serviceSchema]),
          }}
        />
      </head>
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

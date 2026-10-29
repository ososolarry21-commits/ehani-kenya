import Script from 'next/script'
import type { Metadata } from 'next'
import './globals.css'
import Footer from './components/footer'
import SessionTimeout from './components/SessionTimeout' // Import the security component

// 🆕 NEW: SEO Metadata for Search Engines (Only works in Server Components)
export const metadata: Metadata = {
  title: 'Ehani - Verified Student Accommodation & Housing in Kenya',
  description: 'Find safe, verified, and affordable student accommodation near top universities in Kenya. Browse trusted bedsitters, hostels, and rooms with Ehani Homes.',
  keywords: ['student accommodation', 'student housing Kenya', 'verified hostels', 'bedsitters Nairobi', 'Ehani Homes', 'university housing'],
  openGraph: {
    title: 'Ehani - Verified Student Accommodation',
    description: 'Find safe, verified, and affordable student accommodation near top universities in Kenya.',
    type: 'website',
    locale: 'en_KE',
    siteName: 'Ehani Homes',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', margin: 0 }}>
        {/* Keeps your 90-min security timeout active */}
        <SessionTimeout />
        
        {children}
        <Footer />
        
        {/* Google Analytics Tracking Scripts */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </body>
    </html>
  )
}

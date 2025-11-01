import Head from 'next/head'
import Script from 'next/script'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import '../styles/globals.css'

export default function MyApp({ Component, pageProps }) {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-EK6JNVDR49'
  const router = useRouter()

  useEffect(() => {
    if (!GA_ID) return
    const handleRouteChange = (url) => {
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('config', GA_ID, { page_path: url })
      }
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    // fire once on mount
    handleRouteChange(window.location.pathname)
    return () => router.events.off('routeChangeComplete', handleRouteChange)
  }, [router.events, GA_ID])

  return (
    <>
      {GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">{`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);} 
            gtag('js', new Date());
            gtag('config', '${GA_ID}', { send_page_view: false });
          `}</Script>
        </>
      )}
      <Head>
        {/* Prefer SVG; add version to bust cache */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg?v=2" />
        {/* Explicit .ico with cache-buster and legacy rel */}
        <link rel="icon" href="/favicon.ico?v=2" sizes="any" />
        <link rel="shortcut icon" href="/favicon.ico?v=2" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#4f46e5" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

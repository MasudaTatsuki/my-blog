import Head from 'next/head'
import '../styles/globals.css'

export default function MyApp({ Component, pageProps }) {
  return (
    <>
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

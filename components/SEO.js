import Head from 'next/head'

export default function SEO({
  title = 'ラトリゼ | ポートフォリオ・ブログ',
  description = 'ラトリゼのポートフォリオ兼ブログ。Next.js と GCP(Cloud Run/Cloud Deploy)で運用。技術記事や制作メモを発信します。',
  path = '/',
  imagePath = '/hero.jpg',
  type = 'website',
}) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ratlize.com'
  const url = siteUrl.replace(/\/$/, '') + (path.startsWith('/') ? path : `/${path}`)
  const image = imagePath.startsWith('http') ? imagePath : siteUrl.replace(/\/$/, '') + imagePath
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="ラトリゼ" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Head>
  )
}


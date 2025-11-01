import { getBlogPaths } from '../lib/blogPaths'

export const getServerSideProps = async ({ res }) => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ratlize.com'
  const now = new Date().toISOString()

  const staticPages = ['/', '/blog', '/profile', '/contact']
  const posts = getBlogPaths()

  const urls = [...new Set([...staticPages, ...posts])]
    .map((p) => {
      return `  <url>\n    <loc>${baseUrl}${p}</loc>\n    <lastmod>${now}</lastmod>\n    <changefreq>${p.startsWith('/blog') ? 'weekly' : 'monthly'}</changefreq>\n    <priority>${p === '/' ? '1.0' : p.startsWith('/blog') ? '0.8' : '0.6'}</priority>\n  </url>`
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`

  res.setHeader('Content-Type', 'text/xml')
  res.write(xml)
  res.end()
  return { props: {} }
}

export default function SiteMap() {
  return null
}


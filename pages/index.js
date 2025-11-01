import Head from "next/head"
import Header from "../components/Header"
import SEO from "../components/SEO"

export default function Home() {
  const title = 'ラトリゼ | Ratlize ポートフォリオ・ブログ'
  return (
    <>
      <SEO
        title="ラトリゼ（Ratlize）| ポートフォリオ・ブログ"
        description="ラトリゼのポートフォリオ兼ブログ。Next.js と GCP(Cloud Run/Cloud Deploy)で運用し、技術記事や制作メモを発信します。"
        path="/"
        imagePath="/hero.jpg"
        type="website"
      />
      <Header />
      <section className="hero">
        <div className="container hero-inner">
          <span className="badge">Welcome</span>
          <h1 className="typing" style={{ ['--chars']: String(title.length) }}>
            {title}
          </h1>
          <p className="lead">緑・白・黒を基調としたミニマルなポートフォリオ兼ブログ。Cloud Run/Cloud Deploy で運用しています。</p>
          <div className="cta">
            <a className="btn btn-primary" href="/blog">ブログを見る</a>
            <a className="btn btn-ghost" href="/profile">プロフィール</a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 style={{marginTop:0}}>最新</h2>
          <p>まずは MDX のサンプル記事から始めましょう → <a href="/blog/hello-mdx">hello-mdx</a></p>
          <Head>
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  '@context': 'https://schema.org',
                  '@type': 'WebSite',
                  name: 'ラトリゼ',
                  url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://ratlize.com'),
                  potentialAction: {
                    '@type': 'SearchAction',
                    target: (process.env.NEXT_PUBLIC_SITE_URL || 'https://ratlize.com') + '/search?q={search_term_string}',
                    'query-input': 'required name=search_term_string'
                  }
                })
              }}
            />
          </Head>
        </div>
      </section>
    </>
  )
}
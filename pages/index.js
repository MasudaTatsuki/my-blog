import Head from "next/head"
import Header from "../components/Header"

export default function Home() {
  const title = 'Ratlize Portfolio & Blog'
  return (
    <>
      <Head>
        <title>Ratlize | Portfolio & Blog</title>
        <meta name="description" content="Ratlize portfolio & blog" />
      </Head>
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
        </div>
      </section>
    </>
  )
}
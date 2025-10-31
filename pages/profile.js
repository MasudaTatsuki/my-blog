import Head from 'next/head'
import Link from 'next/link'

export default function Profile() {
  return (
    <>
      <Head>
        <title>プロフィール | myblog</title>
        <meta name="description" content="プロフィール" />
      </Head>
      <main style={{maxWidth: 800, margin: '40px auto', padding: '0 16px'}}>
        <h1 style={{fontSize: '2rem', fontWeight: 700, marginBottom: 16}}>増田 樹</h1>
        <section style={{display: 'flex', gap: 24, alignItems: 'flex-start', flexWrap: 'wrap'}}>
          <img
            src="/favicon.ico"
            alt="Profile"
            width={120}
            height={120}
            style={{borderRadius: '50%', objectFit: 'cover', background: '#eee'}}
          />
          <div style={{flex: 1, minWidth: 260}}>
            <h2 style={{fontSize: '1.25rem', fontWeight: 600, margin: '8px 0'}}>あなたの名前</h2>
            <p style={{lineHeight: 1.8}}>
              自己紹介文をここに。経歴・スキル・好きな技術や取り組みを簡潔に書きます。
              例: フロントエンド/クラウドが得意。Next.js と GCP（Cloud Run/Cloud Deploy）で運用中。
            </p>
            <ul style={{display: 'flex', gap: 12, listStyle: 'none', padding: 0, marginTop: 12}}>
              <li><a href="https://github.com/" target="_blank" rel="noreferrer">GitHub</a></li>
              <li><a href="https://x.com/" target="_blank" rel="noreferrer">X</a></li>
              <li><a href="mailto:you@example.com">Email</a></li>
            </ul>
          </div>
        </section>
        <hr style={{margin: '24px 0'}} />
        <section>
          <h3 style={{fontSize: '1.1rem', fontWeight: 600, marginBottom: 8}}>スキル</h3>
          <ul>
            <li>JavaScript / TypeScript / React / Next.js</li>
            <li>GCP: Cloud Run, Cloud Build, Cloud Deploy, LB</li>
            <li>CI/CD, IaC, モニタリング</li>
          </ul>
        </section>
        <p style={{marginTop: 24}}>
          <Link href="/">トップへ戻る</Link>
        </p>
      </main>
    </>
  )
}

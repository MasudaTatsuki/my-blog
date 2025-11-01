import Link from 'next/link'

export default function Header() {
  return (
    <header className="site-header">
      <div className="container site-header-inner">
        <Link href="/" className="brand">
          ラトリゼ<span className="brand-accent">.com</span>
        </Link>
        <nav className="nav">
          <Link href="/blog">ブログ</Link>
          <Link href="/contact">お問い合わせ</Link>
          <Link href="/profile">プロフィール</Link>
        </nav>
      </div>
    </header>
  )
}


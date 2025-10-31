export default function BlogIndex() {
  return (
    <main style={{ maxWidth: 800, margin: '40px auto', padding: '0 16px' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 700 }}>Blog</h1>
      <p>MDX で記事を書けます。サンプル:</p>
      <ul>
        <li><a href="/blog/hello-mdx">hello-mdx</a></li>
      </ul>
      <p style={{ marginTop: 16 }}>
        新規記事は <code>pages/blog/</code> に <code>.mdx</code> で追加してください。
      </p>
    </main>
  )
}


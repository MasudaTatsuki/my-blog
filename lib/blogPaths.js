const fs = require('fs')
const path = require('path')

function walk(dir, exts = new Set(['.mdx', '.md'])) {
  const out = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      out.push(...walk(full, exts))
    } else {
      const ext = path.extname(entry.name).toLowerCase()
      if (exts.has(ext)) out.push(full)
    }
  }
  return out
}

// Return route paths like /blog/foo, /blog/2025/10/post
function getBlogPaths() {
  const root = process.cwd()
  const blogDir = path.join(root, 'pages', 'blog')
  if (!fs.existsSync(blogDir)) return []
  const files = walk(blogDir)
  const routes = files.map((abs) => {
    const rel = path.relative(path.join(root, 'pages'), abs).replace(/\\/g, '/')
    // remove extension
    let route = '/' + rel.replace(/\.(mdx|md)$/i, '')
    // turn /blog/foo/index to /blog/foo
    route = route.replace(/\/index$/, '')
    return route
  })
  return Array.from(new Set(routes)).sort()
}

module.exports = { getBlogPaths }


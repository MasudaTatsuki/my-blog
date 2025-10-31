/** @type {import('next').NextConfig} */
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
})

const nextConfig = withMDX({
  output: 'standalone',
  pageExtensions: ['js', 'jsx', 'md', 'mdx'],
})

module.exports = nextConfig


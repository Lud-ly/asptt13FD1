/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn-transverse.azureedge.net','herault.fff.fr'],
  },
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig

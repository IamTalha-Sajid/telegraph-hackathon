/** @type {import('next').NextConfig} */
const nextConfig = {
  // Industry pages moved from /tracks/* to /missions/* when Season II switched to
  // 3 tracks + 15 commercial missions. Keep old links working.
  async redirects() {
    return [
      { source: '/tracks/:slug', destination: '/missions/:slug', permanent: true },
    ]
  },
}

export default nextConfig

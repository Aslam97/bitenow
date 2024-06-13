/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        hostname: process.env.NEXT_PUBLIC_API_URL
      },
      {
        hostname: 'via.placeholder.com'
      }
    ]
  }
}
export default nextConfig

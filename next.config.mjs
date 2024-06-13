/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        hostname: new URL(process.env.NEXT_PUBLIC_API_URL).hostname
      },
      {
        hostname: 'via.placeholder.com'
      }
    ]
  }
}
export default nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        hostname: '62teknologi-backend-test-aslam-hafizuddin.test'
      },
      {
        hostname: 'via.placeholder.com'
      }
    ]
  }
}

export default nextConfig

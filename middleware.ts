import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const nextResponse = NextResponse.next()

  if (request.cookies.has('bitenow_geo')) {
    return nextResponse
  }

  // As per the Next.js docs, middleware should not have complex data fetching logic.
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#use-cases
  // You may want to setup your own geoIP for your server. https://docs.nginx.com/nginx/admin-guide/dynamic-modules/geoip
  const res = await fetch(process.env.NEXT_PUBLIC_URL + '/api/geo', {
    method: 'POST'
  })
  const { latitude, longitude } = (await res.json()) as Coords
  nextResponse.cookies.set(
    'bitenow_geo',
    JSON.stringify({
      latitude,
      longitude
    })
  )

  // If you are using Vercel, you can easily get the user's location.
  // https://nextjs.org/docs/app/api-reference/functions/next-request#geo
  // nextResponse.cookies.set(
  //   'bitenow_geo',
  //   JSON.stringify({
  //     latitude: request.geo?.latitude || 0,
  //     longitude: request.geo?.longitude || 0
  //   })
  // )

  return nextResponse
}

/**
 * Don't use this in production, use this instead: https://docs.nginx.com/nginx/admin-guide/dynamic-modules/geoip
 * Or use Vercel's geo feature: https://nextjs.org/docs/app/api-reference/functions/next-request#geo
 * Or use a third-party service: https://ip-api.com
 */

import { NextRequest, NextResponse } from 'next/server'
import { getIpFromXForwardedFor } from '@/lib/utils'
import { getGeoLocation } from '@/lib/utils'

export async function POST(request: NextRequest) {
  const ips = request.headers.get('x-forwarded-for')
  const ip = getIpFromXForwardedFor(ips || '') || '8.8.8.8'

  const geoLocation = getGeoLocation(ip)

  return NextResponse.json(geoLocation)
}

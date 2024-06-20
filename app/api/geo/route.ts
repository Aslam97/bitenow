import { NextRequest, NextResponse } from 'next/server'
import { getIpFromXForwardedFor } from '@/lib/utils'
import { getGeoLocation } from '@/lib/geo-ip-utils'

export async function POST(request: NextRequest) {
  const ips = request.headers.get('x-forwarded-for')
  const ip = getIpFromXForwardedFor(ips || '') || '8.8.8.8'

  const geoLocation = getGeoLocation(ip)

  return NextResponse.json(geoLocation)
}

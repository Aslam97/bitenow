import { type ClassValue, clsx } from 'clsx'
import QueryString from 'qs'
import { twMerge } from 'tailwind-merge'
import fs from 'fs'
import { CityResponse, Reader } from 'maxmind'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const calculateTravelDetails = (
  distanceInMeters: number,
  speedKmH: number
): { distanceInKm: number; travelTimeInMinutes: number } => {
  const distanceInKm = distanceInMeters / 1000
  const travelTimeInMinutes = (distanceInKm / speedKmH) * 60
  return {
    distanceInKm: distanceInKm,
    travelTimeInMinutes: Math.round(travelTimeInMinutes)
  }
}

export const isUrl = (url: string) => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

function isLocalhost(hostname: string) {
  return (
    hostname === 'localhost' ||
    hostname.match(/^::ffff:127\.\d+\.\d+\.\d+$/) ||
    hostname.match(/^::1$/) ||
    hostname.match(/^127\.\d+\.\d+\.\d+$/)
  )
}

export function getIpFromXForwardedFor(ips: string) {
  if (isLocalhost(ips)) return null

  const regexes = {
    ipv4: /^(?:(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.){3}(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])$/,
    ipv6: /^((?=.*::)(?!.*::.+::)(::)?([\dA-F]{1,4}:(:|\b)|){5}|([\dA-F]{1,4}:){6})((([\dA-F]{1,4}((?!\3)::|:\b|$))|(?!\2\3)){2}|(((2[0-4]|1\d|[1-9])?\d|25[0-5])\.?\b){4})$/i
  }

  const forwardedIps = ips.split(',').map((ip) => {
    ip = ip.trim()
    return ip.includes(':') && ip.split(':').length === 2
      ? ip.split(':')[0]
      : ip
  })

  const validIp = forwardedIps.find(
    (ip) => regexes.ipv4.test(ip) || regexes.ipv6.test(ip)
  )

  return validIp || null
}

export function getGeoLocation(ip: string): Coords {
  const buffer = fs.readFileSync('./db/GeoLite2-City.mmdb')
  const lookup = new Reader<CityResponse>(buffer)
  const city = lookup.get(ip)

  return {
    latitude: city?.location?.latitude || 0,
    longitude: city?.location?.longitude || 0
  }
}

export const parseSearchParams = (searchParams: URLSearchParams) => {
  const filter: Record<string, any> = {}

  searchParams.forEach((value: any, key: string) => {
    if (
      [
        'sort_by',
        'page',
        'paginate',
        'latitude',
        'longitude',
        'include'
      ].includes(key)
    )
      return

    if (!key || !value) return

    filter[key] = value
  })

  const query = QueryString.stringify(
    {
      filter,
      sort_by: searchParams.get('sort_by') || 'distance',
      page: parseInt(searchParams.get('page') || '1'),
      paginate: parseInt(searchParams.get('paginate') || '20'),
      latitude: parseFloat(searchParams.get('latitude') || '0'),
      longitude: parseFloat(searchParams.get('longitude') || '0'),
      include: searchParams.get('include') || 'cuisines'
    },
    {
      encodeValuesOnly: true, // prettify URL
      skipNulls: true
    }
  )

  return query
}

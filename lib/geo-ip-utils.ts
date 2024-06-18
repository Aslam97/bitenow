import fs from 'fs'
import { CityResponse, Reader } from 'maxmind'

function getGeoIPReader(): Reader<CityResponse> {
  const buffer = fs.readFileSync('./db/GeoLite2-City.mmdb')
  const geoIPReader = new Reader<CityResponse>(buffer)

  return geoIPReader
}

export function getGeoLocation(ip: string): Coords {
  const lookup = getGeoIPReader()
  const city = lookup.get(ip)
  return {
    latitude: city?.location?.latitude || 0,
    longitude: city?.location?.longitude || 0
  }
}

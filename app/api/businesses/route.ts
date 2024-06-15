import { cookies } from 'next/headers'
import { type NextRequest } from 'next/server'
import QueryString from 'qs'
import cookie from 'cookie'

export async function GET(req: NextRequest) {
  const cookieStore = cookies()
  const searchParams = req.nextUrl.searchParams

  const filter: FilterState = {}

  searchParams.forEach((value, key) => {
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

  const cookieGfChoosenLoc = cookieStore.get('gf_chosen_loc')
  const gfChosenLoc = { latitude: 0, longitude: 0 }

  if (cookieGfChoosenLoc) {
    Object.assign(gfChosenLoc, JSON.parse(String(cookieGfChoosenLoc.value)))
  }

  const query = QueryString.stringify(
    {
      filter,
      sort_by: searchParams.get('sort_by') || 'distance',
      page: parseInt(searchParams.get('page') || '1'),
      paginate: parseInt(searchParams.get('paginate') || '20'),
      latitude: parseFloat(String(gfChosenLoc.latitude) || '0'),
      longitude: parseFloat(String(gfChosenLoc.longitude) || '0'),
      include: searchParams.get('include') || 'cuisines'
    },
    {
      encodeValuesOnly: true, // prettify URL
      skipNulls: true
    }
  )

  const url = process.env.NEXT_PUBLIC_API_URL + '/businesses' + '?' + query

  const response = await fetch(url, {
    headers: {
      Accept: 'application/json'
    },
    credentials: 'include',
    cache: 'no-cache'
  })

  try {
    const headers = response.headers

    headers.forEach((value, key) => {
      if (key === 'set-cookie') {
        const parsedCookie = cookie.parse(value)

        if (parsedCookie['gf_chosen_loc']) {
          cookies().set('gf_chosen_loc', parsedCookie['gf_chosen_loc'])
        }
      }
    })
  } catch (error) {}

  const data = await response.json()

  return Response.json(data)
}

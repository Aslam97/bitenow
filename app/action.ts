'use server'

import QueryString from 'qs'

interface fetchProps {
  path: string
  params?: ParamState
  config?: RequestInit
}

export async function fetchApi<T>({
  path,
  params,
  config
}: fetchProps): Promise<T> {
  const query = QueryString.stringify(params, {
    encodeValuesOnly: true, // prettify URL
    skipNulls: true
  })

  const url = `${process.env.NEXT_PUBLIC_API_URL}/${path}?${query}`

  const response = await fetch(url, config)
  const data = await response.json()

  return data
}

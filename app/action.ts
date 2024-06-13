'use server'

import { FilterState } from '@/lib/providers/param-wrapper'
import QueryString from 'qs'

interface fetchProps {
  path: string
  params: {
    sort_by?: string
    include?: string
    filter?: FilterState
    pagination?: PaginationState
  }
  config?: RequestInit
}

export async function fetchApi<T>({
  path,
  params,
  config
}: fetchProps): Promise<T> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/${path}`

  const { pagination, ...rest } = params

  const query = QueryString.stringify(
    { ...rest, ...pagination },
    {
      encodeValuesOnly: true // prettify URL
    }
  )

  const response = await fetch(`${url}?${query}`, config)
  const data = await response.json()

  return data
}

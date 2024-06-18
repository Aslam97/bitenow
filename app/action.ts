'use server'

import { parseSearchParams } from '@/lib/utils'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

interface fetchProps {
  path: string
  params?: Record<string, any>
  config?: RequestInit
}

export async function fetchApi<T>({
  path,
  params,
  config
}: fetchProps): Promise<T> {
  const query = parseSearchParams(new URLSearchParams(params))
  const url = process.env.NEXT_PUBLIC_API_URL + '/' + path + '?' + query

  const response = await fetch(url, config)
  const data = await response.json()

  return data
}

export async function validateLocation(location: Record<string, any>) {
  cookies().set('aralu_geo', JSON.stringify(location))
  revalidatePath('/restaurants', 'page')
}

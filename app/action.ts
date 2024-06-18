'use server'

import { isUrl } from '@/lib/utils'
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
  const query = new URLSearchParams(params).toString()

  const url = isUrl(path)
    ? path
    : `${process.env.NEXT_PUBLIC_URL}/api/${path}?${query}`

  const response = await fetch(url, config)
  const data = await response.json()

  return data
}

export async function validateLocation(location: Record<string, any>) {
  cookies().set('aralu_geo', JSON.stringify(location))
  revalidatePath('/restaurants', 'page')
}

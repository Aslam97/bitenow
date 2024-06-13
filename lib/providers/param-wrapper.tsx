'use client'

import { useGeolocation } from '@uidotdev/usehooks'
import { useSearchParams } from 'next/navigation'
import { createContext } from 'react'

export const ParamContext = createContext<ParamState>({
  filter: {},
  sort_by: 'distance',
  page: 1,
  paginate: 20,
  latitude: 0,
  longitude: 0,
  include: 'cuisines'
})

export default function ParamWrapper({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const state = useGeolocation()
  const searchParams = useSearchParams()

  const filter: FilterState = {}

  searchParams.forEach((value, key) => {
    if (['sort_by', 'include'].includes(key)) return

    if (!key || !value) return

    filter[key] = value
  })

  return (
    <ParamContext.Provider
      value={{
        filter,
        sort_by: searchParams.get('sort_by') || 'distance',
        page: parseInt(searchParams.get('page') || '1'),
        paginate: parseInt(searchParams.get('paginate') || '20'),
        latitude: state.latitude || 0,
        longitude: state.longitude || 0,
        include: searchParams.get('include') || 'cuisines'
      }}
    >
      {children}
    </ParamContext.Provider>
  )
}

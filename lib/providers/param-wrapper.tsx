'use client'

import { useSearchParams } from 'next/navigation'
import { createContext } from 'react'

export interface FilterState {
  [key: string]: any
}

export const ParamContext = createContext<{
  filter: FilterState
  sort_by: string
  pagination: PaginationState
  include: string
}>({
  filter: {},
  sort_by: '-distance',
  pagination: {
    page: 1,
    paginate: 20
  },
  include: 'cuisines'
})

export default function ParamWrapper({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const searchParams = useSearchParams()

  const filter: FilterState = {}

  searchParams.forEach((value, key) => {
    if (['sort_by', 'page', 'paginate', 'include'].includes(key)) return

    if (!key || !value) return
    filter[key] = value
  })

  return (
    <ParamContext.Provider
      value={{
        filter,
        sort_by: searchParams.get('sort_by') || '-distance',
        pagination: {
          page: parseInt(searchParams.get('page') || '1'),
          paginate: parseInt(searchParams.get('paginate') || '20')
        },
        include: searchParams.get('include') || 'cuisines'
      }}
    >
      {children}
    </ParamContext.Provider>
  )
}

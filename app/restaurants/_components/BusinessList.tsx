'use client'

import { Empty } from '@/components/custom/empty'
import BusinessCard from './BusinessCard'
import { useContext, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { ParamContext } from '@/lib/providers/param-wrapper'
import QueryString from 'qs'

export default function BusinessList({
  nextPage
}: Readonly<{ nextPage: number | null }>) {
  const { filter, ...params } = useContext(ParamContext)
  const [data, setData] = useState<BusinessModel[]>([])
  const [hasMore, setHasMore] = useState(nextPage !== null)
  const [loading, setLoading] = useState(false)
  const [pagination, setPagination] = useState<PaginationState>({
    page: nextPage || 1,
    paginate: 20
  })
  const { ref, inView } = useInView()

  useEffect(() => {
    const fetchMore = async () => {
      setLoading(true)

      const query = QueryString.stringify(
        {
          ...filter,
          ...params,
          ...pagination
        },
        {
          encodeValuesOnly: true, // prettify URL
          skipNulls: true
        }
      )

      const response = await fetch(
        process.env.NEXT_PUBLIC_URL + '/api/businesses' + '?' + query,
        {
          headers: {
            Accept: 'application/json'
          },
          credentials: 'include',
          cache: 'no-cache'
        }
      )
      const { data: bs, meta } =
        (await response.json()) as JsonResourceWithPagination<BusinessModel>

      setData((prev) => [...prev, ...bs])
      setPagination((prev) => ({
        ...prev,
        page: meta.current_page + 1
      }))

      if (meta.current_page >= meta.last_page) {
        setHasMore(false)
      }

      setLoading(false)
    }

    // make sure we have more data to fetch and not currently loading
    // if only inView and hasMore, then there is a possibility of duplicate page number. which cause duplicate key
    if (inView && hasMore && !loading) {
      fetchMore()
    }
  }, [filter, hasMore, inView, loading, pagination, params])

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {data.map((business) => (
          <BusinessCard key={business.id} business={business} />
        ))}
      </div>

      <div ref={ref}>
        {hasMore && (
          <div className="mt-4 flex justify-center">
            <div className="inline-block h-6 w-6 animate-spin rounded-full border-r-2 border-t-2 border-gray-900"></div>
          </div>
        )}
      </div>
    </>
  )
}

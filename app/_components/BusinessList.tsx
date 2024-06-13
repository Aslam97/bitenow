'use client'

import { Empty } from '@/components/custom/empty'
import BusinessCard from './BusinessCard'
import { useContext, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { fetchApi } from '../action'
import { ParamContext } from '@/lib/providers/param-wrapper'

export default function BusinessList({
  businesses,
  meta
}: Readonly<{ businesses: BusinessModel[]; meta: PaginationMeta }>) {
  const params = useContext(ParamContext)
  const [data, setData] = useState<BusinessModel[]>(businesses)
  const [hasMore, setHasMore] = useState(meta.current_page < meta.last_page)
  const [loading, setLoading] = useState(false)
  const [pagination, setPagination] = useState<PaginationState>({
    page: meta.current_page + 1,
    paginate: 20
  })
  const { ref, inView } = useInView()

  useEffect(() => {
    const fetchMore = async () => {
      setLoading(true)

      const {
        data: bs,
        meta: { current_page, last_page }
      } = await fetchApi<JsonResourceWithPagination<BusinessModel>>({
        path: 'businesses',
        params: {
          ...params,
          ...pagination
        },
        config: {
          headers: {
            Accept: 'application/json'
          },
          cache: 'no-cache'
        }
      })

      setData((prev) => [...prev, ...bs])
      setPagination((prev) => ({
        ...prev,
        page: current_page + 1
      }))

      if (current_page >= last_page) {
        setHasMore(false)
      }

      setLoading(false)
    }

    // make sure we have more data to fetch and not currently loading
    // if only inView and hasMore, then there is a possibility of duplicate page number. which cause duplicate key
    if (inView && hasMore && !loading) {
      fetchMore()
    }
  }, [hasMore, inView, loading, pagination, params])

  return (
    <>
      {data.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {data.map((business) => (
            <BusinessCard key={business.id} business={business} />
          ))}
        </div>
      ) : (
        <Empty />
      )}

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

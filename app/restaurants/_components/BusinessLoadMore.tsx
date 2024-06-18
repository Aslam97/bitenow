'use client'

import { BusinessCard, BusinessWrapper } from './Business'
import { useEffect, useMemo, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { useSearchParams } from 'next/navigation'
import { Spinner } from '@/components/custom/spinner'
import { fetchApi } from '@/app/action'
import { useAtom } from 'jotai'
import { locationAtom } from '@/store/location'

export default function BusinessLoadMore({
  nextPage
}: Readonly<{ nextPage: number | null }>) {
  const [location] = useAtom(locationAtom)
  const searchParams = useSearchParams()
  const [data, setData] = useState<BusinessModel[]>([])
  const [hasMore, setHasMore] = useState(nextPage !== null)
  const [loading, setLoading] = useState(false)
  const [pagination, setPagination] = useState<PaginationState>({
    page: nextPage || 1,
    paginate: 20
  })
  const { ref, inView } = useInView()

  const params = useMemo(() => {
    return {
      ...searchParams,
      ...location,
      ...pagination
    }
  }, [location, pagination, searchParams])

  useEffect(() => {
    const fetchMore = async () => {
      setLoading(true)

      const { data: bs, meta } = await fetchApi<
        JsonResourceWithPagination<BusinessModel>
      >({
        path: 'businesses',
        params
      })

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
  }, [hasMore, inView, loading, location, pagination, params, searchParams])

  return (
    <>
      <BusinessWrapper>
        {data.map((business) => (
          <BusinessCard key={business.id} business={business} />
        ))}
      </BusinessWrapper>

      <div ref={ref}>
        {hasMore && (
          <div className="my-10 flex justify-center">
            <Spinner className="size-12" />
          </div>
        )}
      </div>
    </>
  )
}

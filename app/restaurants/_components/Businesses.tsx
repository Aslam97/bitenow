import { Empty } from '@/components/custom/empty'
import { BusinessCard, BusinessWrapper } from './Business'
import BusinessLoadMore from './BusinessLoadMore'
import { fetchApi } from '@/app/action'
import { cookies } from 'next/headers'

export default async function Businesses({
  searchParams
}: {
  searchParams: Record<string, string>
}) {
  const cookieStore = cookies()
  const geo = cookieStore.get('aralu_geo')?.value

  const { data: businesses, meta } = await fetchApi<
    JsonResourceWithPagination<BusinessModel>
  >({
    path: 'businesses',
    params: {
      ...searchParams,
      ...(geo
        ? JSON.parse(geo)
        : {
            latitude: 0,
            longitude: 0
          })
    },
    config: {
      cache: 'no-cache',
      credentials: 'include'
    }
  })

  const nextPage = meta.current_page + 1

  return (
    <>
      {businesses.length === 0 && <Empty className="my-16" />}

      <BusinessWrapper>
        {businesses.map((business) => (
          <BusinessCard key={business.id} business={business} />
        ))}
      </BusinessWrapper>

      {/* prevent duplication. even though everytime location change will be re-fetch */}
      <BusinessLoadMore
        nextPage={nextPage > meta.last_page ? null : nextPage}
      />
    </>
  )
}

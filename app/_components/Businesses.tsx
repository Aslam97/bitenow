import BusinessList from './BusinessList'
import { fetchApi } from '../action'
import type { FilterState } from '@/lib/providers/param-wrapper'

export default async function Businesses({
  params
}: {
  params: {
    filter: FilterState
    sort_by: string
    pagination: PaginationState
    include: string
  }
}) {
  const { data: businesses, meta } = await fetchApi<
    JsonResourceWithPagination<BusinessModel>
  >({
    path: 'businesses',
    params,
    config: {
      cache: 'no-cache'
    }
  })

  return <BusinessList businesses={businesses} meta={meta} />
}

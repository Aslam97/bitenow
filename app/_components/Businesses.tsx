import BusinessList from './BusinessList'
import { fetchApi } from '../action'

export default async function Businesses({ params }: { params: ParamState }) {
  const { data: businesses, meta } = await fetchApi<
    JsonResourceWithPagination<BusinessModel>
  >({
    path: 'businesses',
    params,
    config: {
      headers: {
        Accept: 'application/json'
      },
      cache: 'no-cache'
    }
  })

  return <BusinessList businesses={businesses} meta={meta} />
}

import { fetchApi } from '../action'
import CuisineList from './CuisineList'

export default async function Cuisines() {
  const { data: cuisines } = await fetchApi<JsonResource<CuisineModel[]>>({
    path: 'cuisines',
    params: {},
    config: {
      cache: 'force-cache'
    }
  })

  return <CuisineList cuisines={cuisines} />
}

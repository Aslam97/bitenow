import Search from './_components/Search'
import Cuisines from './_components/Cuisines'
import { Suspense } from 'react'
import CuisineSkeleton from './_components/CuisineSkeleton'
import Businesses from './_components/Businesses'
import BusinessSkeleton from './_components/BusinessSkeleton'
import BusinesFilter from './_components/filter'

export default async function Home({
  searchParams
}: {
  searchParams: Record<string, string>
}) {
  const filter = Object.keys(searchParams).reduce((acc, key) => {
    if (['sort_by', 'include'].includes(key)) return acc

    if (!key || !searchParams[key]) return acc
    acc[key] = searchParams[key]
    return acc
  }, {} as FilterState)

  const sort_by = searchParams.sort_by || 'distance'
  const page = parseInt((searchParams.page as string) || '1')
  const paginate = parseInt((searchParams.paginate as string) || '20')
  const include = searchParams.include || 'cuisines'

  return (
    <main className="mx-auto my-6 max-w-7xl space-y-6 px-4 md:px-9 lg:px-10">
      {/* Search */}
      <Search placeholder="Search for restaurants, dishes, or cuisines" />

      {/* Cuisine */}
      <Suspense fallback={<CuisineSkeleton />}>
        <Cuisines />
      </Suspense>

      {/* Filter */}
      <BusinesFilter />

      {/* Business */}
      <Suspense fallback={<BusinessSkeleton />} key={JSON.stringify(filter)}>
        <Businesses
          params={{
            filter,
            sort_by,
            page,
            paginate,
            include,
            latitude: 0,
            longitude: 0
          }}
        />
      </Suspense>
    </main>
  )
}

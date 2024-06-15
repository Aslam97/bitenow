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
  return (
    <>
      {/* Cuisine */}
      <Suspense fallback={<CuisineSkeleton />}>
        <Cuisines />
      </Suspense>

      {/* Filter */}
      <BusinesFilter />

      {/* Business */}
      <Suspense
        fallback={<BusinessSkeleton />}
        key={JSON.stringify(searchParams)}
      >
        <Businesses searchParams={searchParams} />
      </Suspense>
    </>
  )
}

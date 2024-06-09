import { Empty } from '@/components/custom/empty'
import BusinessCard from './BusinessCard'
import qs from 'qs'

export default async function Businesses({
  params
}: Readonly<{
  params: {
    location: string
    term: string
    cuisines?: string
  }
}>) {
  const url =
    'http://62teknologi-backend-test-aslam-hafizuddin.test/api/businesses'
  const query = qs.stringify(
    {
      filter: {
        location: params.location,
        term: params.term,
        cuisines: params.cuisines
      },
      include: 'cuisines',
      paginate: 12
    },
    { arrayFormat: 'comma', encode: false }
  )

  console.log('url', url, 'query', query)

  const { data: businesses } = await fetch(`${url}?${query}`, {
    cache: 'no-cache'
  }).then(
    (res) => res.json() as Promise<JsonResourceWithPagination<BusinessModel>>
  )
  console.log('businesses', businesses)

  return (
    <>
      {businesses.length > 0 ? (
        <div className="grid grid-cols-1 gap-x-6 gap-y-7 sm:grid-cols-2 lg:grid-cols-4 lg:gap-y-12">
          {businesses.map((business, index) => (
            <BusinessCard key={index} business={business} />
          ))}
        </div>
      ) : (
        <Empty
          className="py-20"
          message={`We couldn’t find a match for "${params.term}"`}
        />
      )}
    </>
  )
}

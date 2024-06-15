import BusinessList from './BusinessList'
import BusinessCard from './BusinessCard'
import QueryString from 'qs'

export default async function Businesses({
  searchParams
}: {
  searchParams: Record<string, string>
}) {
  const query = QueryString.stringify(searchParams, {
    encodeValuesOnly: true, // prettify URL
    skipNulls: true
  })

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

  const { data: businesses, meta } =
    (await response.json()) as JsonResourceWithPagination<BusinessModel>

  const nextPage = meta.current_page + 1

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {businesses.map((business) => (
          <BusinessCard key={business.id} business={business} />
        ))}
      </div>

      {/* prevent duplication. even though everytime location change will be re-fetch */}
      <BusinessList nextPage={nextPage > meta.last_page ? null : nextPage} />
    </>
  )
}

import CuisineCard from './CuisineCard'

export default async function Cuisines() {
  const { data: cuisines } = await fetch(
    'http://62teknologi-backend-test-aslam-hafizuddin.test/api/cuisines',
    { cache: 'force-cache' }
  ).then((res) => res.json() as Promise<JsonResource<CuisineModel[]>>)

  return (
    <nav className="no-scrollbar flex flex-col overflow-x-auto scroll-smooth">
      <div className="m-auto flex items-start justify-center">
        {cuisines.map((cuisine, index) => (
          <CuisineCard key={index} cuisine={cuisine} />
        ))}
      </div>
    </nav>
  )
}

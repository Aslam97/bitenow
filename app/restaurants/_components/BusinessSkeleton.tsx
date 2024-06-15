import { Skeleton } from '@/components/ui/skeleton'

export default function BusinessSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-7 sm:grid-cols-2 lg:grid-cols-4 lg:gap-y-12">
      {Array.from({ length: 12 }).map((_, index) => (
        <div
          className="flex flex-row flex-wrap items-start justify-start"
          key={index}
        >
          <div className="block w-full max-md:mr-4 max-md:h-24 max-md:w-24">
            <div className="relative">
              <Skeleton className="relative h-full w-full bg-cover bg-no-repeat md:rounded-lg md:pt-1/2.5 max-md:rounded-md max-md:pt-full" />
              <div className="relative h-full w-full overflow-hidden bg-gray-200 md:rounded-lg"></div>
            </div>
          </div>
          <div className="mt-3 block w-full max-md:mt-0 max-md:flex-1 max-md:overflow-hidden">
            <Skeleton className="mb-2 flex h-4 items-center rounded max-md:hidden" />
            <Skeleton className="mb-1.5 h-4 rounded md:mb-3" />
            <div>
              <div className="mb-1 flex items-center space-x-4 md:text-sm">
                <div className="flex items-center">
                  <Skeleton className="mr-1.5 inline-block h-4 rounded md:size-6" />
                </div>
                <div className="flex items-center">
                  <Skeleton className="mr-1.5 inline-block h-4 rounded md:size-6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

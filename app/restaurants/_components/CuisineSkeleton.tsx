import { Skeleton } from '@/components/ui/skeleton'

export default function CuisineSkeleton() {
  return (
    <div className="relative flex animate-pulse">
      {Array.from({ length: 10 }).map((_, index) => (
        <button
          className="relative flex min-w-20 max-w-fit flex-col items-start"
          key={index}
        >
          <div className="flex flex-col items-center">
            <Skeleton className="block h-16 w-full rounded-full" />
            <div className="mt-2 line-clamp-1 break-all">
              <Skeleton className="h-4 w-16 rounded bg-gray-200" />
            </div>
          </div>
        </button>
      ))}
    </div>
  )
}

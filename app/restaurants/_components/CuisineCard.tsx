'use client'

import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { forwardRef, useMemo } from 'react'

const CuisineCard = forwardRef<HTMLDivElement, { cuisine: CuisineModel }>(
  ({ cuisine }, ref) => {
    const searchParams = useSearchParams()

    const isActive = useMemo(
      () => searchParams.get('cuisines')?.toString() === cuisine.slug,
      [searchParams, cuisine.slug]
    )

    return (
      <div className="relative" ref={ref}>
        <Link
          className="relative flex min-w-20 max-w-fit flex-col items-start"
          href={{
            pathname: usePathname(),
            query: {
              ...Object.fromEntries(searchParams),
              cuisines: isActive ? undefined : cuisine.slug
            }
          }}
          shallow={true}
        >
          <div className="flex flex-col items-center">
            <div className="relative mb-0.5">
              <div
                className="absolute left-1/2 top-1/2 aspect-square h-full w-full -translate-x-1/2 -translate-y-1/2 transform rounded-full duration-300 ease-in-out"
                style={{
                  backgroundColor: isActive ? cuisine.color : 'transparent'
                }}
              ></div>
              {isActive && (
                <div className="absolute right-0 top-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 -960 960 960"
                    className="size-5 fill-current text-green-700 duration-300 ease-in-out"
                  >
                    <path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z" />
                  </svg>
                </div>
              )}
              <div
                className={cn(
                  'block w-full object-contain duration-300 ease-in-out',
                  {
                    'rotate-[20deg]': isActive
                  }
                )}
              >
                <div className="flex w-fit flex-shrink-0 overflow-hidden">
                  <div className="flex w-max overflow-hidden">
                    <Image
                      alt="Shop"
                      src={cuisine.image_url}
                      className="size-16 object-cover"
                      width={64}
                      height={64}
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="line-clamp-1 break-all">
              <span className="whitespace-pre-wrap text-xs font-medium text-gray-900">
                {cuisine.name}
              </span>
            </div>
          </div>
        </Link>
      </div>
    )
  }
)

CuisineCard.displayName = 'CuisineCard'

export default CuisineCard

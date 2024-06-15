'use client'

import { createRef, RefObject, useEffect } from 'react'
import CuisineCard from './CuisineCard'
import { useSearchParams } from 'next/navigation'

export default function CuisineList({
  cuisines
}: Readonly<{ cuisines: CuisineModel[] }>) {
  const searchParams = useSearchParams()
  const refs: RefObject<HTMLDivElement>[] = cuisines.map(() =>
    createRef<HTMLDivElement>()
  )

  const activeIndex = cuisines.findIndex(
    (cuisine) => cuisine.slug === searchParams.get('cuisines')
  )

  useEffect(() => {
    if (activeIndex !== -1) {
      refs[activeIndex].current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center'
      })
    }
  }, [activeIndex, refs])

  return (
    <nav className="no-scrollbar flex flex-col overflow-x-auto scroll-smooth">
      <div className="m-auto flex items-start justify-center">
        {cuisines.map((cuisine, index) => (
          <CuisineCard key={index} cuisine={cuisine} ref={refs[index]} />
        ))}
      </div>
    </nav>
  )
}

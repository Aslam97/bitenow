'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { MenuIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Suspense, useEffect, useState } from 'react'
import Search from '../Search'
import HeaderLocation from './partials/Location'

export default function Header() {
  const [isTop, setIsTop] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      setIsTop(window.scrollY < 10)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header
      className={cn('sticky top-0 z-50 bg-white', {
        'shadow-md': !isTop
      })}
    >
      <div className="mx-auto max-w-7xl px-4 md:px-9 lg:px-10">
        <div className="flex h-12 flex-row items-center justify-start sm:h-16">
          <div className="-ml-1.5 mr-2.5">
            <Button
              variant="link"
              size="icon"
              aria-label="Main navigation menu"
              className="size-9"
            >
              <MenuIcon />
            </Button>
          </div>
          <div className="mr-4 sm:mr-6">
            <Link href="/restaurants">
              <Image
                src="/bitenow.png"
                alt="BiteNow"
                width={97}
                height={24}
                priority
              />
            </Link>
          </div>

          {/* Mid side */}
          <div className="flex h-full w-full flex-1 items-center self-start">
            <HeaderLocation />
          </div>

          {/* Left side */}
          <div></div>
        </div>

        {/* Search */}
        <div className="py-2 sm:pb-3">
          <Suspense fallback={null}>
            <Search placeholder="Search for restaurants, dishes, or cuisines" />
          </Suspense>
        </div>
      </div>
    </header>
  )
}

'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { MenuIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Search from './Search'

export default function Header() {
  const [isTop, setIsTop] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      setIsTop(window.scrollY < 100)
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
        <div className="flex h-12 flex-row items-center justify-start">
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
          <div className="pointer-events-auto">
            <Link href="/restaurants">
              <Image
                src="/aralu.png"
                alt="Aralu"
                width={64}
                height={24}
                priority
              />
            </Link>
          </div>
          <div className="flex-1"></div>
          <Link href="/">
            <Button
              className="height-9 rounded-full text-xs font-normal"
              size="sm"
            >
              <span>Sign Up</span>
            </Button>
          </Link>
        </div>

        {/* Search */}
        <div className="py-2">
          <Search placeholder="Search for restaurants, dishes, or cuisines" />
        </div>
      </div>
    </header>
  )
}

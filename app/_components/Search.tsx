'use client'

import { Input } from '@/components/ui/input'
import { SearchIcon } from 'lucide-react'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams)
    if (term) {
      params.set('term', term)
    } else {
      params.delete('term')
    }

    replace(`${pathname}?${params.toString()}`)
  }, 300)

  return (
    <div className="flex">
      <label htmlFor="search-field" className="sr-only">
        Search
      </label>
      <div className="relative w-full">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
          <SearchIcon className="size-5" />
        </div>

        <Input
          id="search-field"
          name="search"
          placeholder={placeholder}
          onChange={(e) => handleSearch(e.target.value)}
          defaultValue={searchParams.get('term')?.toString()}
          className="h-11 rounded-full border-0 bg-zinc-100 pl-12 focus-visible:ring-0 focus-visible:ring-transparent"
        />
      </div>
    </div>
  )
}

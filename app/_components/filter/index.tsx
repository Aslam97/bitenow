'use client'

import {
  ArrowUpDownIcon,
  ChevronDownIcon,
  StarIcon,
  TagIcon
} from 'lucide-react'

export default function BusinesFilter() {
  return (
    <nav className="no-scrollbar overflow-x-auto">
      <div
        aria-label="button group"
        data-baseweb="button-group"
        role="group"
        className="flex space-x-2"
      >
        <button
          tabIndex={0}
          aria-checked="false"
          role="checkbox"
          className="inline-flex h-9 cursor-pointer flex-row items-center justify-center whitespace-nowrap rounded-full bg-zinc-100 px-3 py-2.5 text-sm text-gray-900 transition-all hover:bg-zinc-200"
        >
          <div className="mr-2 flex">
            <TagIcon size={16} />
          </div>
          Offers
        </button>
        <button
          tabIndex={0}
          aria-checked="false"
          role="checkbox"
          className="inline-flex h-9 cursor-pointer flex-row items-center justify-center whitespace-nowrap rounded-full bg-zinc-100 px-3 py-2.5 text-sm text-gray-900 transition-all hover:bg-zinc-200"
        >
          <div className="mr-2 flex">
            <ArrowUpDownIcon size={16} />
          </div>
          Sort By
        </button>
        <button
          tabIndex={0}
          aria-checked="false"
          role="checkbox"
          className="inline-flex h-9 cursor-pointer flex-row items-center justify-center whitespace-nowrap rounded-full bg-zinc-100 px-3 py-2.5 text-sm text-gray-900 transition-all hover:bg-zinc-200"
        >
          Delivery fee
          <div className="ml-2 flex">
            <ChevronDownIcon size={16} />
          </div>
        </button>
        <button
          tabIndex={0}
          aria-checked="false"
          role="checkbox"
          className="inline-flex h-9 cursor-pointer flex-row items-center justify-center whitespace-nowrap rounded-full bg-zinc-100 px-3 py-2.5 text-sm text-gray-900 transition-all hover:bg-zinc-200"
        >
          Under 30 min
        </button>
        <button
          tabIndex={0}
          aria-checked="false"
          role="checkbox"
          className="inline-flex h-9 cursor-pointer flex-row items-center justify-center whitespace-nowrap rounded-full bg-zinc-100 px-3 py-2.5 text-sm text-gray-900 transition-all hover:bg-zinc-200"
        >
          <div className="mr-2 flex">
            <StarIcon size={16} />
          </div>
          Rating
          <div className="ml-2 flex">
            <ChevronDownIcon size={16} />
          </div>
        </button>
        <button
          tabIndex={0}
          aria-checked="false"
          role="checkbox"
          className="inline-flex h-9 cursor-pointer flex-row items-center justify-center whitespace-nowrap rounded-full bg-zinc-100 px-3 py-2.5 text-sm text-gray-900 transition-all hover:bg-zinc-200"
        >
          <div>Price</div>
          <div className="ml-2 flex">
            <ChevronDownIcon size={16} />
          </div>
        </button>
        <button
          tabIndex={0}
          aria-checked="false"
          role="checkbox"
          className="inline-flex h-9 cursor-pointer flex-row items-center justify-center whitespace-nowrap rounded-full bg-zinc-100 px-3 py-2.5 text-sm text-gray-900 transition-all hover:bg-zinc-200"
        >
          Dietary
          <div className="ml-2 flex">
            <ChevronDownIcon size={16} />
          </div>
        </button>
      </div>
    </nav>
  )
}

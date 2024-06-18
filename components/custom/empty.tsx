import { cn } from '@/lib/utils'
import Image from 'next/image'

const Empty = ({
  className,
  message
}: {
  className?: string
  message?: string
}) => {
  return (
    <div
      className={cn('mx-auto flex max-w-md flex-col items-center', className)}
    >
      <div className="flex w-56 items-center justify-center pb-6">
        <Image alt="Empty" src="/empty.png" width={160} height={160} />
      </div>
      <div className="pb-4 text-center text-2xl font-bold">
        {message || 'No data found'}
      </div>
      <div className="text-center text-base">
        Try searching for something else instead
      </div>
    </div>
  )
}

Empty.displayName = 'Empty'

export { Empty }

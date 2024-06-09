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
      <div className="w-56 pb-6">
        <Image
          alt=""
          role="presentation"
          src="/empty.svg"
          className="bh ae"
          width={0}
          height={0}
          sizes="100vw"
          priority
          style={{ width: '100%', height: '100%' }}
        />
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

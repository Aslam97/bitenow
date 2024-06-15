import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default async function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <Link href={'/restaurants'}>
        <Button>Go to Restaurant</Button>
      </Link>
    </main>
  )
}

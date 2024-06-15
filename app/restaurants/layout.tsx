import { cn } from '@/lib/utils'
import ParamWrapper from '@/lib/providers/param-wrapper'
import Header from './_components/Header'

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <ParamWrapper>
      <Header />

      <main className="mx-auto my-6 max-w-7xl space-y-6 px-4 md:px-9 lg:px-10">
        {children}
      </main>
    </ParamWrapper>
  )
}

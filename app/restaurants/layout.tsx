import Footer from './_components/Footer'
import Header from './_components/header/Header'

export default async function RestaurantLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />

      <main className="mx-auto max-w-7xl px-4 md:px-9 lg:px-10">
        {children}
      </main>

      <Footer />
    </>
  )
}

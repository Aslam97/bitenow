import { calculateTravelDetails } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

const BusinessWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {children}
    </div>
  )
}

const BusinessCard = ({ business }: { business: BusinessModel }) => {
  const { distanceInKm, travelTimeInMinutes } = calculateTravelDetails(
    business.distance,
    30
  )

  return (
    <Link href="/" className="no-underline">
      <div className="flex flex-row flex-wrap items-start justify-start">
        <BusinessImage
          name={business.name}
          image_url={business.image_url}
          price={business.price}
        />

        {/* content */}
        <div className="mt-3 block w-full max-md:mt-0 max-md:flex-1 max-md:overflow-hidden">
          <div className="mb-2 flex items-center text-sm font-medium text-green-700 max-md:hidden">
            <div
              className="mr-1.5 inline-block size-4 bg-contain bg-center bg-no-repeat"
              style={{
                backgroundImage: 'url("/images/icons/icon-preferred.svg")'
              }}
            ></div>
            <span>Restoran Pilihan</span>
          </div>
          <p className="mb-1.5 line-clamp-2 text-sm font-semibold md:mb-3 md:text-lg">
            {business.name}
          </p>
          <div>
            <div className="mb-1 text-xs font-normal text-gray-600 md:mb-1.5 lg:text-sm">
              {business.cuisines.map((c) => c.name).join(', ')}
            </div>
            <div className="mb-1 flex items-center space-x-4 text-xs font-normal text-gray-600 md:text-sm">
              <div className="flex items-center">
                <div
                  className="mr-1.5 inline-block size-4 flex-shrink-0 bg-contain bg-center bg-no-repeat md:size-6"
                  style={{
                    backgroundImage: 'url("/images/icons/icon-star.svg")'
                  }}
                ></div>
                {Number(business.rating).toFixed(1)}
              </div>
              <div className="flex items-center">
                <div
                  className="mr-1.5 inline-block size-4 flex-shrink-0 bg-contain bg-center bg-no-repeat md:size-6"
                  style={{
                    backgroundImage: 'url("/images/icons/icon-clock.svg")'
                  }}
                ></div>
                {travelTimeInMinutes} mnt&nbsp;&nbsp;•&nbsp;&nbsp;
                {distanceInKm.toFixed(1)} km
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

const BusinessImage = ({
  name,
  image_url,
  price
}: {
  name: string
  image_url: string
  price: number
}) => {
  return (
    <div className="block w-full max-md:mr-4 max-md:h-24 max-md:w-24">
      <div className="relative">
        <div className="relative h-full w-full overflow-hidden bg-[#f0efef] bg-cover bg-[50%] bg-no-repeat md:rounded-lg md:pt-1/2.5 max-md:rounded-md max-md:pt-full">
          <Image
            alt={name}
            className="absolute left-0 top-0 object-cover opacity-100 transition-opacity"
            src={image_url}
            width={0}
            height={0}
            sizes="100vw"
            priority
            style={{ width: '100%', height: '100%' }}
          />
        </div>
        {price >= 3 && (
          <>
            <div className="absolute -left-1 top-1 flex h-5 w-12 items-center justify-center rounded-r-sm bg-green-700 text-xs font-medium text-white md:top-2.5 lg:top-3">
              Promo
            </div>
            <div className="absolute -left-1 top-6 border-l-4 border-t-4 border-l-transparent border-t-green-700 md:top-7 lg:top-8"></div>
          </>
        )}
        <Image
          src="/images/icons/icon-preferred.svg"
          alt="Restoran Pilihan"
          width={0}
          height={0}
          className="absolute -bottom-2 -right-2 block size-6 md:hidden max-md:size-4"
        />
      </div>
    </div>
  )
}

export { BusinessCard, BusinessWrapper }

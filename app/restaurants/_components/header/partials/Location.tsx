import { Spinner } from '@/components/custom/spinner'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@/components/ui/drawer'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import { useState } from 'react'
import { validateLocation } from '@/app/action'
import { useAtom } from 'jotai'
import { locationAtom } from '@/store/location'

export default function HeaderLocation() {
  const [open, setOpen] = useState(false)

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <button className="mt-2 inline-flex h-8 items-center rounded-full bg-zinc-100 px-3 py-1.5 hover:bg-zinc-200 sm:h-9">
          <PinSvg />
          <span className="ml-1.5 line-clamp-1 text-sm font-normal">Kosan</span>
        </button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-lg">
          <DrawerHeader className="text-left">
            <DrawerTitle>Select your location</DrawerTitle>
            <DrawerDescription>
              Choose your location to see the best restaurants around you
            </DrawerDescription>
          </DrawerHeader>

          <LocationForm onLocationChange={() => setOpen(false)} />

          <DrawerFooter className="pt-2">
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

const LocationForm = ({
  onLocationChange
}: {
  onLocationChange?: () => void
}) => {
  const [, setLocation] = useAtom(locationAtom)
  const [loadingLocation, setLoadingLocation] = useState(false)

  const handleLocation = () => {
    setLoadingLocation(true)

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        })
        validateLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        })

        onLocationChange?.()
      },
      (error) => {
        setLoadingLocation(false)
      }
    )
  }

  return (
    <div className="flex h-full flex-col items-center justify-center px-4">
      <div className="w-full">
        <label htmlFor="email" className="sr-only">
          Email
        </label>
        <div className="relative rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <PinSvg />
          </div>
          <Input
            id="email"
            placeholder="Enter your location"
            className="h-10 rounded-full pl-10"
          />
        </div>
      </div>

      <div
        className="mt-6 flex w-full cursor-pointer border-y border-zinc-200 px-2 py-4"
        tabIndex={-1}
        onClick={handleLocation}
      >
        <span className="text-sm font-medium">Use your current location</span>
        <span className="ml-auto">
          {!loadingLocation ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 -960 960 960"
              className="size-5 fill-green-600"
            >
              <path d="M440-42v-80q-125-14-214.5-103.5T122-440H42v-80h80q14-125 103.5-214.5T440-838v-80h80v80q125 14 214.5 103.5T838-520h80v80h-80q-14 125-103.5 214.5T520-122v80h-80Zm40-158q116 0 198-82t82-198q0-116-82-198t-198-82q-116 0-198 82t-82 198q0 116 82 198t198 82Zm0-120q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Z" />
            </svg>
          ) : (
            <Spinner className="size-5 fill-green-600" />
          )}
        </span>
      </div>

      <div className="flex h-full flex-col items-center justify-center py-8 text-sm">
        <div>
          <Image
            src="/images/icons/location.png"
            width={44}
            height={44}
            alt="location"
            priority
          />
        </div>
        <span className="mt-4 max-w-52 text-center text-sm font-normal">
          Turn on location to get better recommendations in your location
        </span>
      </div>
    </div>
  )
}

function PinSvg() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      fill="#e42535"
      className="size-4"
    >
      <path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 400Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Z" />
    </svg>
  )
}

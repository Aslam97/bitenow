import { atom } from 'jotai'

export const locationAtom = atom<Coords>({
  latitude: 0,
  longitude: 0
})

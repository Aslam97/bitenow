import * as React from 'react'

interface GeolocationState {
  loading: boolean
  accuracy: number | null
  altitude: number | null
  altitudeAccuracy: number | null
  heading: number | null
  latitude: number | null
  longitude: number | null
  speed: number | null
  timestamp: number | null
  error: GeolocationPositionError | null
}

interface GeolocationOptions extends PositionOptions {}

export function useGeolocation(
  options: GeolocationOptions = {}
): [GeolocationState, () => void] {
  const [state, setState] = React.useState<GeolocationState>({
    loading: false,
    accuracy: null,
    altitude: null,
    altitudeAccuracy: null,
    heading: null,
    latitude: null,
    longitude: null,
    speed: null,
    timestamp: null,
    error: null
  })

  const optionsRef = React.useRef<GeolocationOptions>(options)

  const fetchGeolocation = () => {
    setState((s) => ({
      ...s,
      loading: true,
      error: null
    }))

    const onEvent = ({ coords, timestamp }: GeolocationPosition) => {
      setState({
        loading: false,
        timestamp,
        latitude: coords.latitude,
        longitude: coords.longitude,
        altitude: coords.altitude,
        accuracy: coords.accuracy,
        altitudeAccuracy: coords.altitudeAccuracy,
        heading: coords.heading,
        speed: coords.speed,
        error: null
      })
    }

    const onEventError = (error: GeolocationPositionError) => {
      setState((s) => ({
        ...s,
        loading: false,
        error
      }))
    }

    navigator.geolocation.getCurrentPosition(
      onEvent,
      onEventError,
      optionsRef.current
    )

    const watchId = navigator.geolocation.watchPosition(
      onEvent,
      onEventError,
      optionsRef.current
    )

    return () => {
      navigator.geolocation.clearWatch(watchId)
    }
  }

  return [state, fetchGeolocation]
}

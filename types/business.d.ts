interface BusinessCuisineModel {
  name: string
  slug: string
}

interface BusinessTransactionModel {
  name: string
  slug: string
}

interface ReviewAuthorModel {
  id: string
  name: string
  email: string
}

interface BusinessReviewModel {
  id: string
  rating: number
  comment: string
  helpful: number
  thanks: number
  love_this: number
  oh_no: number
  author: ReviewAuthorModel
}

interface BusinessOpeningHourModel {
  day: number
  open: string
  close: string
}

interface BusinessModel {
  id: string
  name: string
  slug: string
  image_url: string
  url: string
  phone: string
  display_phone: string
  price: number
  price_display: string
  cuisines: BusinessCuisineModel[]
  transaction: BusinessTransactionModel[]
  coordinates: {
    latitude: number
    longitude: number
  }
  location: {
    address1: string
    address2: string
    city: string
    zip_code: string
    country: string
    state: string
    display_address: string
  }
  rating: number
  reviews_count: number
  distance: number
  reviews: BusinessReviewModel[]
  opening_hours: BusinessOpeningHourModel[]
  is_closed: boolean
}

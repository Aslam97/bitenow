interface JsonResource<T> {
  data: T
}

interface PaginationMeta {
  current_page: number
  from: number
  last_page: number
  links?: {
    url: string | null
    label: string
    active: boolean
  }[]
  path: string
  per_page: number
  to: number
  total: number
}

interface PaginationLinks {
  first: string
  last: string
  prev: string
  next: string
}

interface JsonResourceWithPagination<T> {
  data: T[]
  links: PaginationLinks
  meta: PaginationMeta
}

interface PaginationState {
  page: number
  paginate: number
}

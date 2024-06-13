interface FilterState extends Record<string, any> {
  location?: string | null
  term?: string | null
  cuisines?: string | string[] | null
  transactions?: string | string[] | null
  radius?: number | null
  open_now?: boolean | null
  open_at?: string | null
  price?: string | number | null
}

interface ParamState {
  include: string
  filter: FilterState
  sort_by: string
  latitude: number | null
  longitude: number | null
  paginate: number
  page: number
}

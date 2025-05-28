export interface SearchResult {
  query: string
  totalHits: number
  currentPage: number
  totalPages: number
  hits: SearchResultItem[]
}

export interface SearchResultItem {
  title: string
  subtitle: string
  summary: string
  image?: string
  altText: string
  url: string
}

export interface SearchConfig {
  type: 'typesense' | 'algolia'
  host: string
  port: number
  protocol: string
  apiKey: string
  applicationId: string
  collectionName: string
  searchAsYouType: boolean
  searchQuery: string
}

export interface SearchParams {
  query?: string
  query_by?: string
  page?: number
  page_size?: number
}

export interface WPPost {
  ID?: string
  algolia_timestamp?: number
  blog_id?: number
  categories?: string[]
  content?: string
  objectID: string
  origin_site?: string
  origin_site_url?: string
  partial_object_distinct_key?: string
  partial_object_total_amount?: number
  permalink?: string
  post_date?: number
  post_date_formatted?: string
  post_excerpt?: string
  post_modified?: number
  post_title?: string
  post_type?: string
  post_type_name?: string
  tags?: string[]
  thumbnail?: string
  thumbnail_alt?: string
  uuid?: string
  embedding?: number[]
  id?: string
}

export interface SearchOperations {
  search(params: SearchParams): Promise<SearchResult>
}
export interface HtmlOperations {
  getInputField: () => HTMLInputElement
  getPaginationContainer: () => HTMLElement
  setStats: (result: SearchResult) => void
  setItems: (result: SearchResult) => void
  setPagination: (result: SearchResult) => void
  reset: () => void
}
export interface PaginationOperations {
  isLastPage: () => boolean
  isFirstPage: () => boolean
  getVisibleItems: (maxItems?: number) => number[]
}

export interface EventOperations {
  registerSearchBox: (
    element: HTMLInputElement,
    callback: (params: SearchParams) => void
  ) => void
  registerPagination: (
    element: HTMLElement,
    callback: (page: number) => void
  ) => void
}

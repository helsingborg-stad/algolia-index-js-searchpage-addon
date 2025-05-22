import * as Typesense from 'typesense'
import type {
  SearchConfig,
  SearchParams,
  SearchResult,
  SearchOperations,
  WPPost,
} from './types'
import { SearchResultItem } from './types.js'

type TypesenseItem = {
  document: WPPost
}

export interface TypesenseParams {
  per_page?: number
  filter_by?: string
  sort_by?: string
  query_by?: string
  query?: string
  page?: number
  q?: string
}

export const typesenseDataTransform = (
  response: TypesenseItem[]
): SearchResultItem[] => {
  return response.map(
    item =>
      ({
        title: item.document.post_title || '',
        summary: item.document.post_excerpt || '',
        subtitle: item.document.origin_site || '',
        image: item.document.thumbnail || '',
        altText: item.document.thumbnail_alt || '',
        url: item.document.permalink || '',
      }) as SearchResultItem
  )
}

export const typesenseParamTransform = (
  params: SearchParams
): TypesenseParams => {
  return {
    per_page: params.page_size,
    query_by: params.query_by,
    page: params.page,
    q: params.query,
  }
}

export const TypesenseAdapter = (config: SearchConfig): SearchOperations => {
  const client = new Typesense.Client({
    nodes: [config],
    apiKey: config.apiKey,
    connectionTimeoutSeconds: 2,
  })

  return {
    search: async (params: SearchParams): Promise<SearchResult> => {
      const result = await client
        .collections<WPPost>(config.collectionName)
        .documents()
        .search(typesenseParamTransform(params))

      return {
        query: params.query || '',
        total: result.found,
        page: result.page,
        hits: typesenseDataTransform(result.hits ?? []),
      }
    },
  }
}

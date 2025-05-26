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

export interface TypesenseNativeParams {
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
): TypesenseNativeParams => {
  return {
    per_page: params.page_size || 20,
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
        totalHits: result.found,
        totalPages: Math.ceil(result.found / (params.page_size ?? 20)),
        currentPage: result.page,
        hits: typesenseDataTransform(result.hits ?? []),
      }
    },
  }
}

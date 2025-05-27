import * as Typesense from 'typesense'
import type {
  SearchConfig,
  SearchParams,
  SearchResult,
  SearchOperations,
  WPPost,
} from './types'
import { SearchResultItem } from './types.js'
import { decodeHtml } from './mappers'

/**
 * Native Queryparameters for Typesense (Partial)
 */
export interface TypesenseNativeParams {
  per_page?: number
  filter_by?: string
  sort_by?: string
  query_by?: string
  query?: string
  page?: number
  q?: string
  highlight_full_fields?: string
}

/**
 * Native document structure for Typesense (Partial)
 */
interface TypesenseItem {
  document: WPPost
  highlight?: TypesenseHighlight<WPPost>
}

type TypesenseHighlight<T> = T extends string | number
  ? TypeSenseHighlightObject
  : {
      [K in keyof T]?: TypesenseHighlight<T[K]>
    }
interface TypeSenseHighlightObject {
  value?: string
}

/**
 * Typesense response to generic format conversion
 * @param response The response from Typesense search
 * @returns A generic search result item array
 */
export const typesenseDataTransform = (
  response: TypesenseItem[]
): SearchResultItem[] => {
  // Extract highlighted values from Typesense response
  const getHighlightValue = (
    item: TypesenseItem,
    name: 'post_title' | 'post_excerpt'
  ): string => {
    if (item.highlight && item.highlight[name]) {
      return decodeHtml(item.highlight[name]?.value ?? '')
    }
    return item.document[name] || ''
  }

  return response.map(item => ({
    title: getHighlightValue(item, 'post_title'),
    summary: getHighlightValue(item, 'post_excerpt'),
    subtitle: item.document.origin_site || '',
    image: item.document.thumbnail?.replaceAll('/wp/', '/'),
    altText: item.document.thumbnail_alt || '',
    url: item.document.permalink || '',
  }))
}
/**
 * Converts generic search parameters to Typesense native query parameters
 * @param params The search query parameters to transform
 * @returns The native Typesense query parameters
 */
export const typesenseParamTransform = (
  params: SearchParams
): TypesenseNativeParams => {
  return {
    per_page: params.page_size || 20,
    query_by: params.query_by || 'post_title,post_excerpt',
    page: params.page,
    q: params.query,
    highlight_full_fields: 'post_title,post_excerpt',
  }
}

/**
 * The Adapter used to query Typesense
 * @param config The configuration of the Typesense connection
 * @returns A search operations object with a search method
 */
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
        currentPage: result.page || 1,
        hits: typesenseDataTransform(result.hits ?? []),
      }
    },
  }
}

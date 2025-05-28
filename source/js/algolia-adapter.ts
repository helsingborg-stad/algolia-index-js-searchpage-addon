import { liteClient } from 'algoliasearch/lite'

import type {
  SearchConfig,
  GenericSearchQueryParams,
  GenericSearchResult,
  SearchService,
  GenericSearchResultItem,
  WPPost,
} from './types'
import { decodeHtml } from './mappers'

/**
 * Partial native Queryparameters
 */
export interface AlgoliaNativeQueryParams {
  hitsPerPage?: number
  page?: number
  query?: string
}
/**
 * Partial document structure
 */
interface AlgoliaSearchResultItem extends WPPost {
  _highlightResult?: {
    post_title?: {
      value: string
    }
    post_excerpt?: {
      value: string
    }
  }
}
/**
 * Supported highlight fields
 */
type AlgoliaHighlightField = 'post_title' | 'post_excerpt'

/**
 * Native response to generic format conversion
 * @param response The response from the search adapter
 * @returns A generic search result item array
 */
export const algoliaDataTransform = (
  response: AlgoliaSearchResultItem[]
): GenericSearchResultItem[] => {
  const getHighlightValue = (
    item: AlgoliaSearchResultItem,
    name: AlgoliaHighlightField
  ): string => {
    if (item._highlightResult && item._highlightResult[name]) {
      return decodeHtml(item._highlightResult[name].value)
    }
    return item[name] || ''
  }
  return response.map(item => ({
    title: getHighlightValue(item, 'post_title'),
    summary: getHighlightValue(item, 'post_excerpt'),
    subtitle: item.origin_site || '',
    image: item.thumbnail?.replaceAll('/wp/', '/'),
    altText: item.thumbnail_alt || '',
    url: item.permalink || '',
  }))
}

/**
 * Converts generic search parameters to Algolia native query parameters
 * @param params The search query parameters to transform
 * @returns The native Algolia query parameters
 */
export const algoliaParamTransform = (
  params: GenericSearchQueryParams
): AlgoliaNativeQueryParams => {
  return {
    hitsPerPage: params?.page_size ?? 20,
    page: params.page ? params.page - 1 : undefined,
    query: params.query,
  }
}

/**
 * The Adapter used to query Algolia
 * @param config The configuration of the Algolia connection
 * @returns A search operations object with a search method
 */
export const AlgoliaAdapter = (config: SearchConfig): SearchService => {
  const searchClient = liteClient(config.applicationId, config.apiKey)

  return {
    search: async (
      params: GenericSearchQueryParams
    ): Promise<GenericSearchResult> => {
      const { results } =
        await searchClient.searchForHits<AlgoliaSearchResultItem>({
          requests: [
            {
              indexName: config.collectionName,
              ...algoliaParamTransform(params),
            },
          ],
        })
      return {
        query: params.query ?? '',
        totalHits: results[0]?.nbHits ?? 0,
        currentPage: results[0]?.page ? results[0]?.page + 1 : 1,
        totalPages: results[0]?.nbPages ?? 1,
        hits: algoliaDataTransform(results[0]?.hits ?? []),
      }
    },
  }
}

import { liteClient } from 'algoliasearch/lite'

import type {
  SearchConfig,
  SearchParams,
  SearchResult,
  SearchOperations,
  SearchResultItem,
  WPPost,
} from './types'

export interface AlgoliaNativeParams {
  hitsPerPage?: number
  page?: number
  query?: string
}

export const algoliaDataTransform = (
  response: WPPost[]
): SearchResultItem[] => {
  const decodeHtml = (html: string): string => {
    const txt = document.createElement('textarea')
    txt.innerHTML = html
    return txt.value
  }

  const getWPValue = (
    item: WPPost,
    name: 'post_title' | 'post_excerpt'
  ): string => {
    if (item._highlightResult && item._highlightResult[name]) {
      return decodeHtml(item._highlightResult[name].value)
    }
    return item[name] || ''
  }
  return response.map(
    item =>
      ({
        title: getWPValue(item, 'post_title'),
        summary: getWPValue(item, 'post_excerpt'),
        subtitle: item.origin_site || '',
        image: item.thumbnail?.replaceAll('/wp/', '/') ?? '',
        altText: item.thumbnail_alt || '',
        url: item.permalink || '',
      }) as SearchResultItem
  )
}

export const algoliaParamTransform = (
  params: SearchParams
): AlgoliaNativeParams => {
  return {
    hitsPerPage: params?.page_size ?? 20,
    page: params.page ? params.page - 1 : undefined,
    query: params.query,
  }
}

export const AlgoliaAdapter = (config: SearchConfig): SearchOperations => {
  const searchClient = liteClient(config.applicationId, config.apiKey)

  return {
    search: async (params: SearchParams): Promise<SearchResult> => {
      const { results } = await searchClient.searchForHits<WPPost>({
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
        currentPage: results[0]?.page ?? 0,
        totalPages: results[0]?.nbPages ?? 0,
        hits: algoliaDataTransform(results[0]?.hits ?? []),
      }
    },
  }
}

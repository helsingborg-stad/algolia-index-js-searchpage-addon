import {
  HtmlOperations,
  SearchResultItem,
  SearchResult,
  SearchParams,
} from './types'

export const HtmlService = (params: SearchParams): HtmlOperations => {
  const [
    templateHitHtml = '',
    templateNoImgHtml = '',
    templateNoResults = '',
    templateStats = '',
    templatePaginationItem = '',
    templatePaginationIcon = '',
  ] = [
    'template[data-js-search-hit-template]',
    'template[data-js-search-hit-noimage-template]',
    'template[data-js-search-page-no-results]',
    'template[data-js-search-page-stats]',
    'template[data-js-search-page-pagination-item]',
    'template[data-js-search-page-pagination-icon]',
  ].map(selector => document.querySelector(selector)?.innerHTML ?? '')

  const [searchInput, searchContainer, searchPagination] = [
    '[data-js-search-page-search-input]',
    '[data-js-search-page-hits]',
    '[data-js-search-page-pagination]',
  ].map(
    selector =>
      document.querySelector(selector) || document.createElement('div')
  ) as [HTMLInputElement, Element, Element]

  const [
    translateHit,
    translateNoResults,
    translateStats,
    translatePaginationItem,
    translatePaginationIcon,
  ] = [
    (item: SearchResultItem): string =>
      (item.image ? templateHitHtml : templateNoImgHtml)
        .replaceAll('{SEARCH_JS_HIT_HEADING}', item.title)
        .replaceAll('{SEARCH_JS_HIT_SUBHEADING}', item.subtitle)
        .replaceAll('{SEARCH_JS_HIT_EXCERPT}', item.summary)
        .replaceAll('{SEARCH_JS_HIT_IMAGE_URL}', item.image)
        .replaceAll('{SEARCH_JS_HIT_IMAGE_ALT}', item.altText)
        .replaceAll('{SEARCH_JS_HIT_LINK}', item.url),
    (query: string): string =>
      templateNoResults.replaceAll('{ALGOLIA_JS_SEARCH_QUERY}', query),
    ({ totalHits, query }: SearchResult): string =>
      templateStats
        .replaceAll('{ALGOLIA_JS_STATS_COUNT}', String(totalHits))
        .replaceAll('{ALGOLIA_JS_STATS_QUERY}', query),
    (text: string, color: string, className: string): string =>
      templatePaginationItem
        .replaceAll('{ALGOLIA_JS_PAGINATION_TEXT}', text)
        .replaceAll('{ALGOLIA_JS_PAGINATION_HREF}', '#')
        .replaceAll('{ALGOLIA_JS_PAGINATION_COLOR}', color)
        .replaceAll('{ALGOLIA_JS_PAGINATION_CLASS}', className)
        .replaceAll('{ALGOLIA_JS_PAGINATION_PAGE_NUMBER}', text),
    (): string =>
      templatePaginationIcon
        .replaceAll('{ALGOLIA_JS_PAGINATION_TEXT}', '')
        .replaceAll('{ALGOLIA_JS_PAGINATION_HREF}', ''),
  ]
  // Set initial value
  searchInput.value = params.query || ''

  const append = (parent: Element, content: string): void =>
    parent.insertAdjacentHTML('beforeend', content)

  return {
    getInputField: () => searchInput,
    getPaginationContainer: () => searchPagination,

    reset: () => {
      searchContainer.innerHTML = ''
      searchPagination.innerHTML = ''
    },
    setStats: (result: SearchResult): void => {
      append(searchContainer, translateStats(result))
    },
    setItems: (result: SearchResult): void => {
      // Has results
      if (result.hits.length > 0) {
        result.hits.forEach(hit => append(searchContainer, translateHit(hit)))
      } else {
        // No results
        append(searchContainer, translateNoResults(result.query))
      }
    },
    setPagination: (result: SearchResult): void => {
      new Array(result.totalPages).fill(0).forEach((_, index) => {
        const [color, className] =
          index === result.currentPage
            ? ['primary', 'c-pagination--is-active']
            : ['default', '']

        append(
          searchPagination,
          translatePaginationItem(String(index + 1), color, className)
        )
      })
    },
  }
}

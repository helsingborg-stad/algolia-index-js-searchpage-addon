import { PaginationFactory } from './pagination'
import {
  HtmlRenderService,
  GenericSearchResultItem,
  GenericSearchResult,
  GenericSearchQueryParams,
} from './types'

/**
 * Queries template content from the HTML document
 * @returns A string array of HTML templates
 */
const getHtmlTemplates = (): string[] =>
  [
    'template[data-js-search-hit-template]',
    'template[data-js-search-hit-noimage-template]',
    'template[data-js-search-page-no-results]',
    'template[data-js-search-page-stats]',
    'template[data-js-search-page-pagination-item]',
    'template[data-js-search-page-pagination-icon]',
  ].map(selector => document.querySelector(selector)?.innerHTML ?? '')

/**
 * Queries elements from the HTML document
 * @returns An array of HTML elements
 */
const getHtmlElements = (): HTMLElement[] =>
  [
    '[data-js-search-page-search-input]',
    '[data-js-search-page-hits]',
    '[data-js-search-page-pagination]',
  ].map(
    selector =>
      document.querySelector(selector) || document.createElement('div')
  )

/**
 * Creates a service for manipulating HTML related to search results
 * @param params Generic search query parameters
 * @returns A service that provides methods to manipulate HTML for search results
 */
export const HtmlRenderFactory = (
  params: GenericSearchQueryParams
): HtmlRenderService => {
  const [
    templateHitHtml = '',
    templateNoImgHtml = '',
    templateNoResults = '',
    templateStats = '',
    templatePaginationItem = '',
    templatePaginationIcon = '',
  ] = getHtmlTemplates()

  const [searchInput, searchContainer, searchPagination] =
    getHtmlElements() as [HTMLInputElement, HTMLElement, HTMLElement]

  const [
    translateHit,
    translateNoResults,
    translateStats,
    translatePaginationItem,
    translatePaginationIcon,
  ] = [
    (item: GenericSearchResultItem): string =>
      (item.image ? templateHitHtml : templateNoImgHtml)
        .replaceAll('{SEARCH_JS_HIT_HEADING}', item.title)
        .replaceAll('{SEARCH_JS_HIT_SUBHEADING}', item.subtitle)
        .replaceAll('{SEARCH_JS_HIT_EXCERPT}', item.summary)
        .replaceAll('{SEARCH_JS_HIT_IMAGE_URL}', item.image ?? '')
        .replaceAll('{SEARCH_JS_HIT_IMAGE_ALT}', item.altText)
        .replaceAll('{SEARCH_JS_HIT_LINK}', item.url),
    (): string => templateNoResults,
    ({ totalHits, query }: GenericSearchResult): string =>
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
    (page: string, icon: string): string =>
      templatePaginationIcon
        .replaceAll('{ALGOLIA_JS_PAGINATION_ICON}', icon)
        .replaceAll('{ALGOLIA_JS_PAGINATION_HREF}', '#')
        .replaceAll('{ALGOLIA_JS_PAGINATION_PAGE_NUMBER}', page),
  ]
  // Set initial value
  searchInput.value = params.query || ''

  const append = (parent: Element, content: string): void =>
    parent.insertAdjacentHTML('beforeend', content)

  return {
    /**
     * Returns the input field for search queries
     * @returns The search input field element
     */
    getInputField: () => searchInput,
    /**
     * Returns the pagination container for search results
     * @returns The pagination container element
     */
    getPaginationContainer: () => searchPagination,
    /**
     * Resets the search results and pagination
     */
    reset: () => {
      searchContainer.innerHTML = ''
      searchPagination.innerHTML = ''
    },
    /**
     * Render stats for the search results
     * @param result The search result to translate into HTML
     */
    renderStats: (result: GenericSearchResult): void => {
      append(searchContainer, translateStats(result))
    },
    /**
     * Render search result items
     * @param result The search result to translate into HTML
     */
    renderItems: (result: GenericSearchResult): void => {
      if (result.hits.length > 0) {
        // Has results
        result.hits.forEach(hit => append(searchContainer, translateHit(hit)))
      } else {
        // No results
        append(searchContainer, translateNoResults())
      }
    },
    /**
     * Render pagination for the search results
     * @param result The search result to translate into HTML pagination
     */
    renderPagination: (result: GenericSearchResult): void => {
      const service = PaginationFactory(result)

      // Back button
      if (!service.isFirstPage()) {
        append(
          searchPagination,
          translatePaginationIcon(
            String(result.currentPage - 1),
            'keyboard_arrow_left'
          )
        )
      }
      service.getVisibleItems().forEach(id => {
        const [color, className] =
          id === result.currentPage
            ? ['primary', 'c-pagination--is-active']
            : ['default', '']

        append(
          searchPagination,
          translatePaginationItem(String(id), color, className)
        )
      })
      // Forward button
      if (!service.isLastPage()) {
        append(
          searchPagination,
          translatePaginationIcon(
            String(result.currentPage + 1),
            'keyboard_arrow_right'
          )
        )
      }
    },
  }
}

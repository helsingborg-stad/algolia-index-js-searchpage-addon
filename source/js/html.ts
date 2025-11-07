import { PaginationFactory } from './pagination'
import {
  HtmlRenderService,
  GenericSearchResultItem,
  GenericSearchResult,
  GenericSearchQueryParams,
  FacetResult,
  FacetValue,
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
    'template[data-js-search-page-facet]',
    'template[data-js-search-page-facet-item]',
  ].map(selector => document.querySelector(selector)?.innerHTML ?? '')

/**
 * Queries elements from the HTML document
 * @returns An array of HTML elements
 */
const getHtmlElements = (): (HTMLElement | null)[] =>
  [
    '[data-js-search-page-search-input]',
    '[data-js-search-page-hits]',
    '[data-js-search-page-stat]',
    '[data-js-search-page-pagination]',
    '[data-js-search-page-facets]',
  ].map(selector => document.querySelector(selector))

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
    templateFacet = '',
    templateFacetItem = '',
  ] = getHtmlTemplates()

  const [searchInput, searchContainer, searchPagination, searchFacets, searchHitsContainer] =
    getHtmlElements() as [
      HTMLInputElement | null,
      HTMLElement | null,
      HTMLElement | null,
      HTMLElement | null,
    ]

  // Provide defaults for required elements
  const safeSearchInput =
    searchInput || (document.createElement('input') as HTMLInputElement)
  const safeSearchContainer =
    searchContainer || document.createElement('div')
  const safeSearchPagination =
    searchPagination || document.createElement('div')
  const safeSearchHitsContainer =
    searchContainer || document.createElement('div')

  /**
   * Helper to check if facets container is available
   * @returns true if facets container exists in the DOM
   */
  const hasFacetsContainer = (): boolean => searchFacets !== null

  const [
    translateHit,
    translateNoResults,
    translateStats,
    translatePaginationItem,
    translatePaginationIcon,
    translateFacet,
    translateFacetItem,
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
    (facet: FacetResult, itemsHtml: string): string =>
      templateFacet
        .replaceAll('{ALGOLIA_JS_FACET_LABEL}', facet.label)
        .replaceAll('{ALGOLIA_JS_FACET_ATTRIBUTE}', facet.attribute)
        .replaceAll('{ALGOLIA_JS_FACET_ITEMS}', itemsHtml),
    (facet: FacetResult, value: FacetValue): string =>
      templateFacetItem
        .replaceAll('{ALGOLIA_JS_FACET_VALUE}', value.value)
        .replaceAll('{ALGOLIA_JS_FACET_COUNT}', String(value.count))
        .replaceAll('{ALGOLIA_JS_FACET_ATTRIBUTE}', facet.attribute),
  ]
  // Set initial value
  safeSearchInput.value = params.query || ''

  const append = (parent: Element, content: string): void =>
    parent.insertAdjacentHTML('beforeend', content)

  return {
    /**
     * Returns the input field for search queries
     * @returns The search input field element
     */
    getInputField: () => safeSearchInput,
    /**
     * Returns the pagination container for search results
     * @returns The pagination container element
     */
    getPaginationContainer: () => safeSearchPagination,
    /**
     * Returns the facets container for search filters
     * @returns The facets container element or null if not available
     */
    getFacetsContainer: () => searchFacets,
    /**
     * Resets the search results and pagination
     */
    reset: () => {
      safeSearchContainer.innerHTML = ''
      safeSearchPagination.innerHTML = ''
      if (hasFacetsContainer() && searchFacets) {
        searchFacets.innerHTML = ''
      }
    },
    /**
     * Render stats for the search results
     * @param result The search result to translate into HTML
     */
    renderStats: (result: GenericSearchResult): void => {
      append(safeSearchHitsContainer, translateStats(result))
    },
    /**
     * Render search result items
     * @param result The search result to translate into HTML
     */
    renderItems: (result: GenericSearchResult): void => {
      if (result.hits.length > 0) {
        // Has results
        result.hits.forEach(hit => append(safeSearchContainer, translateHit(hit)))
      } else {
        // No results
        append(safeSearchContainer, translateNoResults())
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
          safeSearchPagination,
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
          safeSearchPagination,
          translatePaginationItem(String(id), color, className)
        )
      })
      // Forward button
      if (!service.isLastPage()) {
        append(
          safeSearchPagination,
          translatePaginationIcon(
            String(result.currentPage + 1),
            'keyboard_arrow_right'
          )
        )
      }
    },
    /**
     * Render facets for the search results
     * @param result The search result to translate into HTML facets
     */
    renderFacets: (result: GenericSearchResult, facetFilters?: string[][]): void => {
      // Prevent facet change events during rendering
      const win = window as Window & { setRenderingFacets?: (state: boolean) => void };
      if (typeof win.setRenderingFacets === 'function') {
        win.setRenderingFacets(true);
      }
      if (searchFacets) {
        searchFacets.innerHTML = '';
      }
      if (
        !hasFacetsContainer() ||
        !searchFacets ||
        !result.facets ||
        result.facets.length === 0
      ) {
        if (typeof win.setRenderingFacets === 'function') {
          win.setRenderingFacets(false);
        }
        return;
      }
      const selectedFilters = Array.isArray(facetFilters) ? facetFilters : [];
      const selectedSet = new Set(selectedFilters.flat());
      result.facets.forEach(facet => {
        const itemsHtml = facet.values
          .map(value => {
            const filterStr = `${facet.attribute}:${value.value}`;
            const checked = selectedSet.has(filterStr) ? 'checked' : '';
            return translateFacetItem(facet, value).replace(
              '<input ',
              `<input ${checked} `
            );
          })
          .join('');
        append(searchFacets, translateFacet(facet, itemsHtml));
      });
      // Re-enable facet change events after rendering
      if (typeof win.setRenderingFacets === 'function') {
        win.setRenderingFacets(false);
      }
    },
  }
}

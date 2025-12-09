import { FacetStorage } from './facetStorage';
import { PaginationFactory } from './pagination';
import type {
	FacetResult,
	FacetValue,
	GenericSearchQueryParams,
	GenericSearchResult,
	GenericSearchResultItem,
	HtmlRenderService,
} from './types';

/**
 * Queries template content from the HTML document
 * @returns A string array of HTML templates
 */
const getHtmlTemplates = (): string[] =>
	[
		'template[data-js-search-hit-template]',
		'template[data-js-search-hit-noimage-template]',
		'template[data-js-search-page-no-results]',
		'template[data-js-search-page-stat]',
		'template[data-js-search-page-pagination-item]',
		'template[data-js-search-page-pagination-icon]',
		'template[data-js-search-page-facet]',
		'template[data-js-search-page-facet-item]',
	].map((selector) => document.querySelector(selector)?.innerHTML ?? '');

/**
 * Queries elements from the HTML document
 * @returns An array of HTML elements
 */
const getHtmlElements = (): (HTMLElement | null)[] =>
	[
		'[data-js-search-page-search-input]',
		'[data-js-search-page-hits]',
		'[data-js-search-page-pagination]',
		'[data-js-search-page-facets]',
		'[data-js-search-page-stats]',
	].map((selector) => document.querySelector(selector));

/**
 * Creates a service for manipulating HTML related to search results
 * @param params Generic search query parameters
 * @returns A service that provides methods to manipulate HTML for search results
 */
export const HtmlRenderFactory = (params: GenericSearchQueryParams): HtmlRenderService => {
	const [
		templateHitHtml = '',
		templateNoImgHtml = '',
		templateNoResults = '',
		templateStats = '',
		templatePaginationItem = '',
		templatePaginationIcon = '',
		templateFacet = '',
		templateFacetItem = '',
	] = getHtmlTemplates();

	const [searchInput, searchContainer, searchPagination, searchFacets, statsContainer] = getHtmlElements() as [
		HTMLInputElement | null,
		HTMLElement | null,
		HTMLElement | null,
		HTMLElement | null,
		HTMLElement | null,
	];

	// Provide defaults for required elements
	const safeSearchInput = searchInput || (document.createElement('input') as HTMLInputElement);
	const safeSearchContainer = searchContainer || document.createElement('div');
	const safeSearchPagination = searchPagination || document.createElement('div');
	const safeSearchFacets = searchFacets || document.createElement('div');
	const safeStatsContainer = statsContainer || document.createElement('div');

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
	];
	// Set initial value
	safeSearchInput.value = params.query || '';

	const append = (parent: Element, content: string): void => parent.insertAdjacentHTML('beforeend', content);

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
		getFacetsContainer: () => safeSearchFacets,
		/**
		 * Resets the search results and pagination
		 */
		reset: () => {
			safeSearchContainer.innerHTML = '';
			safeSearchPagination.innerHTML = '';
			safeSearchFacets.innerHTML = '';
			safeStatsContainer.innerHTML = '';
		},
		/**
		 * Render stats for the search results
		 * @param result The search result to translate into HTML
		 */
		renderStats: (result: GenericSearchResult): void => {
			append(safeStatsContainer, translateStats(result));
		},
		/**
		 * Render search result items
		 * @param result The search result to translate into HTML
		 */
		renderItems: (result: GenericSearchResult): void => {
			if (result.hits.length > 0) {
				// Has results
				result.hits.forEach((hit) => {
					append(safeSearchContainer, translateHit(hit));
				});
			} else {
				// No results
				append(safeSearchContainer, translateNoResults());
			}
		},
		/**
		 * Render pagination for the search results
		 * @param result The search result to translate into HTML pagination
		 */
		renderPagination: (result: GenericSearchResult): void => {
			const service = PaginationFactory(result);

			// Back button
			if (!service.isFirstPage()) {
				append(safeSearchPagination, translatePaginationIcon(String(result.currentPage - 1), 'keyboard_arrow_left'));
			}
			service.getVisibleItems().forEach((id) => {
				const [color, className] = id === result.currentPage ? ['primary', 'c-pagination--is-active'] : ['default', ''];

				append(safeSearchPagination, translatePaginationItem(String(id), color, className));
			});
			// Forward button
			if (!service.isLastPage()) {
				append(safeSearchPagination, translatePaginationIcon(String(result.currentPage + 1), 'keyboard_arrow_right'));
			}
		},
		/**
		 * Render facets for the search results
		 * @param result The search result to translate into HTML facets
		 */
		renderFacets: (result: GenericSearchResult, facetFilters?: string[][]): void => {
			const storage = new FacetStorage();
			const storedFilters = storage.loadFacets();

			if (safeSearchFacets && result.facets) {
				// Add event listener to save selected facets
				const selectedFilters = Array.isArray(facetFilters)
					? facetFilters
					: Array.isArray(storedFilters)
						? storedFilters
						: Object.keys(storedFilters);

				const selectedSet = new Set(selectedFilters.flat());

				result.facets.forEach((facet) => {
					const itemsHtml = facet.values
						.map((value) => {
							const filterStr = `${facet.attribute}:${value.value}`;
							const checked = selectedSet.has(filterStr) ? 'checked' : '';
							return translateFacetItem(facet, value).replace(
								'<input ',
								`<input ${checked} data-filter="${filterStr}" `,
							);
						})
						.join('');
					append(safeSearchFacets, translateFacet(facet, itemsHtml));
				});

				// Add event listener to save selected facets
				safeSearchFacets.addEventListener('change', (event) => {
					const target = event.target as HTMLInputElement;
					if (target && target.dataset.filter) {
						const filter = target.dataset.filter;
						if (target.checked) {
							selectedSet.add(filter);
						} else {
							selectedSet.delete(filter);
						}
						const facetsObject: Record<string, boolean> = {};
						selectedSet.forEach((facet) => {
							facetsObject[facet] = true;
						});
						storage.saveFacets(facetsObject); // Save updated facets
					}
				});

				// Toggle facet notice visibility
				const notice = document.querySelector('div[data-js-search-page-facet-notice]');
				if (notice) {
					notice.setAttribute('aria-hidden', result.facets.length > 0 ? 'true' : 'false');
				}
			}
		},
	};
};

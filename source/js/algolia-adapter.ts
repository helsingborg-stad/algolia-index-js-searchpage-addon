import { liteClient } from "algoliasearch/lite";
import { decodeHtml } from "./mappers";
import type {
	FacetResult,
	FacetValue,
	GenericSearchQueryParams,
	GenericSearchResult,
	GenericSearchResultItem,
	SearchConfig,
	SearchService,
	WPPost,
} from "./types";

/**
 * Partial native Queryparameters
 */
export interface AlgoliaNativeQueryParams {
	hitsPerPage?: number;
	page?: number;
	query?: string;
	facets?: string[];
	facetFilters?: string[][];
}
/**
 * Partial document structure
 */
interface AlgoliaSearchResultItem extends WPPost {
	_highlightResult?: {
		post_title?: {
			value: string;
		};
		post_excerpt?: {
			value: string;
		};
	};
}
/**
 * Supported highlight fields
 */
type AlgoliaHighlightField = "post_title" | "post_excerpt";

/**
 * Native response to generic format conversion
 * @param response The response from the search adapter
 * @returns A generic search result item array
 */
export const algoliaDataTransform = (
	response: AlgoliaSearchResultItem[],
): GenericSearchResultItem[] => {
	const getHighlightValue = (
		item: AlgoliaSearchResultItem,
		name: AlgoliaHighlightField,
	): string => {
		if (item._highlightResult && item._highlightResult[name]) {
			return decodeHtml(item._highlightResult[name].value);
		}
		return item[name] || "";
	};
	return response.map((item) => ({
		title: getHighlightValue(item, "post_title"),
		summary: getHighlightValue(item, "post_excerpt"),
		subtitle: item.origin_site || "",
		image: item.thumbnail?.replaceAll("/wp/", "/"),
		altText: item.thumbnail_alt || "",
		url: item.permalink || "",
	}));
};

/**
 * Converts generic search parameters to Algolia native query parameters
 * @param params The search query parameters to transform
 * @param config The search configuration containing facet settings
 * @returns The native Algolia query parameters
 */
export const algoliaParamTransform = (
	params: GenericSearchQueryParams,
	config?: SearchConfig,
): AlgoliaNativeQueryParams => {
	const facets =
		config?.facetingEnabled && config?.facets
			? config.facets.filter((f) => f.enabled).map((f) => f.attribute)
			: undefined;

	return {
		hitsPerPage: params?.page_size ?? 20,
		page: params.page ? params.page - 1 : undefined,
		query: params.query,
		facets: facets && facets.length > 0 ? facets : undefined,
		facetFilters: params.facetFilters,
	};
};

/**
 * Converts Algolia facet results to generic format
 * @param facets The facets object from Algolia response
 * @param config The search configuration containing facet labels
 * @returns An array of generic facet results
 */
export const algoliaFacetTransform = (
	facets: Record<string, Record<string, number>> | undefined,
	config: SearchConfig,
	renderingContent?: any,
): FacetResult[] => {
	if (!facets || !config.facets) {
		return [];
	}

	return config.facets
		.filter((facetConfig) => facets[facetConfig.attribute])
		.map((facetConfig) => {
			const attribute = facetConfig.attribute;
			const facetData = facets[attribute];

			// read hide + sort rules for this facet
			const facetConfigRC =
				renderingContent?.facetOrdering?.values?.[attribute];
			const hiddenValues: string[] = facetConfigRC?.hide ?? [];
			const sortRemainingBy: "count" | "alpha" | undefined =
				facetConfigRC?.sortRemainingBy;

			// Step 1: remove hidden values
			const values: FacetValue[] = Object.entries(facetData)
				.filter(([value]) => !hiddenValues.includes(value))
				.map(([value, count]) => ({ value, count }));

			// Step 2: apply optional sorting
			if (sortRemainingBy === "count") {
				values.sort((a, b) => b.count - a.count);
			} else if (sortRemainingBy === "alpha") {
				values.sort((a, b) => a.value.localeCompare(b.value));
			}

			return {
				attribute,
				label: facetConfig.label,
				values,
			};
		});
};

/**
 * The Adapter used to query Algolia
 * @param config The configuration of the Algolia connection
 * @returns A search operations object with a search method
 */
export const AlgoliaAdapter = (config: SearchConfig): SearchService => {
	const searchClient = liteClient(config.applicationId, config.apiKey);

	return {
		search: async (
			params: GenericSearchQueryParams,
		): Promise<GenericSearchResult> => {
			const { results } =
				await searchClient.searchForHits<AlgoliaSearchResultItem>({
					requests: [
						{
							indexName: config.collectionName,
							...algoliaParamTransform(params, config),
						},
					],
				});

			return {
				query: params.query ?? "",
				totalHits: results[0]?.nbHits ?? 0,
				currentPage: results[0]?.page ? results[0]?.page + 1 : 1,
				totalPages: results[0]?.nbPages ?? 1,
				hits: algoliaDataTransform(results[0]?.hits ?? []),
				facets: algoliaFacetTransform(
					results[0]?.facets,
					config,
					results[0]?.renderingContent,
				),
			};
		},
	};
};

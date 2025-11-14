import { HtmlEventFactory } from "./event";
import { FacetStorage } from "./facetStorage";
import { HtmlRenderFactory } from "./html";
import { Runner } from "./runner";
import { SearchFactory } from "./search";
import type { GenericSearchQueryParams, SearchConfig } from "./types";

// PHP Provided configuration
declare const searchConfig: SearchConfig;
declare const searchParams: GenericSearchQueryParams;

document.addEventListener("DOMContentLoaded", () => {
	// Load stored facet filters from localStorage
	const storage = new FacetStorage();
	const storedFacets = storage.loadFacets();

	// Convert stored facets object to facetFilters array format
	const facetFilters: string[][] = [];
	if (storedFacets && Object.keys(storedFacets).length > 0) {
		const filtersByAttribute = new Map<string, string[]>();

		Object.keys(storedFacets).forEach((filterStr) => {
			if (storedFacets[filterStr]) {
				// Extract attribute from filter string (format: "attribute:value")
				const colonIndex = filterStr.indexOf(":");
				if (colonIndex > 0) {
					const attribute = filterStr.substring(0, colonIndex);
					if (!filtersByAttribute.has(attribute)) {
						filtersByAttribute.set(attribute, []);
					}
					filtersByAttribute.get(attribute)?.push(filterStr);
				}
			}
		});

		// Convert map to array format expected by Algolia
		filtersByAttribute.forEach((filters) => {
			facetFilters.push(filters);
		});
	}

	// Merge stored facet filters with search params
	const initialParams: GenericSearchQueryParams = {
		...searchParams,
		facetFilters: facetFilters.length > 0 ? facetFilters : undefined,
	};

	Runner(
		HtmlEventFactory(searchConfig),
		SearchFactory(searchConfig),
		HtmlRenderFactory(searchParams),
	).exec(initialParams);
});

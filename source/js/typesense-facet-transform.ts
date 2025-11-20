// Converts Typesense facet results to generic format
// Similar to algoliaFacetTransform, but adapted for Typesense facet structure
import type { FacetResult, FacetValue, SearchConfig } from "./types";

/**
 * Converts Typesense facet results to generic format
 * @param facets The facets object from Typesense response
 * @param config The search configuration containing facet labels
 * @returns An array of generic facet results
 */
export const typesenseFacetTransform = (
  facets: Record<string, Array<{ value: string; count: number }>> | undefined,
  config: SearchConfig
): FacetResult[] => {
  if (!facets || !config.facets) {
    return [];
  }

  return config.facets
    .filter((facetConfig) => facets[facetConfig.attribute])
    .map((facetConfig) => {
      const attribute = facetConfig.attribute;
      const facetData = facets[attribute];
      // Typesense facet data is already an array of { value, count }
      const values: FacetValue[] = facetData.map(({ value, count }) => ({ value, count }));
      return {
        attribute,
        label: facetConfig.label,
        values,
      };
    });
};

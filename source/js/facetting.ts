import { FacetResult, TranslateFacetItem } from './types';

// Assuming translateFacetItem is a function that needs to be imported
const translateFacetItem: TranslateFacetItem = (facet, value) => {
  // Implementation of translateFacetItem
  return `<div>${facet.label}: ${value.value}</div>`;
};

/**
 * Factory for creating a facetting service
 * @returns A service object with methods to handle facets
 */
export const FacettingFactory = () => {
  return {
    /**
     * Extracts selected facets from the provided filters or stored filters
     * @param facetFilters Optional array of facet filters
     * @param storedFilters Stored filters from FacetStorage
     * @returns A Set of selected facets
     */
    getSelectedFacets: (facetFilters?: string[][], storedFilters?: Record<string, boolean>) => {
      return new Set(
        (
          Array.isArray(facetFilters)
            ? facetFilters
            : storedFilters && typeof storedFilters === 'object'
            ? Object.entries(storedFilters)
                .filter(([, selected]) => selected)
                .map(([filterStr]) => filterStr)
            : []
        ).flat()
      );
    },

    /**
     * Renders facet items with selected states
     * @param facet The facet result to render
     * @param selectedSet The set of selected facets
     * @returns HTML string for the facet items
     */
    renderFacetItems: (facet: FacetResult, selectedSet: Set<string>) => {
      return facet.values
        .map(value => {
          const filterStr = `${facet.attribute}:${value.value}`;
          const checked = selectedSet.has(filterStr) ? 'checked' : '';
          return translateFacetItem(facet, value).replace(
            '<input ',
            `<input ${checked} data-filter="${filterStr}" `
          );
        })
        .join('');
    },
  };
};

import type { PaginationService, GenericSearchResult } from "./types";

/**
 * Factory for creating a pagination service
 * @param param0 The search result object containing total pages and current page
 * @param totalPages The total number of pages available in the search result
 * @param currentPage The current page number in the search result
 * @returns A service object with methods to handle pagination
 */
export const PaginationFactory = ({
	totalPages,
	currentPage,
}: GenericSearchResult): PaginationService => {
	return {
		/**
		 * @returns true if the current page is the last page, false otherwise
		 */
		isLastPage: () => currentPage === totalPages,
		/**
		 * @returns true if the current page is the first page, false otherwise
		 */
		isFirstPage: () => currentPage === 1,
		/**
		 * Calculates the visible pagination items based on the current page and total pages
		 * @param maxItems The maximum number of pagination items to display
		 * @returns An array of id's representing the visible pagination items
		 */
		getVisibleItems: (maxItems: number = 4) => {
			// Complete row
			const pages = new Array(totalPages).fill(0).map((_, index) => index + 1);

			const from = Math.max(
				Math.min(currentPage - 2, pages.length - maxItems),
				0,
			);
			return pages.splice(from, maxItems);
		},
	};
};

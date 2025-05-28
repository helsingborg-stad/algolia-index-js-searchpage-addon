import { PaginationService, GenericSearchResult } from './types'

export const PaginationFactory = ({
  totalPages,
  currentPage,
}: GenericSearchResult): PaginationService => {
  return {
    isLastPage: () => currentPage === totalPages,
    isFirstPage: () => currentPage === 1,
    getVisibleItems: (maxItems: number = 4) => {
      // Complete row
      const pages = new Array(totalPages).fill(0).map((_, index) => index + 1)

      const from = Math.max(
        Math.min(currentPage - 2, pages.length - maxItems),
        0
      )
      return pages.splice(from, maxItems)
    },
  }
}

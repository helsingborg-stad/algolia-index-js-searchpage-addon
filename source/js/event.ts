import type { HtmlEventService, SearchConfig } from './types'

/**
 * Factory for binding events to HTML elements
 * @param param0 Configuration values for the search service
 * @param param0.searchAsYouType Whether to trigger search on every input change
 * @returns A service that manages event binding
 */
export const HtmlEventFactory = ({
  searchAsYouType,
}: SearchConfig): HtmlEventService => ({
  /**
   * Binds events related to search input
   * @param element A reference to the search input element
   * @param callback Callback on event triggered
   */
  registerSearchBox: (element, callback) => {
    // Callback on input
    if (searchAsYouType) {
      element?.addEventListener('input', ({ target }) =>
        callback({ query: (target as HTMLInputElement).value })
      )
      return
    }
    // Callback on enter key press
    element?.addEventListener('keydown', (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        callback({ query: (event.target as HTMLInputElement)?.value })
      }
    })
    // Callback on empty field
    element?.addEventListener('input', ({ target }) => {
      const value = (target as HTMLInputElement)?.value

      if (value === '') {
        callback({ query: value })
      }
    })
  },
  /**
   * Binds events related to pagination
   * @param element A reference to the pagination container element
   * @param callback Callback on event triggered
   */
  registerPagination: (element, callback) => {
    ;[...element.querySelectorAll<HTMLAnchorElement>('a')].forEach(element => {
      element.addEventListener('click', (event: MouseEvent) => {
        event.preventDefault()
        const target = event.currentTarget as HTMLElement

        callback(Number(target?.dataset?.value ?? '1'))
        window.scrollTo(0, 0)
      })
    })
  },
  /**
   * Binds events related to facet filtering
   * @param element A reference to the facets container element
   * @param callback Callback on event triggered with selected facet filters
   */
  registerFacets: (element, callback) => {
    if (!element) return

    const getFacetFilters = (): string[][] => {
      const filters: Map<string, string[]> = new Map()

      element
        .querySelectorAll<HTMLInputElement>(
          'input[data-js-facet-filter]:checked'
        )
        .forEach(input => {
          const attribute = input.dataset.facetAttribute || ''
          const value = input.value

          if (!filters.has(attribute)) {
            filters.set(attribute, [])
          }
          filters.get(attribute)?.push(`${attribute}:${value}`)
        })

      return Array.from(filters.values())
    }

    // Handle both checkbox and select/dropdown changes in a single event handler
    element.addEventListener('change', (event: Event) => {
      const target = event.target as HTMLInputElement | HTMLSelectElement

      // Handle checkbox changes
      if (
        target instanceof HTMLInputElement &&
        target.dataset.jsFacetFilter !== undefined
      ) {
        callback(getFacetFilters())
        return
      }

      // Handle select/dropdown changes
      if (
        target instanceof HTMLSelectElement &&
        target.dataset.jsFacetSelect !== undefined
      ) {
        const attribute = target.dataset.facetAttribute || ''
        const value = target.value

        if (value && value !== '') {
          callback([[`${attribute}:${value}`]])
        } else {
          callback([])
        }
      }
    })
  },
})

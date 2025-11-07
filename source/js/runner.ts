import {
  HtmlEventService,
  HtmlRenderService,
  SearchService,
  GenericSearchQueryParams,
  HtmlRunnerService,
} from './types'
import { setUrlSearchParam } from './url-param'

export const Runner = (
  binder: HtmlEventService,
  adapter: SearchService,
  html: HtmlRenderService
): HtmlRunnerService => {
  // Perfom search with the provided query
  const exec = (params: GenericSearchQueryParams) => {
    adapter.search(params).then(result => {
      setUrlSearchParam(params.query)
  html.reset()
  html.renderStats(result)
  html.renderFacets(result, params.facetFilters)
  html.renderItems(result)
  html.renderPagination(result)
      binder.registerPagination(
        html.getPaginationContainer(),
        (page: number) => {
          exec({
            ...params,
            page,
          })
        }
      )
      // Register facet events if facets container exists
      const facetsContainer = html.getFacetsContainer()
      if (facetsContainer) {
        binder.registerFacets(facetsContainer, (facetFilters: string[][]) => {
          exec({
            ...params,
            page: 1, // Reset to first page when filtering
            facetFilters,
          })
        })
      }
    })
  }
  // Register event handlers and callback for input-field
  binder.registerSearchBox(html.getInputField(), exec)

  return {
    exec,
  }
}

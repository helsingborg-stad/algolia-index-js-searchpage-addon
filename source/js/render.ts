import {
  HtmlEventService,
  HtmlService,
  SearchService,
  GenericSearchQueryParams,
  HtmlRenderService,
} from './types'
import { setUrlSearchParam } from './url-param'

export const RenderFactory = (
  binder: HtmlEventService,
  adapter: SearchService,
  html: HtmlService
): HtmlRenderService => {
  // Perfom search with the provided query
  const run = (params: GenericSearchQueryParams) => {
    adapter.search(params).then(result => {
      setUrlSearchParam(params.query)
      html.reset()
      html.setStats(result)
      html.setItems(result)
      html.setPagination(result)
      binder.registerPagination(
        html.getPaginationContainer(),
        (page: number) => {
          run({
            ...params,
            page,
          })
        }
      )
    })
  }
  // Register event handlers and callback for input-field
  binder.registerSearchBox(html.getInputField(), run)

  return {
    run,
  }
}

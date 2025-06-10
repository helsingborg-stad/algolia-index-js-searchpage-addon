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
    })
  }
  // Register event handlers and callback for input-field
  binder.registerSearchBox(html.getInputField(), exec)

  return {
    exec,
  }
}

import {
  EventOperations,
  HtmlOperations,
  SearchOperations,
  SearchParams,
} from './types'
import { setUrlSearchParam } from './url-param'

export const RenderService = (
  binder: EventOperations,
  adapter: SearchOperations,
  html: HtmlOperations
) => {
  // Perfom search with the provided query
  const run = (params: SearchParams) => {
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

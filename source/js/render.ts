import { EventOperations, HtmlOperations, SearchOperations } from './types'
import { setUrlSearchParam } from './url-param'

export const RenderService = (
  binder: EventOperations,
  adapter: SearchOperations,
  html: HtmlOperations
) => {
  const run = (query?: string) => {
    adapter.search({ query }).then(result => {
      setUrlSearchParam(query)
      html.clear()
      html.append(result)
    })
  }
  binder.register(html.getInputField(), run)

  return {
    run,
  }
}

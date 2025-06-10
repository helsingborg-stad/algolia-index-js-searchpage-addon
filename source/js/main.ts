import { HtmlEventFactory } from './event'
import { HtmlRenderFactory } from './html'
import { Runner } from './runner'
import { SearchFactory } from './search'
import { SearchConfig, GenericSearchQueryParams } from './types'

// PHP Provided configuration
declare const searchConfig: SearchConfig
declare const searchParams: GenericSearchQueryParams

document.addEventListener('DOMContentLoaded', function () {
  Runner(
    HtmlEventFactory(searchConfig),
    SearchFactory(searchConfig),
    HtmlRenderFactory(searchParams)
  ).exec(searchParams)
})

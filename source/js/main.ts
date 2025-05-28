import { HtmlEventFactory } from './event'
import { HtmlFactory } from './html'
import { RenderFactory } from './render'
import { SearchFactory } from './search'
import { SearchConfig, GenericSearchQueryParams } from './types'

// PHP Provided configuration
declare const searchConfig: SearchConfig
declare const searchParams: GenericSearchQueryParams

document.addEventListener('DOMContentLoaded', function () {
  RenderFactory(
    HtmlEventFactory(searchConfig),
    SearchFactory(searchConfig),
    HtmlFactory(searchParams)
  ).run(searchParams)
})

import { EventService } from './event-service'
import { HtmlService } from './html-service'
import { RenderService } from './render-service'
import { SearchService } from './search-service'
import { SearchConfig, SearchParams } from './types'

// PHP Provided configuration
declare const searchConfig: SearchConfig
declare const searchParams: SearchParams

document.addEventListener('DOMContentLoaded', function () {
  RenderService(
    EventService(searchConfig),
    SearchService(searchConfig),
    HtmlService(searchParams)
  ).run(searchParams)
})

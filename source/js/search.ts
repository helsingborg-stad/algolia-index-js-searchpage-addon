import { EventService } from './event-service'
import { HtmlService } from './html-service'
import { RenderService } from './render'
import { SearchService } from './search-service'
import { SearchConfig } from './types'

// PHP Provided configuration
declare const searchConfig: SearchConfig

document.addEventListener('DOMContentLoaded', function () {
  RenderService(
    EventService(searchConfig),
    SearchService(searchConfig),
    HtmlService()
  ).run(searchConfig.searchQuery)
})

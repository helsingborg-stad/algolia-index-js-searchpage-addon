import { HtmlOperations, SearchResultItem, SearchResult } from './types'

export const HtmlService = (): HtmlOperations => {
  const [
    templateHitHtml = '',
    templateNoImgHtml = '',
    templateNoResults = '',
    templateStats = '',
  ] = [
    'template[data-js-search-hit-template]',
    'template[data-js-search-hit-noimage-template]',
    'template[data-js-search-page-no-results]',
    'template[data-js-search-page-stats]',
  ].map(selector => document.querySelector(selector)?.innerHTML ?? '')

  const [searchInput, searchContainer] = [
    '[data-js-search-page-search-input]',
    '[data-js-search-page-hits]',
  ].map(
    selector =>
      document.querySelector(selector) || document.createElement('div')
  )

  const [translateHit, translateNoResults, translateStats] = [
    (item: SearchResultItem): string =>
      (item.image ? templateHitHtml : templateNoImgHtml)
        .replaceAll('{SEARCH_JS_HIT_HEADING}', item.title)
        .replaceAll('{SEARCH_JS_HIT_SUBHEADING}', item.subtitle)
        .replaceAll('{SEARCH_JS_HIT_EXCERPT}', item.summary)
        .replaceAll('{SEARCH_JS_HIT_IMAGE_URL}', item.image)
        .replaceAll('{SEARCH_JS_HIT_IMAGE_ALT}', item.altText)
        .replaceAll('{SEARCH_JS_HIT_LINK}', item.url),
    (query: string): string =>
      templateNoResults.replaceAll('{ALGOLIA_JS_SEARCH_QUERY}', query),
    ({ total, query }: SearchResult): string =>
      templateStats
        .replaceAll('{ALGOLIA_JS_STATS_COUNT}', String(total))
        .replaceAll('{ALGOLIA_JS_STATS_QUERY}', query),
  ]
  const append = (content: string): void =>
    searchContainer.insertAdjacentHTML('beforeend', content)

  return {
    getInputField: () => searchInput as HTMLInputElement,
    clear: () => {
      searchContainer.innerHTML = ''
    },
    append: (result: SearchResult): void => {
      if (result.hits.length > 0) {
        append(translateStats(result))
        result.hits.forEach(hit => append(translateHit(hit)))
      } else {
        append(translateNoResults(result.query))
      }
    },
  }
}

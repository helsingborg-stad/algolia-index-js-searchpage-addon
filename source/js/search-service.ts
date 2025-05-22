import { AlgoliaAdapter } from './algolia-adapter'
import { SearchConfig, SearchOperations } from './types'
import { TypesenseAdapter } from './typesense-adapter'

export const SearchService = (config: SearchConfig): SearchOperations => {
  switch (config.type) {
    case 'algolia':
      return AlgoliaAdapter(config)
    case 'typesense':
      return TypesenseAdapter(config)
    default:
      throw new Error(`Unsupported search type: ${config.type}`)
  }
}

import { SearchService } from './search-service'
import { SearchConfig } from './types'

const agconfig: SearchConfig = {
  type: 'algolia',
  port: 0,
  protocol: '',
  host: '',
  collectionName: 'helsingborg-se-ftg',
  applicationId: 'HXD0SP844N',
  apiKey: '020ed1064963a8bafe77281147d2f0e8',
  searchQuery: '',
  searchAsYouType: true,
}

const tsconfig: SearchConfig = {
  type: 'typesense',
  host: 'typesense-test.jls-sto2.elastx.net',
  port: 443,
  protocol: 'https',
  apiKey: 'hbg9RUcLBciUxTahhQ0MR685861Dr4Zfnok5Xr7fwTcYzf3gB4escQHVLRss1HhL',
  collectionName: 'helsingborg-ftp',
  applicationId: '',
  searchQuery: '',
  searchAsYouType: true,
}

const algoliaService = SearchService(agconfig)
const typesenseService = SearchService(tsconfig)

algoliaService
  .search({
    query: 'helsingborg',
  })
  .then(result => {
    console.log(result)
  })
  .catch(error => {
    console.error('Error searching Algolia:', error)
  })

typesenseService
  .search({
    query: 'helsingborg',
    query_by: 'post_title',
  })
  .then(result => {
    console.log(result)
  })
  .catch(error => {
    console.error('Error searching Typesense:', error)
  })

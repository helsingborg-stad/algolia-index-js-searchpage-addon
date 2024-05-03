import algoliasearch from 'algoliasearch/lite';
import instantsearch, { InstantSearch, SearchClient } from 'instantsearch.js';
import { AlgoliaSearchComponentsInterface, AlgoliaSearchDataInterface } from '../interface/interface';

import AlgoliaStats from './algolia-stats';
import AlgoliaPagination from './algolia-pagination';
import AlgoliaHits from './algolia-hits';
import AlgoliaSearchBox from './algolia-searchbox';

declare const algoliaSearchData: AlgoliaSearchDataInterface;
declare const algoliaSearchComponents: AlgoliaSearchComponentsInterface;

class AlgoliaSearch {
  searchData: AlgoliaSearchDataInterface;
  searchComponents: AlgoliaSearchComponentsInterface;
  searchClient: SearchClient;
  search: InstantSearch;

  constructor(searchData: AlgoliaSearchDataInterface, searchComponents: AlgoliaSearchComponentsInterface) {
    this.searchData = searchData;
    this.searchComponents = searchComponents;
    this.searchClient = algoliasearch(searchData.applicationId, searchData.publicApiKey);
    this.search = instantsearch({
      indexName: searchData.indexName,
      searchClient: this.searchClient,
    });

    this.setupAlgoliaComponents();
  }

  public startSearch() {
    this.search.start();
    this.spinner(true);
  }

  private setupAlgoliaComponents() {
    new AlgoliaStats(this.search, this.searchComponents).setup();
    new AlgoliaPagination(this.search, this.searchComponents).setup();
    new AlgoliaHits(this.search, this.searchComponents).setup();
    new AlgoliaSearchBox(this.search, this.searchData).setup();
  }

  private spinner(state: boolean) {
    const content = document.querySelector<HTMLDivElement>('#hits');
    if (state === true) {
      if (content) {
        content.innerHTML = this.searchComponents.loader.html;
      }
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const algoliaSearch = new AlgoliaSearch(algoliaSearchData, algoliaSearchComponents);
  algoliaSearch.startSearch();
});

import React from 'react';
import ReactDOM from 'react-dom';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom';

const searchClient = algoliasearch(
  'latency',
  '6be0576ff61c053d5f9a3225e2a90f76'
);

class AlgoliaIndexJsSearchpage {
  constructor() {
    this.renderModule();
  }

  renderModule() {
      const domElement = document.getElementById('algolia-instantsearch-react');
      if(typeof domElement !== 'undefined') {
        ReactDOM.render(
          <InstantSearch indexName="bestbuy" searchClient={searchClient}>
            <SearchBox />
            <Hits />
          </InstantSearch>,
          domElement
        );
        return; 
      }
      console.log("Could not find mount for algolia-index instant searchbox mountpoint."); 
  }
}

new AlgoliaIndexJsSearchpage();
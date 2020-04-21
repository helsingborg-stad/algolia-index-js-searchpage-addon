import React from 'react';
import ReactDOM from 'react-dom';
import algoliasearch from 'algoliasearch/lite';
import { 
  InstantSearch, 
  SearchBox, 
  Hits, 
  Highlight, 
  RefinementList,
  connectSearchBox
} from 'react-instantsearch-dom';

const searchClient = algoliasearch(
  'latency',
  '6be0576ff61c053d5f9a3225e2a90f76'
);


class AlgoliaIndexJsSearchpage {
  constructor() {
    this.renderModule();
  }

  renderModule() {


    const Hit = ({ hit }) => (
      <p>
        <Highlight attribute="name" hit={hit} tagName="mark"/>
      </p>
    );

    /*const SearchBox = ({ searchbox }) => (
      <div class="input-group input-group-lg">
        <input itemprop="query-input" required="" id="searchkeyword-1" autocomplete="off" class="form-control form-control-lg validated invalid" type="search" name="s" placeholder="What are you looking for?" value="" aria-invalid="true" />
        <span class="input-group-addon-btn">
            <input type="submit" class="btn btn-primary btn-lg" value="Sök" />
        </span>
      </div>
    );*/ 
/*
<form method="get" action="https://developement.local.app" itemprop="potentialAction" itemscope="" itemtype="http://schema.org/SearchAction">
        <meta itemprop="target" content="https://developement.local.app/?s={search_term_string}">

                    <label for="searchkeyword-1" class="sr-only">Search</label>
        
        <div class="input-group input-group-lg">
            <input itemprop="query-input" required="" id="searchkeyword-1" autocomplete="off" class="form-control form-control-lg validated invalid" type="search" name="s" placeholder="What are you looking for?" value="" aria-invalid="true">
            <span class="input-group-addon-btn">
                <input type="submit" class="btn btn-primary btn-lg" value="Sök">
            </span>
        </div>
    </form>*/ 

    const SearchBox = ({ currentRefinement, isSearchStalled, refine }) => (
      <form noValidate="noValidate" action="" role="search" itemprop="potentialAction" itemscope="" itemtype="http://schema.org/SearchAction">
        <label for="searchkeyword" class="sr-only">Search</label>
        <input
          id="searchkeyword"
          class="form-control form-control-lg validated invalid"
          autocomplete="off" 
          type="search"
          value={currentRefinement}
          onChange={event => refine(event.currentTarget.value)}
          required=""
          placeholder="What are you looking for?"
        />
      </form>
    );

    const CustomSearchBox = connectSearchBox(SearchBox);

    const domElement = document.getElementById('algolia-instantsearch-react');

    if(typeof domElement !== 'undefined') {
      ReactDOM.render(
        <InstantSearch indexName="bestbuy" searchClient={searchClient}>
          <CustomSearchBox autoFocus  searchBoxComponent={SearchBox} onSubmit={event => { event.preventDefault(); }} />
          <Hits hitComponent={Hit} />
        </InstantSearch>,
        domElement
      );
      return; 
    }
    console.log("Could not find mount for algolia-index instant searchbox mountpoint."); 
  }
}

new AlgoliaIndexJsSearchpage();
import React from 'react';
import ReactDOM from 'react-dom';
import algoliasearch from 'algoliasearch/lite';
import { 
  InstantSearch, 
  Pagination,
  connectSearchBox,
  connectHits,
  ScrollTo
} from 'react-instantsearch-dom';

const searchClient = algoliasearch(
  'HXD0SP844N',
  'f6ae04dce9282daded14443af2f39661'
);

class AlgoliaIndexJsSearchpage {
  constructor() {
    this.renderModule();
  }

  truncateString(str, length, ending) {
    if (length == null) {
      length = 100;
    }
    if (ending == null) {
      ending = '...';
    }
    if (str.length > length) {
      return str.substring(0, length - ending.length) + ending;
    } else {
      return str;
    }
  };

  renderModule() {

    const Hits = ({ hits }) => (
      <ul className="search-result-list">
        {hits.map(hit => (
          <div key={hit.objectID} className="search-result-item">

            <img src="{hit.thumbnailImage}" />

            <h3><a href="#">{hit.post_title}</a></h3>

            <p>{this.truncateString(hit.content, 400)}</p>

            <div className="search-result-info">
              <span className="search-result-url">
                <a href="{hit.permalink}">
                  {hit.permalink}
                </a>
              </span>
            </div>
          </div>
        ))}
      </ul>
    );

    const SearchBox = ({ currentRefinement, isSearchStalled, refine }) => (
      <form noValidate="noValidate" action="" role="search" itemProp="potentialAction" itemScope="" itemType="http://schema.org/SearchAction">
        <label htmlFor="searchkeyword" className="sr-only">Search</label>
        <input
          id="searchkeyword"
          className="form-control form-control-lg validated invalid"
          autoComplete="off" 
          type="search"
          value={currentRefinement}
          onChange={event => refine(event.currentTarget.value)}
          required=""
          placeholder="What are you looking for?"
        />
      </form>
    );

    const CustomSearchBox   = connectSearchBox(SearchBox);
    const CustomHits = connectHits(Hits);

    const domElement = document.getElementById('algolia-instantsearch-react');

    if(typeof domElement !== 'undefined') {
      ReactDOM.render(
        <InstantSearch indexName="developement-local-app" searchClient={searchClient}>
          
          <ScrollTo>
            <CustomSearchBox autoFocus  searchBoxComponent={SearchBox} onSubmit={event => { event.preventDefault(); }} />
            <CustomHits hitComponent={Hits} />
          </ScrollTo>

          <Pagination />

        </InstantSearch>,
        domElement
      );
      return; 
    }
    console.log("Could not find mount for algolia-index instant searchbox mountpoint."); 
  }
}

new AlgoliaIndexJsSearchpage();
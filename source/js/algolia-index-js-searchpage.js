import React from 'react';
import ReactDOM from 'react-dom';
import algoliasearch from 'algoliasearch/lite';
import { 
  InstantSearch, 
  Pagination,
  connectSearchBox,
  connectHits,
  ScrollTo,
  RefinementList,
  Snippet,
  Highlight,
} from 'react-instantsearch-dom';

const searchClient = algoliasearch(
  'HXD0SP844N',
  'f6ae04dce9282daded14443af2f39661'
);

class Thumbnail extends React.Component {
  render() {
    return (
      <div>
        <p>Hello World!</p>
      </div>
    )
  }
}

class AlgoliaIndexJsSearchpage {
  constructor() {
    this.renderModule();
  }

  renderModule() {

    const Hits = ({ hits }) => (
      <ul className="c-searchresult">
        {hits.map(hit => (
          <div key={hit.objectID} className="c-searchresult__item">

            <div className="c-searchresult__grid">
              
              <div className="c-searchresult__inlay">
                
                <h3 className="c-searchresult__heading">
                  <a href={hit.permalink} className="c-searchresult__href">
                    <Snippet attribute="post_title" hit={hit}></Snippet>
                  </a>
                  <span className="c-searchresult__origin">
                    {hit.origin_site}
                  </span>
                </h3>

                <p className="c-searchresult__content">
                  <Snippet attribute="content" hit={hit}></Snippet>
                </p>

              </div>

              {hit.thumbnail ? <img src={ hit.thumbnail } className="c-searchresult__thumbnail"/> : ''}

            </div>

            <div className="c-searchresult__metainfo">
              <a className="c-searchresult__permalink" href={hit.permalink}>
                <Snippet attribute="permalink" hit={hit}></Snippet>
              </a>
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
          
          <RefinementList attribute="origin_site" />

          <ScrollTo>
            <CustomSearchBox autoFocus searchBoxComponent={SearchBox} onSubmit={event => { event.preventDefault(); }} />
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
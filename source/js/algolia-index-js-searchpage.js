import React from 'react';
import ReactDOM from 'react-dom';
import algoliasearch from 'algoliasearch/lite';
import { 
  InstantSearch, 
  
  ScrollTo,
  RefinementList,
  Snippet,
  PoweredBy,
  Menu,
  Stats,

  connectSearchBox,
  connectHits,
  connectPagination,
  connectStateResults,
  connectMenu
} from 'react-instantsearch-dom';

const searchClient = algoliasearch(
  'HXD0SP844N',
  'f6ae04dce9282daded14443af2f39661'
);

class AlgoliaIndexJsSearchpage {
  constructor() {
    this.renderModule();
  }

  renderModule() {

    //Results list
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

    //Search input
    const SearchBox = ({ currentRefinement, isSearchStalled, refine }) => (
      <form className="c-searchform" noValidate="noValidate" action="/" role="search" itemProp="potentialAction" itemScope="" itemType="http://schema.org/SearchAction">
        <label htmlFor="searchkeyword" className="sr-only c-searchform__label">Search</label>
        <input
          id="searchkeyword"
          className="c-searchform__input"
          autoComplete="off"
          type="search"
          value={currentRefinement}
          onChange={event => refine(event.currentTarget.value)}
          required=""
          placeholder="What are you looking for?"
          name="s"
        />
      </form>
    );

    //Pagination
    const Pagination = ({ currentRefinement, nbPages, refine, createURL }) => (
      <ul className="c-searchpagination">
        {new Array(nbPages).fill(null).map((_, index) => {
          const page = index + 1;
          const style = {
            fontWeight: currentRefinement === page ? 'bold' : '',
            color: currentRefinement === page ? '' : '#000',
          };
    
          return (
            <li className="c-searchpagination__item" key={index}>
              <a
                href={createURL(page)}
                style={style}
                onClick={event => {
                  event.preventDefault();
                  refine(page);
                }}
              >
                {page}
              </a>
            </li>
          );
        })}
      </ul>
    );

    //Site menu
    const Menu = ({ items, isFromSearch, refine, searchForItems, createURL }) => (
      <div className="c-searchtabs">
        <label className="c-searchtabs__label">Filter results from: </label>
        <ul>
          {items.map(item => (
            <li className="c-searchtabs__tab" key={item.value}>
              <a
                className="c-searchtabs__link"
                href={createURL(item.value)}
                style={{ fontWeight: item.isRefined ? 'bold' : '' }}
                onClick={event => {
                  event.preventDefault();
                  refine(item.value);
                }}
              >
                <span className="c-searchtabs_label">{item.label}</span>
                <span className="c-searchtabs_count">{item.count}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    );

    const StateResults = ({ searchResults }) => {
      const nbHits = searchResults && searchResults.nbHits;
      return (
        <div className="c-searchresusult__postcount"><strong>{nbHits}</strong> posts found on your query.</div>
      );
    };

    //Map props
    const CustomSearchBox    = connectSearchBox(SearchBox);
    const CustomHits         = connectHits(Hits);
    const CustomPagination   = connectPagination(Pagination);
    const CustomStateResults = connectStateResults(StateResults);
    const CustomMenu         = connectMenu(Menu);

    //Get dom element
    const domElement = document.getElementById('algolia-instantsearch-react');

    //Render if found
    if(typeof domElement !== 'undefined') {
      ReactDOM.render(
        <InstantSearch indexName="developement-local-app" searchClient={searchClient}>

          <ScrollTo>

            <CustomSearchBox autoFocus searchBoxComponent={SearchBox} onSubmit={event => { event.preventDefault(); }} />

            <div className="c-searchmeta">
              <CustomStateResults />
              <CustomMenu attribute="origin_site"/>
            </div>

            <CustomHits hitComponent={Hits} />

          </ScrollTo>

          <CustomPagination/>

        </InstantSearch>,
        domElement
      );
      return; 
    }
    console.log("Could not find mount for algolia-index instant searchbox mountpoint."); 
  }
}

new AlgoliaIndexJsSearchpage();
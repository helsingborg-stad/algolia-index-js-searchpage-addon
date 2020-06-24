import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import qs from 'qs';
import { 
  InstantSearch,
  ScrollTo,
  Snippet,
  MenuSelect,
  connectSearchBox,
  connectHits,
  connectPagination,
  connectStateResults,
  connectMenu
} from 'react-instantsearch-dom';

const searchClient = algoliasearch(
  algoliaSearchData.applicationId,
  algoliaSearchData.publicApiKey,
);

class AlgoliaIndexJsSearchpage {
  constructor() {
    this.renderModule();
  }

  renderModule() {

    // Results message
    const Results = connectStateResults(
      ({ searchState, searchResults, children }) =>
        searchResults && searchResults.nbHits !== 0 ? (
          children
        ) : (
          <div className="notice info">
            <i className="fa fa-info-circle"></i>
            {algoliaTranslations.noresult} "{searchState.query ? searchState.query : qs.parse(location.search.slice(1)).s}".            
          </div>
        )
    );

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
        <label htmlFor="searchkeyword" className="sr-only c-searchform__label">{algoliaTranslations.submit}</label>
        <input
          id="searchkeyword"
          className="c-searchform__input"
          autoComplete="off"
          type="search"
          value={currentRefinement}
          onChange={event => refine(event.currentTarget.value)}
          required=""
          placeholder={algoliaTranslations.placeholder}
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
      <div className={`c-searchtabs ${items.length > 1 ? "c-searchtabs--visible" : "c-searchtabs--hidden"}`}>

        <label className="c-searchtabs__label"><span className="c-searchtabs__icon"></span> <span className="c-searchtabs__text">{algoliaTranslations.filter}: </span></label>
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
      if(nbHits) {
        return (
          <div className="c-searchresusult__postcount"><strong>{nbHits}</strong> {algoliaTranslations.nposts}</div>
        );
      }

      return (<div className="c-searchresusult__postcount c-searchresusult__postcount--hidden"></div>);
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
        <InstantSearch indexName={algoliaSearchData.indexName} searchClient={searchClient}>

          <ScrollTo>

            <CustomSearchBox autoFocus defaultRefinement={qs.parse(location.search.slice(1)).s} onSubmit={event => { event.preventDefault(); }} />

            <div className="c-searchmeta">

              <CustomStateResults />

              {false ? <CustomMenu attribute="origin_site"/> : <MenuSelect translations={{ seeAllOption: algoliaTranslations.facetFilterString }} attribute="origin_site"/>}

            </div>

            <Results>
              <CustomHits hitComponent={Hits} />
            </Results>

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
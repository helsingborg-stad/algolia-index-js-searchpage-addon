import React from 'react';
import he from 'he';
import algoliasearch from 'algoliasearch/lite';
import qs from 'qs';
import { 
  InstantSearch,
  ScrollTo,
  MenuSelect,
  connectSearchBox,
  connectHits,
  connectPagination,
  connectStateResults,
  connectMenu,
  connectHighlight
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
          <div className="c-notice c-notice--info">
            <span class="c-notice__icon">
              <i className="c-icon c-icon--size-md material-icons">report</i>
            </span> 
            <span class="c-notice__message--sm">
              {algoliaTranslations.noresult} "{searchState.query ? searchState.query : qs.parse(location.search.slice(1)).s}".    
            </span>
          </div>
        )
    );

    //Results list
    const Hits = ({ hits }) => (
      <section className="c-searchresult">
        {hits.map(hit => (
          <a key={hit.objectID}  href={hit.permalink} className="c-card u-margin__top--4 u-display--flex u-align-content--center">

            <div className="c-card__body u-width--100">
              <h2 class="c-typography c-card__heading c-typography__variant--h3" data-uid="5fd08f17ab16b">
                <CustomSnippet attribute="post_title" hit={hit}></CustomSnippet>
              </h2>   
              <h4 className="c-typography c-typography__variant--meta" data-uid="5fd08f17ab82e">
                {he.decode(hit.origin_site)}
              </h4>
              <p className="c-typography c-typography__variant--p" data-uid="5fd08f17abc9f">
                <CustomSnippet attribute="content" hit={hit}></CustomSnippet>
              </p>
            </div>

            {hit.thumbnail ?  <img src={ hit.thumbnail } className="c-searchresult__thumbnail"/> : ''}

          </a>
        ))}
      </section>
    );

    //Search input
    const SearchBox = ({ currentRefinement, isSearchStalled, refine }) => (
      <form id="" class="c-form" noValidate="noValidate" action="/" role="search" itemProp="potentialAction" itemScope="" itemType="http://schema.org/SearchAction">
      
        <div className="c-field u-flex-grow--1 c-field--icon c-field--lg c-field--radius-xs c-field--icon c-field--lg c-field--radius-md c-field__text">
          <i id="" className="c-icon c-icon--size-md material-icons">
            search
          </i>
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
          <label className="c-field__text--label">{algoliaTranslations.placeholder}</label>
        </div>
      </form>
    );

    //Pagination
    const Pagination = ({ currentRefinement, nbPages, refine, createURL }) => (
      <nav class="c-pagination c-pagination u-margin__top--4 u-display--flex u-justify-content--center" role="navigation" aria-label="Pagination Navigation">
        <ul class="c-pagination__list">
          {new Array(nbPages).fill(null).map((_, index) => {
            const page = index + 1;
            const c = (currentRefinement === page) ? 'c-pagination__item c-pagination__item--is-active' : 'c-pagination__item';
      
            return (
                <li className={c} js-pagination-index="1">
                  <a
                    className="c-pagination__link "
                    href={createURL(page)}
                    onClick={event => {
                      event.preventDefault();
                      refine(page);
                    }}
                  >
                    <span class="c-pagination__label">{page}</span>
                  </a>
                </li>
            );
          })}
        </ul>
      </nav>
    );

    //Site menu
    const Menu = ({ items, isFromSearch, refine, searchForItems, createURL }) => (
      <div className={`c-searchtabs u-display--none@xs u-display--none@sm ${items.length > 1 ? "c-searchtabs--visible" : "c-searchtabs--hidden"}`}>
        <div className="c-group u-justify-content--center@xs u-justify-content--center@sm u-justify-content--end u-box-shadow--1 u-rounded u-margin--auto c-group--horizontal">
          
          {items.map(item => (
            <a 
            href={createURL(item.value)}
            onClick={event => {
              event.preventDefault();
              refine(item.value);
            }}
            className={`c-button c-button--sm ripple ripple--before ${item.isRefined ? 'c-button__filled c-button__filled--primary' : 'c-button__basic c-button__basic--default'}`} type="button">   
              <span className="c-button__label">
                <span className="c-button__label-text">
                  <i className="c-icon c-icon--size-inherit material-icons u-margin__right--1">
                    filter_list
                  </i>
                  <span className="c-searchtabs_label">{item.label}</span>
                  <span className="c-searchtabs_count">{item.count}</span>
                </span>
              </span>
            </a>          
          ))}
        </div>
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

    function parseEntityNumber (str) {
			return str.replace(/&#(\d+);/g, function(match, dec) {
				return String.fromCharCode(dec);
      });
    }

    const Snippet = ({ highlight, attribute, hit }) => {
      const parsedHit = highlight({
        highlightProperty: '_snippetResult',
        attribute,
        hit,
      });

      for(const hit of parsedHit) {
        //Parse HTML entities
        const doc = new DOMParser().parseFromString(hit.value, "text/html");
        hit.value = doc.documentElement.textContent;
        hit.value = parseEntityNumber(hit.value);
      }

      return (
        <span>
          {parsedHit.map(
            (part, index) =>
              part.isHighlighted ? (
                <mark key={index}>{part.value}</mark>
              ) : (
                <span key={index}>{part.value}</span>
              )
          )}
        </span>
      );
    };

    //Map props
    const CustomSearchBox    = connectSearchBox(SearchBox);
    const CustomHits         = connectHits(Hits);
    const CustomPagination   = connectPagination(Pagination);
    const CustomStateResults = connectStateResults(StateResults);
    const CustomMenu         = connectMenu(Menu);
    const CustomSnippet      = connectHighlight(Snippet);

    //Get dom element
    const domElement = document.getElementById('algolia-instantsearch-react');

    //Render if found
    if(typeof domElement !== 'undefined') {
      ReactDOM.render(
        <InstantSearch indexName={algoliaSearchData.indexName} searchClient={searchClient}>

          <ScrollTo>

            <CustomSearchBox autoFocus defaultRefinement={qs.parse(location.search.slice(1)).s} onSubmit={event => { event.preventDefault(); }} />

            <div className="c-searchmeta">

              <div className="search-result-count u-margin__top--1">
                <span className="c-typography c-typography__variant--meta">
                  <CustomStateResults />
                </span>                    
              </div>

              {algoliaSettings.facettingApperanceMenu == 'false' ? <CustomMenu attribute="origin_site"/> : <MenuSelect translations={{ seeAllOption: algoliaTranslations.facetFilterString }} attribute="origin_site" className="u-margin__top--2"/>}

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
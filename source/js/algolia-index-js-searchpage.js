import algoliasearch from 'algoliasearch/lite';
import instantsearch from 'instantsearch.js';
import { connectSearchBox, connectPagination } from 'instantsearch.js/es/connectors'; 
import { searchBox, hits, configure } from 'instantsearch.js/es/widgets';


spinner(true);



const searchClient = algoliasearch(
  algoliaSearchData.applicationId,
  algoliaSearchData.publicApiKey,
);

console.log(algoliaSearchData.indexName);
const search = instantsearch({
  indexName: algoliaSearchData.indexName,
  searchClient,
});

function spinner (state) {
  const content = document.querySelector("#hits");
  if(state===true) {
    return content.innerHTML = algoliaSearchComponents["loader"].html;
  } else {
    return;
  }
}

function decodeHtml(html) {
  var txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

/* Searchbox */
const renderSearchBox = (renderOptions, isFirstRender) => {
  const { query, refine, clear, isSearchStalled, widgetParams } = renderOptions;
  if (isFirstRender) {
    const searchInput = document.getElementById('input_searchboxfield');
    searchInput.value = algoliaSearchData.searchQuery;
    refine(algoliaSearchData.searchQuery);
    searchInput.addEventListener('input', event => {
      refine(event.target.value);
    });
  }
};
const customSearchBox = connectSearchBox(
  renderSearchBox
);

search.addWidgets([
  customSearchBox({
    container: document.querySelector('#searchbox'),
    queryHook(query, search) {
      //Update url
      var url = new URL(window.location);
      url.searchParams.has('s') ? url.searchParams.set(
        's', query
      ) : url.searchParams.append(
        's', query
      );
      url.search = url.searchParams;
      url = url.toString();
      history.pushState({}, null, url);

      //Do search
      search(query);
    },

  }),

]);
/* End searchbox */ 

/* Pagination */
// Create the render function
const renderPagination = (renderOptions, isFirstRender) => {
  const {
    pages,
    currentRefinement,
    nbPages,
    isFirstPage,
    isLastPage,
    refine,
    createURL,
  } = renderOptions;

  const container = document.querySelector('#pagination');
  let paginationHtml = algoliaSearchComponents["pagination-item"].html;

    container.innerHTML = `
      ${!isFirstPage
      ? 
      paginationHtml
        .replace("{ALGOLIA_JS_PAGINATION_TEXT}", "First")
        .replace("{ALGOLIA_JS_PAGINATION_HREF}", createURL(0))
        .replace("{ALGOLIA_JS_PAGINATION_PAGE_NUMBER}", 0)
        .replace("{ALGOLIA_JS_PAGINATION_COLOR}", 'default')
         +
        paginationHtml
        .replace("{ALGOLIA_JS_PAGINATION_TEXT}", "Previous")
        .replace("{ALGOLIA_JS_PAGINATION_HREF}", createURL(currentRefinement - 1))
        .replace("{ALGOLIA_JS_PAGINATION_PAGE_NUMBER}", currentRefinement - 1)
        .replace("{ALGOLIA_JS_PAGINATION_COLOR}", 'default')
      
      : ''
    }  
      ${pages
      .map(
        page => paginationHtml
          .replace("{ALGOLIA_JS_PAGINATION_TEXT}", page + 1)
          .replace("{ALGOLIA_JS_PAGINATION_HREF}", createURL(page))
          .replace("{ALGOLIA_JS_PAGINATION_COLOR}", currentRefinement === page ? 'primary' : 'default')
          .replace("{ALGOLIA_JS_PAGINATION_CLASS}", currentRefinement === page ? 'c-pagination--is-active' : '')
          .replace("{ALGOLIA_JS_PAGINATION_PAGE_NUMBER}", page)
      )
      .join('')}
        ${!isLastPage
      ? 
      paginationHtml
        .replace("{ALGOLIA_JS_PAGINATION_TEXT}", "Next")
        .replace("{ALGOLIA_JS_PAGINATION_HREF}", createURL(currentRefinement + 1))
        .replace("{ALGOLIA_JS_PAGINATION_COLOR}", 'default')
        .replace("{ALGOLIA_JS_PAGINATION_CLASS}", '')
        .replace("{ALGOLIA_JS_PAGINATION_PAGE_NUMBER}", currentRefinement + 1) +
      paginationHtml
        .replace("{ALGOLIA_JS_PAGINATION_TEXT}", "Last")
        .replace("{ALGOLIA_JS_PAGINATION_HREF}", createURL(nbPages - 1))
        .replace("{ALGOLIA_JS_PAGINATION_COLOR}", 'default')
        .replace("{ALGOLIA_JS_PAGINATION_CLASS}", '')
        .replace("{ALGOLIA_JS_PAGINATION_PAGE_NUMBER}", nbPages - 1)
      : ''
    }
  ` ; 

  [...container.querySelectorAll('a')].forEach(element => {
    element.addEventListener('click', event => {
      event.preventDefault();
      refine(event.currentTarget.dataset.value);
      window.scrollTo(0,0);
    });
  });
};

// Create the custom widget
const customPagination = connectPagination(
  renderPagination
);

// Instantiate the custom widget
search.addWidgets([
  customPagination({
    container: document.querySelector('#pagination'),
  }),
]);

/* end pagination */
search.addWidgets([
  hits({
    container: '#hits',
    cssClasses: {
      root: '',
      list: [
        'unlist',
        'u-display--flex',
        'u-flex--gridgap',
        'u-flex-direction--column'
      ],
    },
    templates: {
      empty(results) {
        return algoliaSearchComponents["noresult"].html.replace(
          "{ALGOLIA_JS_SEARCH_QUERY}",
          results.query
        );
      },
      item(hit) {
        let htmlString = (hit.thumbnail ? 
          algoliaSearchComponents["hit"].html : algoliaSearchComponents["hit-noimg"].html
        ); 

        return htmlString
        .replace("{ALGOLIA_JS_HIT_ID}", hit.uuid)
        .replace("{ALGOLIA_JS_HIT_HEADING}", decodeHtml(hit._highlightResult['post_title'].value))
        .replace("{ALGOLIA_JS_HIT_SUBHEADING}", hit.origin_site)
        .replace("{ALGOLIA_JS_HIT_EXCERPT}", decodeHtml(hit._highlightResult['post_excerpt'].value))
        .replace("{ALGOLIA_JS_HIT_IMAGE}", hit.thumbnail)
        .replace("{ALGOLIA_JS_HIT_LINK}", hit.permalink);
      }
    },
    escapeHTML: false
  }),
  configure({
    hitsPerPage: 8,
    
  }),

]);

search.start();


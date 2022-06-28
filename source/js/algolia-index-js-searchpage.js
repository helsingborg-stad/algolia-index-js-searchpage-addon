import algoliasearch from 'algoliasearch/lite';
import instantsearch from 'instantsearch.js';
import { connectSearchBox } from 'instantsearch.js/es/connectors'; 
import { hits, configure, pagination } from 'instantsearch.js/es/widgets';

const searchClient = algoliasearch(
  algoliaSearchData.applicationId,
  algoliaSearchData.publicApiKey,
);

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
    document.getElementById('input_searchboxfield').addEventListener('input', event => {
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
  })
]);
/* End searchbox */ 


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

        console.log(hit);

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
  pagination({
    container: '#pagination',
    showFirst: false,
    showLast:false,
    cssClasses: {
      root: 'pagination',
      link: [
      'c-button', 
      'c-pagination__link',
      'c-button--sm',
      'c-button__transparent',
    ],
      selectedItem: [
        'c-c-pagination__link',
        'c-pagination__item--is-active',
        'c-button__filled',
        'c-button__filled--primary',
        'c-button--sm'
      ],
    },
  }),
]);

search.start();


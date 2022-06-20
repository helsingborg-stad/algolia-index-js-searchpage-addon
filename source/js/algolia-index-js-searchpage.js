// import algoliasearch from 'algoliasearch/lite';
// import instantsearch from 'instantsearch.js'; 
import algoliasearch from 'algoliasearch/lite';
import instantsearch from 'instantsearch.js/dist/instantsearch.production.min';

// const { algoliasearch, instantsearch } = window;


const searchClient = algoliasearch(
  algoliaSearchData.applicationId,
  algoliaSearchData.publicApiKey,
);

const search = instantsearch({
  indexName: algoliaSearchData.indexName,
  searchClient,
});

//text = blade type = content
function inject(text, type) {
  var content = document.createElement("span");
  content.insertAdjacentHTML('beforeend', text);
  //content.querySelector("#content").innerHTML = type;
  var test = content.innerHTML.replace("_HIT_HEADING", type);
  return test;
}


search.addWidgets([
  instantsearch.widgets.searchBox({
    container: '#searchbox',
  }),
  instantsearch.widgets.hits({
    container: '#hits',
    templates: {

      item: 
        inject(algoliaSearchComponents["algolia-search-results"].html, `{{#helpers.highlight}}{ "attribute": "post_title" }{{/helpers.highlight}}`) + inject(algoliaSearchComponents["algolia-search-results"].html, `{{#helpers.highlight}}{ "attribute": "post_excerpt" }{{/helpers.highlight}}`)
    },
  }),
  instantsearch.widgets.configure({
    hitsPerPage: 8,
  }),
  instantsearch.widgets.dynamicWidgets({
    container: '#dynamic-widgets',
    fallbackWidget({ container, attribute }) {
      return instantsearch.widgets.panel({ templates: { header: attribute } })(
        instantsearch.widgets.refinementList
      )({
        container,
        attribute,
      });
    },
    widgets: [],
  }),
  instantsearch.widgets.pagination({
    container: '#pagination',
  }),
]);

search.start();

// import algoliasearch from 'algoliasearch/lite';
// import instantsearch from 'instantsearch.js'; 
import algoliasearch from 'algoliasearch/lite';
import instantsearch from 'instantsearch.js/dist/instantsearch.production.min';

// const { algoliasearch, instantsearch } = window;

console.log(algoliaSearchComponents["algolia-search-results"].html);

const searchClient = algoliasearch(
  algoliaSearchData.applicationId,
  algoliaSearchData.publicApiKey,
);

const search = instantsearch({
  indexName: algoliaSearchData.indexName,
  searchClient,
});

function inject(text, type) {
  var content = document.createElement("div");
  content.insertAdjacentHTML('beforeend', text);
  //content.getElementById('content').innerHTML = "test";
  //content.querySelector("#content").innerHTML = type;
  content.innerHTML.replace("_HIT_HEADING", type);
  console.log(content);
  return content.innerHTML;
}


search.addWidgets([
  instantsearch.widgets.searchBox({
    container: '#searchbox',
  }),
  instantsearch.widgets.hits({
    container: '#hits',
    templates: {

      item: 
        inject(algoliaSearchComponents["algolia-search-results"].html, `{{#helpers.highlight}}{ "attribute": "post_title" }{{/helpers.highlight}}`)
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

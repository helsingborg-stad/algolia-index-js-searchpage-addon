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

  if (type.h.includes("post_title")) {
    let heading = document.createElement("span");
    heading.insertAdjacentHTML('beforeend', text);
    console.log(type.h);
    return heading.innerHTML.replace("_HIT_HEADING", type.h);
  }

  /*   var content = document.createElement("span");
    content.insertAdjacentHTML('beforeend', text);
    var test = content.innerHTML.replace("_HIT_HEADING", type);
    return test; */
}


search.addWidgets([
  instantsearch.widgets.searchBox({
    container: '#searchbox',
  }),
  instantsearch.widgets.hits({
    container: '#hits',
    templates: {

      item:
        inject(algoliaSearchComponents["algolia-search-results"].html, { h: `{{#helpers.highlight}}{ "attribute": "post_title" }{{/helpers.highlight}}` })
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

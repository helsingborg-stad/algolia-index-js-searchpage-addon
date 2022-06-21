// import algoliasearch from 'algoliasearch/lite';
// import instantsearch from 'instantsearch.js'; 
import algoliasearch from 'algoliasearch/lite';
import instantsearch from 'instantsearch.js/dist/instantsearch.production.min';

// const { algoliasearch, instantsearch } = window;
console.log(algoliaSearchComponents["algolia-loader"].html);

const searchClient = algoliasearch(
  algoliaSearchData.applicationId,
  algoliaSearchData.publicApiKey,
);

const search = instantsearch({
  indexName: algoliaSearchData.indexName,
  searchClient,
});

spinner();


function spinner() {
 const content = document.querySelector('#hits');
  console.log(content);
  console.log(content.hasChildNodes());

}

function inject(content, item) {
  if (item) {
    let element = document.createElement("span");
    element.insertAdjacentHTML('beforeend', content);
    let str = element.innerHTML.replace("_HIT_HEADING", item.heading).replace("_HIT_EXCERPT", item.excerpt).replace("_HIT_SUBHEADING", item.site).replace("_HIT_IMAGE", item.image).replace("_HIT_LINK", item.link);
 
    return str;
  }

}



search.addWidgets([
  instantsearch.widgets.searchBox({
    container: '#searchbox',
  }),
  instantsearch.widgets.hits({
    container: '#hits',
    templates: {
      item: 
        inject(algoliaSearchComponents["algolia-search-results"].html, { 
          heading: `{{#helpers.highlight}}{ "attribute": "post_title" }{{/helpers.highlight}}`, 
          excerpt: `{{#helpers.highlight}}{ "attribute": "post_excerpt" }{{/helpers.highlight}}`, 
          site: `{{#helpers.highlight}}{ "attribute": "origin_site" }{{/helpers.highlight}}`, 
          image: `{{#helpers.highlight}}{ "attribute": "thumbnail" }{{/helpers.highlight}}`, 
          link: `{{#helpers.highlight}}{ "attribute": "permalink" }{{/helpers.highlight}}` }),
            
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

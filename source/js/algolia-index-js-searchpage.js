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

search.addWidgets([
  instantsearch.widgets.searchBox({
    container: '#searchbox',
  }),
  instantsearch.widgets.hits({
    container: '#hits',
    templates: {
      item: algoliaSearchComponents["algolia-search-results"].html + `
      <a href="{{#helpers.highlight}}{ "attribute": "permalink" }{{/helpers.highlight}}">
        <article>
          <h1>{{#helpers.highlight}}{ "attribute": "post_title" }{{/helpers.highlight}}</h1>
          <p>{{#helpers.highlight}}{ "attribute": "post_excerpt" }{{/helpers.highlight}}</p>
          <p>{{#helpers.highlight}}{ "attribute": "content" }{{/helpers.highlight}}</p>
          <p>{{#helpers.highlight}}{ "attribute": "post_type_name" }{{/helpers.highlight}}</p>
        </article>
      </a>
      `,
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

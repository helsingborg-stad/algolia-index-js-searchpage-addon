const { algoliasearch, instantsearch } = window;

// const searchClient = algoliasearch('latency', '6be0576ff61c053d5f9a3225e2a90f76');
// const searchClient = algoliasearch(
//   'SCK6CDZ61C',
//   '1fb3ea6877bd4592757aad6447316feb'
// );

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
      item: `
      <a href="{{#helpers.highlight}}{ "attribute": "permalink" }{{/helpers.highlight}}">
        <article>
          <h1>{{#helpers.highlight}}{ "attribute": "post_title" }{{/helpers.highlight}}</h1>
          <p>{{#helpers.highlight}}{ "attribute": "post_excerpt" }{{/helpers.highlight}}</p>
          <p>{{#helpers.highlight}}{ "attribute": "content" }{{/helpers.highlight}}</p>
          <p>{{#helpers.highlight}}{ "attribute": "post_type_name" }{{/helpers.highlight}}</p>
          <img src="{{#helpers.highlight}}{ "attribute": "thumbnail" }{{/helpers.highlight}}">
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

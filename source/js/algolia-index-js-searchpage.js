import algoliasearch from 'algoliasearch/lite';
import instantsearch from 'instantsearch.js/dist/instantsearch.production.min';

spinner(true);

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
    return content.innerHTML = algoliaSearchComponents["algolia-loader"].html;
  }
  else {
    return;
  }
}

function inject(content, item) {
  if (item) {
    let element = document.createElement("span");
    element.insertAdjacentHTML('beforeend', content);
    let str = element.innerHTML.replace("_HIT_HEADING", item.heading).replace("_HIT_EXCERPT", item.excerpt).replace("_HIT_SUBHEADING", item.site).replace("_HIT_IMAGE", item.image).replace("_HIT_LINK", item.link);
    spinner(false);
    return str;
  }
}

search.addWidgets([
  instantsearch.widgets.searchBox({
    container: '#searchbox',
    placeholder: 'Vad letar du efter?',
    showReset: false,
    showLoadingIndicator: false,
    showSubmit: false,
    cssClasses: {
      input: "CustomInput"
    }
  }),
  instantsearch.widgets.hits({
    container: '#hits',
    templates: {
      item: 
        inject(algoliaSearchComponents["algolia-search-results"].html, { 
          heading: `{{#helpers.highlight}}{ "attribute": "post_title" }{{/helpers.highlight}}`, 
          excerpt: `{{#helpers.highlight}}{ "attribute": "post_excerpt" }{{/helpers.highlight}}`, 
          site: `{{origin_site}}`, 
          image: `{{thumbnail}}`, 
          link: `{{permalink}}` }),    
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
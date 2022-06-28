import algoliasearch from 'algoliasearch/lite';
import instantsearch from 'instantsearch.js';
import { connectSearchBox } from 'instantsearch.js/es/connectors'; 
import { searchBox, hits, configure, pagination } from 'instantsearch.js/es/widgets';


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

function decodeHtml(html) {
  var txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

function inject(content, item) {

  if (item) {
    let element = document.createElement("span");
    
    element.insertAdjacentHTML('beforeend', content);
   
    let str = element.innerHTML.replace(
      "_HIT_HEADING",
      item.heading
    ).replace(
      "_HIT_EXCERPT",
      item.excerpt
    ).replace(
      "_HIT_SUBHEADING",
      item.site
    ).replace(
      "_HIT_IMAGE",
      item.image
    ).replace(
      "_HIT_LINK",
      item.link
    );

    spinner(false);

    return str;
  }
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

  /*
  searchBox({
    container: '#searchbox',
    placeholder: 'Vad letar du efter?',
    showReset: false,
    showLoadingIndicator: false,
    showSubmit: false,
    cssClasses: {
      input: "CustomInput"
    },
    queryHook(query, search) {
      //Update url
      var url = new URL(window.location);
      url.searchParams.has('s') ? url.searchParams.set(
        's', query
      ) : url.searchParams.append(
        's', query
      );
      url.search = url.searchParams;
      url        = url.toString();
      history.pushState({}, null, url);

      //Do search
      search(query);
    },
  }),
  */
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
        .replace("{ALGOLIA_JS_HIT_HEADING}", decodeHtml(hit.post_title))
        .replace("{ALGOLIA_JS_HIT_SUBHEADING}", hit.origin_site)
        .replace("{ALGOLIA_JS_HIT_EXCERPT}", decodeHtml(hit.post_excerpt))
        .replace("{ALGOLIA_JS_HIT_IMAGE}", hit.thumbnail)
        .replace("{ALGOLIA_JS_HIT_LINK}", hit.link);
      }
    },

    transformItems: function (items) {
      return items.map(item => ({
        ...item,
        post_excerpt: item._highlightResult['post_excerpt'].value.replace("[&amp;hellip;]", "...").replace('&amp;#038;', "&"),
        post_title: item._highlightResult['post_title'].value.replace('&amp;#038;', "&"),
      }));
    },

    escapeHTML: false,

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


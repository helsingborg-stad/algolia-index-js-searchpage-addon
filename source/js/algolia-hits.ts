import { InstantSearch } from "instantsearch.js";
import { hits, configure } from 'instantsearch.js/es/widgets';
import { AlgoliaSearchComponentsInterface } from "../interface/interface";

class AlgoliaHits {
    constructor(private search: InstantSearch, private searchComponents: AlgoliaSearchComponentsInterface) {}
  
    private renderEmpty(results: any) {
      console.log('I said hi?');
      return this.searchComponents.noresult.html.replaceAll(
        '{ALGOLIA_JS_SEARCH_QUERY}',
        results.query
      );
    }
  
    private renderItem(hit: any) {
      let htmlString = hit.thumbnail
        ? this.searchComponents["hit"].html
        : this.searchComponents['hit-noimg'].html;
  
      // Type assertion for _highlightResult
      const highlightResult = hit._highlightResult as Record<string, { value: string }>;
  
      // Extract post_title and post_excerpt values
      const postTitleValue = highlightResult && highlightResult['post_title'] && highlightResult['post_title'].value;
      const postExcerptValue = highlightResult && highlightResult['post_excerpt'] && highlightResult['post_excerpt'].value;
  
      // Construct the htmlString with safe handling for _highlightResult properties
      return htmlString
        .replaceAll('{ALGOLIA_JS_HIT_ID}', hit.uuid)
        .replaceAll('{ALGOLIA_JS_HIT_HEADING}', postTitleValue ? this.decodeHtml(postTitleValue) : '')
        .replaceAll('{ALGOLIA_JS_HIT_SUBHEADING}', hit.origin_site)
        .replaceAll('{ALGOLIA_JS_HIT_EXCERPT}', postExcerptValue ? this.decodeHtml(postExcerptValue) : '')
        .replaceAll("{ALGOLIA_JS_HIT_IMAGE}", hit.thumbnail.replaceAll("/wp/", "/"))
        .replaceAll('{ALGOLIA_JS_HIT_LINK}', hit.permalink);
    }
  
    setup() {
      this.search.addWidgets([
        hits({
          container: '#hits',
          cssClasses: {
            root: "",
            list: [
              'unlist',
              'u-display--flex',
              'u-flex--gridgap',
              'u-flex-direction--column'
            ],
          },
          templates: {
            empty: this.renderEmpty.bind(this),
            item: this.renderItem.bind(this),
          },
          escapeHTML: false,
        }),
        configure({
          hitsPerPage: 20,
        }),
      ]);
    }
  
    private decodeHtml(html: string) {
      const txt = document.createElement('textarea');
      txt.innerHTML = html;
      return txt.value;
    }
  }
  
  export default AlgoliaHits;
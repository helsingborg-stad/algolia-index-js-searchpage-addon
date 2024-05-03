import { InstantSearch } from "instantsearch.js";
import { AlgoliaSearchComponentsInterface, ConnectParams, RenderPaginationOptions } from "../interface/interface";
import { connectPagination } from "instantsearch.js/es/connectors";

class AlgoliaPagination {
    constructor(private search: InstantSearch, private searchComponents: AlgoliaSearchComponentsInterface) {}
    
    private renderPagination(renderOptions: RenderPaginationOptions) {
      const {
        pages,
        currentRefinement,
        isFirstPage,
        isLastPage,
        refine,
        createURL,
      } = renderOptions;
  
      const container = document.querySelector<HTMLDivElement>('#pagination');
  
      if (!container) return;
  
      let paginationHtml = this.searchComponents['pagination-item'].html;
      let paginationIcon = this.searchComponents['pagination-item-icon'].html;
      let from = currentRefinement < 2 || pages.length < 5 ? 0 : 1;
  
      container.innerHTML = `
          ${!isFirstPage
          ? paginationIcon
            .replaceAll('{ALGOLIA_JS_PAGINATION_ICON}', 'keyboard_arrow_left')
            .replaceAll('{ALGOLIA_JS_PAGINATION_HREF}', createURL(currentRefinement - 1))
            .replaceAll('{ALGOLIA_JS_PAGINATION_PAGE_NUMBER}', (currentRefinement - 1).toString())
          : ''}
          ${pages
          .splice(from, 4)
          .map(
            (page) => {
              return paginationHtml
                .replaceAll('{ALGOLIA_JS_PAGINATION_TEXT}', (page + 1).toString())
                .replaceAll('{ALGOLIA_JS_PAGINATION_HREF}', createURL(page))
                .replaceAll('{ALGOLIA_JS_PAGINATION_COLOR}', currentRefinement === page ? 'primary' : 'default')
                .replaceAll('{ALGOLIA_JS_PAGINATION_CLASS}', currentRefinement === page ? 'c-pagination--is-active' : '')
                .replaceAll('{ALGOLIA_JS_PAGINATION_PAGE_NUMBER}', page.toString())
            }
          )
          .join('')}
          ${!isLastPage
          ? paginationIcon
            .replaceAll('{ALGOLIA_JS_PAGINATION_ICON}', 'keyboard_arrow_right')
            .replaceAll('{ALGOLIA_JS_PAGINATION_HREF}', createURL(currentRefinement + 1))
            .replaceAll('{ALGOLIA_JS_PAGINATION_PAGE_NUMBER}', (currentRefinement + 1).toString())
          : ''}
      `;
  
      [...container.querySelectorAll('a')].forEach((element) => {
        element.addEventListener('click', (event) => {
          event.preventDefault();
          refine(parseInt((event.currentTarget as HTMLAnchorElement).dataset.value!, 10));
          window.scrollTo(0, 0);
        });
      });
    }
  
    setup() {
      const customPagination = connectPagination<ConnectParams>(this.renderPagination.bind(this));
  
      this.search.addWidgets([
        customPagination({
          container: document.querySelector('#pagination') as HTMLElement,
          padding: 2,
          // totalPages: 4,
        }),
      ]);
    }
  }

  export default AlgoliaPagination;
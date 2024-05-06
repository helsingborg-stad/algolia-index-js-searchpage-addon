import { InstantSearch } from "instantsearch.js";
import { AlgoliaSearchDataInterface, ConnectParams, SearchBoxRenderOptions } from "../interface/interface";
import { connectSearchBox } from "instantsearch.js/es/connectors";

class AlgoliaSearchBox {
    constructor(private search: InstantSearch, private searchData: AlgoliaSearchDataInterface) {}
  
    private renderSearchBox = (
      renderOptions: SearchBoxRenderOptions,
      isFirstRender: boolean
    ) => {
      const { refine } = renderOptions;
  
      if (isFirstRender) {
        const searchInput = document.getElementById('input_searchboxfield') as HTMLInputElement | null;
        if (searchInput) {
          searchInput.value = this.searchData.searchQuery;
          refine(this.searchData.searchQuery);
          searchInput.addEventListener('input', event => {
            refine((event.target as HTMLInputElement).value);
          });
        }
      }
    };
  
    setup() {
      const customSearchBox = connectSearchBox<ConnectParams>(this.renderSearchBox);
  
      this.search.addWidgets([
        customSearchBox({
          container: document.querySelector('#searchbox') as HTMLElement,
          queryHook: (query, search) => {
            const url = new URL(window.location.href);
            url.searchParams.has('s')
              ? url.searchParams.set('s', query)
              : url.searchParams.append('s', query);
  
            url.search = url.searchParams.toString();
            history.pushState({}, "", url.toString());
  
            search(query);
          },
        }),
      ]);
    }
  }
  


export default AlgoliaSearchBox;
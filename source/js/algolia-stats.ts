import { InstantSearch } from "instantsearch.js";
import { AlgoliaSearchComponentsInterface, ConnectParams, RenderStatsOptions } from "../interface/interface";
import { connectStats } from "instantsearch.js/es/connectors";

class AlgoliaStats {
    constructor(private search: InstantSearch, private searchComponents: AlgoliaSearchComponentsInterface) {}
  
    private renderStats = (
      renderOptions: RenderStatsOptions,
      isFirstRender: boolean
    ) => {
      const {
        nbHits,
        processingTimeMS,
        query,
        widgetParams
      } = renderOptions;
  
      if (isFirstRender) {
        return;
      }
  
      let queryContent = "";
      if (query) {
        queryContent = '<q>' + query + '</q>';
      }
      if (nbHits !== 0) {
        widgetParams.container.innerHTML = this.searchComponents[
          'stats-count'
        ].html
          .replaceAll('{ALGOLIA_JS_STATS_COUNT}', '<b>' + nbHits + '</b>')
          .replaceAll('{ALGOLIA_JS_STATS_QUERY}', queryContent)
          .replaceAll('{ALGOLIA_JS_STATS_TIME}', String(processingTimeMS));
      } else {
        widgetParams.container.innerHTML = "";
      }
    };
  
    setup() {
      const customStats = connectStats<ConnectParams>(this.renderStats);
  
      this.search.addWidgets([
        customStats({
          container: document.querySelector('#stats') as HTMLElement,
        }),
      ]);
    }
  }

  export default AlgoliaStats;
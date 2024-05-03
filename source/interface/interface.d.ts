export interface AlgoliaSearchDataInterface {
    applicationId: string;
    publicApiKey: string;
    indexName: string;
    searchQuery: string;
  }
  
export interface AlgoliaSearchComponentsInterface {
    loader: { html: string };
    'stats-count': { html: string };
    'pagination-item': { html: string };
    'pagination-item-icon': { html: string };
    noresult: { html: string };
    hit: { html: string };
    'hit-noimg': { html: string };
  }
  
export interface ConnectParams {
    container: HTMLElement;
    render?: string;
    padding?: number;
    queryHook?: (query: string, search: (query: string) => void) => void;
  }
  
  export interface SearchBoxRenderOptions {
    query: string;
    refine: (query: string) => void
  }
  
  export interface RenderStatsOptions {
    nbHits: number;
    processingTimeMS: number;
    query: string;
    widgetParams: {
      container: HTMLElement;
    }
  }
  
  export interface RenderPaginationOptions {
    pages: number[];
    currentRefinement: number;
    isFirstPage: boolean;
    isLastPage: boolean;
    refine: (page: number) => void; 
    createURL: (page: number) => string;
  }
import { liteClient } from "algoliasearch/lite";

import type {
  SearchService,
  SearchConfig,
  SearchParams,
  SearchResult,
  SearchResultItem,
  WordpressPost,
} from "./types";

export interface AlgoliaParams {
  hitsPerPage?: number;
  page?: number;
  query?: string;
}

export const algoliaDataTransform = (
  response: WordpressPost[]
): SearchResultItem[] => {
  return response.map(
    (item) =>
      ({
        title: item.post_title || "",
        summary: item.post_excerpt || "",
        subtitle: item.origin_site || "",
        image: item.thumbnail || "",
        url: item.permalink || "",
      } as SearchResultItem)
  );
};

export const algoliaParamTransform = (params: SearchParams): AlgoliaParams => {
  return {
    hitsPerPage: params.page_size,
    page: params.page ? params.page - 1 : undefined,
    query: params.query,
  };
};

export const AlgoliaAdapter = (config: SearchConfig): SearchService => {
  const searchClient = liteClient(config.applicationId, config.apiKey);

  return {
    search: async (params: SearchParams): Promise<SearchResult> => {
      const { results } = await searchClient.searchForHits<WordpressPost>({
        requests: [
          {
            indexName: config.collectionName,
            ...algoliaParamTransform(params),
          },
        ],
      });

      return {
        total: results[0].nbHits ?? 0,
        page: results[0].page ?? 0,
        hits: algoliaDataTransform(results[0].hits ?? []),
      };
    },
  };
};

import { AlgoliaAdapter } from "./algolia-adapter";
import { SearchConfig, SearchService } from "./types";
import { TypesenseAdapter } from "./typesense-adapter";

export const searchFactory = (config: SearchConfig): SearchService => {
  switch (config.type) {
    case "algolia":
      return AlgoliaAdapter(config);
    case "typesense":
      return TypesenseAdapter(config);
    default:
      throw new Error(`Unsupported search type: ${config.type}`);
  }
};

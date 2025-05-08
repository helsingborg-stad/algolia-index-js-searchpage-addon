export interface SearchResult {
  total: number;
  page: number;
  hits: SearchResultItem[];
}

export interface SearchResultItem {
  title: string;
  subtitle: string;
  summary: string;
  image: string;
  url: string;
}

export interface SearchConfig {
  type: "typesense" | "algolia";
  host: string;
  port: number;
  protocol: string;
  apiKey: string;
  applicationId: string;
  collectionName: string;
}

export interface SearchParams {
  query?: string;
  query_by?: string;
  page?: number;
  page_size?: number;
}

export interface WordpressPost {
  ID?: string;
  algolia_timestamp?: number;
  blog_id?: number;
  categories?: string[];
  content?: string;
  objectID: string;
  origin_site?: string;
  origin_site_url?: string;
  partial_object_distinct_key?: string;
  partial_object_total_amount?: number;
  permalink?: string;
  post_date?: number;
  post_date_formatted?: string;
  post_excerpt?: string;
  post_modified?: number;
  post_title?: string;
  post_type?: string;
  post_type_name?: string;
  tags?: string[];
  thumbnail?: string;
  thumbnail_alt?: string;
  uuid?: string;
  embedding?: number[];
  id?: string;
}

export interface SearchService {
  search(params: SearchParams): Promise<SearchResult>;
}

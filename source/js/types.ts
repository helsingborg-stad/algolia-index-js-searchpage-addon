export interface GenericSearchResult {
	query: string;
	totalHits: number;
	currentPage: number;
	totalPages: number;
	hits: GenericSearchResultItem[];
	facets?: FacetResult[];
}

export interface GenericSearchResultItem {
	title: string;
	subtitle: string;
	summary: string;
	image?: string;
	altText: string;
	url: string;
}

export interface FacetConfig {
	attribute: string;
	label: string;
	enabled: boolean;
}

export interface SearchConfig {
	type: "typesense" | "algolia";
	host: string;
	port: number;
	protocol: string;
	apiKey: string;
	applicationId: string;
	collectionName: string;
	searchAsYouType: boolean;
	facets?: FacetConfig[];
	facetingEnabled?: boolean;
}

export interface FacetValue {
	value: string;
	count: number;
	highlighted?: string;
}

export interface FacetResult {
	attribute: string;
	label: string;
	values: FacetValue[];
}

export interface GenericSearchQueryParams {
	query?: string;
	query_by?: string;
	page?: number;
	page_size?: number;
	highlight_full_fields?: string;
	facetFilters?: string[][];
}

export interface WPPost {
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
	search(params: GenericSearchQueryParams): Promise<GenericSearchResult>;
}
export interface HtmlRenderService {
	getInputField: () => HTMLInputElement;
	getPaginationContainer: () => HTMLElement;
	getFacetsContainer: () => HTMLElement | null;
	renderStats: (result: GenericSearchResult) => void;
	renderItems: (result: GenericSearchResult) => void;
	renderPagination: (result: GenericSearchResult) => void;
	renderFacets: (
		result: GenericSearchResult,
		facetFilters?: string[][],
	) => void;
	reset: () => void;
}
export interface PaginationService {
	isLastPage: () => boolean;
	isFirstPage: () => boolean;
	getVisibleItems: (maxItems?: number) => number[];
}
export interface HtmlRunnerService {
	exec: (params: GenericSearchQueryParams) => void;
}
export interface HtmlEventService {
	registerSearchBox: (
		element: HTMLInputElement,
		callback: (params: GenericSearchQueryParams) => void,
	) => void;
	registerPagination: (
		element: HTMLElement,
		callback: (page: number) => void,
	) => void;
	registerFacets: (
		element: HTMLElement,
		callback: (facetFilters: string[][]) => void,
	) => void;
}

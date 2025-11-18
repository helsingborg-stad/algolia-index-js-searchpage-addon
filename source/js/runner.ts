import type {
	GenericSearchQueryParams,
	HtmlEventService,
	HtmlRenderService,
	HtmlRunnerService,
	SearchService,
} from "./types";
import { setUrlSearchParam } from "./url-param";

export const Runner = (
	binder: HtmlEventService,
	adapter: SearchService,
	html: HtmlRenderService,
): HtmlRunnerService => {

	let isRenderingFacets = false;
	const facetsContainer = html.getFacetsContainer();
	if (facetsContainer) {
		binder.registerFacets(facetsContainer, (facetFilters: string[][]) => {
			if (!isRenderingFacets) {
				exec({
					...lastParams,
					page: 1,
					facetFilters,
				});
			}
		});
	}

	let lastParams: GenericSearchQueryParams = {};
	const exec = (params: GenericSearchQueryParams) => {
		lastParams = params;
		adapter.search(params).then((result) => {
			setUrlSearchParam(params.query);
			html.reset();
			html.renderStats(result);
			isRenderingFacets = true;
			html.renderFacets(result, params.facetFilters);
			isRenderingFacets = false;
			html.renderItems(result);
			html.renderPagination(result);
			binder.registerPagination(
				html.getPaginationContainer(),
				(page: number) => {
					exec({
						...params,
						page,
					});
				},
			);
		});
	};
	binder.registerSearchBox(html.getInputField(), (params) => {
		exec({
			...params,
			facetFilters: params.facetFilters ?? lastParams.facetFilters,
		});
	});

	return {exec};
};

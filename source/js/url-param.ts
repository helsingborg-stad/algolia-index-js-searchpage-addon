export const setUrlSearchParam = (query?: string) => {
	if (query) {
		const url = new URL(window.location.toString());
		if (url.searchParams.has('s')) {
			url.searchParams.set('s', query);
		} else {
			url.searchParams.append('s', query);
		}
		history.pushState({}, '', url.toString());
	}
};

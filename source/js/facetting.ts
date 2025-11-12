import {GenericSearchResult } from './types'

/**
 * Factory for creating a facetting service
 */
export const FacettingFactory = ({}: GenericSearchResult) => {
	return {
		exampleFunction: () => currentPage === totalPages
	}
}

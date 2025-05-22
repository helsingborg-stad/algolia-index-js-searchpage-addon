import type { EventOperations, SearchConfig } from './types'

export const EventService = ({
  searchAsYouType,
  searchQuery,
}: SearchConfig): EventOperations => {
  return {
    register: (element, callback) => {
      // Set initial value
      element.value = searchQuery

      // Callback on input
      if (searchAsYouType) {
        element?.addEventListener('input', ({ target }) =>
          callback((target as HTMLInputElement).value)
        )
        return
      }
      // Callback on enter key press
      element?.addEventListener('keydown', (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
          callback((event.target as HTMLInputElement)?.value)
        }
      })
      // Callback on empty field
      element?.addEventListener('input', ({ target }) => {
        const value = (target as HTMLInputElement)?.value

        if (value === '') {
          callback(value)
        }
      })
    },
  }
}

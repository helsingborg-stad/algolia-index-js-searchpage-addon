import type { EventOperations, SearchConfig } from './types'

export const EventService = ({
  searchAsYouType,
}: SearchConfig): EventOperations => {
  return {
    registerSearchBox: (element, callback) => {
      // Callback on input
      if (searchAsYouType) {
        element?.addEventListener('input', ({ target }) =>
          callback({ query: (target as HTMLInputElement).value })
        )
        return
      }
      // Callback on enter key press
      element?.addEventListener('keydown', (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
          callback({ query: (event.target as HTMLInputElement)?.value })
        }
      })
      // Callback on empty field
      element?.addEventListener('input', ({ target }) => {
        const value = (target as HTMLInputElement)?.value

        if (value === '') {
          callback({ query: value })
        }
      })
    },
    registerPagination: (element, callback) => {
      ;[...element.querySelectorAll<a>('a')].forEach(element => {
        element.addEventListener('click', (event: PointerEvent) => {
          event.preventDefault()
          const target = event.currentTarget as HTMLElement

          callback(Number(target?.dataset?.value ?? '0'))
          window.scrollTo(0, 0)
        })
      })
    },
  }
}

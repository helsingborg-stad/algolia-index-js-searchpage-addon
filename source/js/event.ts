import type { HtmlEventService, SearchConfig } from './types'

export const HtmlEventFactory = ({
  searchAsYouType,
}: SearchConfig): HtmlEventService => {
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
      ;[...element.querySelectorAll<HTMLAnchorElement>('a')].forEach(
        element => {
          element.addEventListener('click', (event: MouseEvent) => {
            event.preventDefault()
            const target = event.currentTarget as HTMLElement

            callback(Number(target?.dataset?.value ?? '1'))
            window.scrollTo(0, 0)
          })
        }
      )
    },
  }
}

import { useEffect, useRef } from 'react'

export function useClientOutside<T extends HTMLElement>(
  onClickOutside: () => void
) {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClickOutside()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onClickOutside])

  return ref
}

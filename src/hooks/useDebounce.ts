import { useEffect, useState } from 'react'

function useDebounce (func: () => void, delay: number, deps: unknown[]) {
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (timeoutId === null) {
      func()
    } else {
      clearTimeout(timeoutId)
    }

    setTimeoutId(
      setTimeout(func, delay)
    )

    return () => {
      if (timeoutId !== null) {
        clearTimeout(timeoutId)
      }
    }
  }, deps)
}

export default useDebounce

import { useEffect, useState } from 'react'

/**
 * return true if component mounted
 *
 * @returns true is this component already mounted, otherwise false
 */
export default function useMounted(): boolean {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  return hasMounted
}

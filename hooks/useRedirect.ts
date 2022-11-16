import { useRouter } from 'next/router'
import { useCallback } from 'react'

/**
 * return a handle for rerouting
 *
 * @param path path that redirect to
 * @returns redirect handle
 */
export default function useRedirect(path: string): VoidFunction {
  const router = useRouter()
  const callback = useCallback(() => {
    router.push(path).catch((error) => {
      console.error(error)
    })
  }, [path])

  return callback
}

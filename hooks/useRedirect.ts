import { useRouter } from 'next/router'
import { useCallback } from 'react'
import useRedirectEntry from './useRedirectEntry'

/**
 *
 * @param path path that redirect to
 * @returns
 */
export default function useRedirect(path: string): VoidFunction {
  const setRedirect = useRedirectEntry()

  const router = useRouter()

  const callback = useCallback(() => {
    setRedirect()
    router.push(path).catch((error) => {
      console.error(error)
    })
  }, [path])

  return callback
}

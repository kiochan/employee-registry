import { useRouter } from 'next/router'
import { useCallback } from 'react'

export default function useRedirectTo(): (path: string) => void {
  const router = useRouter()
  const redirectTo = useCallback(
    (path: string): void => {
      router.push(path).catch((e) => {
        console.error(e)
      })
    },
    [router],
  )

  return redirectTo
}

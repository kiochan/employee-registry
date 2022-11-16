import { useRouter } from 'next/router'
import links from '../config/links'
import { useAppSelector } from './useAppSelector'

/**
 * check if there is a token in store
 * @param path if check fail, goto this path
 */
export function useTokenCheck(path: string = links.home): string {
  const router = useRouter()
  const token = useAppSelector((s) => s.token.value)
  if (token === null) router.push(path).catch(console.error)
  return token as string
}

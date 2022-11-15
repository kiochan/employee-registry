import { useRouter } from 'next/router'
import { useAppDispatch } from './useAppDispatch'
import { useAppSelector } from './useAppSelector'

// exclude those paths, prevent dead loop
const exclude = ['/login', '/register', '/redirect']

export default function useRedirectEntry(): VoidFunction {
  const router = useRouter()

  const dispatch = useAppDispatch()

  if (exclude.includes(router.route)) {
    return () => {
      dispatch({ type: 'redirect/set', payload: '/' })
    }
  }

  const _redirect = useAppSelector((e) => e.redirect.path)
  const redirect = exclude.includes(_redirect) ? _redirect : '/'

  return () => {
    dispatch({ type: 'redirect/set', payload: redirect })
  }
}

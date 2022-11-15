import { useSelector } from 'react-redux'

import type * as initial from '../client-store/initial'

export function useAppSelector<T>(selector: (state: typeof initial) => T): T {
  return useSelector<typeof initial, T>(selector)
}

import { useSelector } from 'react-redux'
import type * as initial from '../client-store/initial'

/**
 * return subset of state in store
 *
 * @param selector select subset of store
 * @returns selected subset
 */
export function useAppSelector<T>(selector: (state: typeof initial) => T): T {
  return useSelector<typeof initial, T>(selector)
}

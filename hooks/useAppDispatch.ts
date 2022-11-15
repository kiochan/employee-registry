import { useDispatch } from 'react-redux'

import type { Store } from '../client-store'

export type AppDispatch = Store['dispatch']

// Export a hook that can be reused to resolve types
export const useAppDispatch: () => AppDispatch = useDispatch

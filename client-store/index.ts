import { configureStore } from '@reduxjs/toolkit'
import { useMemo } from 'react'

import { combineReducers } from 'redux'

import type { PersistConfig, WebStorage } from 'redux-persist'
import { persistStore, persistReducer } from 'redux-persist'

import type * as initial from './initial'
import * as reducers from './reducers'
import clientStoreTransformWhitelist from '../config/client-store-transform-whitelist'

import createWebStorage from 'redux-persist/lib/storage/createWebStorage'

export * from '../hooks/useAppDispatch'

const createNoopStorage = (): WebStorage => {
  return {
    async getItem(_key: any) {
      return await Promise.resolve(null)
    },
    async setItem(_key: any, value: any) {
      return await Promise.resolve(value)
    },
    async removeItem(_key: any) {
      return await Promise.resolve()
    },
  }
}

const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage()

export type StoreState = typeof initial

export type Store = ReturnType<typeof initStore>

let store: Store | undefined

const persistConfig: PersistConfig<StoreState, string> = {
  key: 'root',
  storage,
  whitelist: clientStoreTransformWhitelist,
}

/**
 * initialize store
 *
 * @param preloadedState preloaded state
 * @returns store
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function initStore(preloadedState: StoreState) {
  const combinedReducer = combineReducers(reducers)

  const reducer: typeof combinedReducer = persistReducer(
    persistConfig,
    combinedReducer as any,
  ) as any

  const store = configureStore({
    reducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        // disable standard serializable check
        // because redux-persist will generate non-serializable value
        serializableCheck: false,
      }),
  })

  return store
}

/**
 * initialize store with next.js
 *
 * @param preloadedState preloaded state
 * @returns store
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const initializeStore = (preloadedState: StoreState) => {
  let _store = store ?? initStore(preloadedState)

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState !== undefined && store !== undefined) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    })
    // Reset the current store
    store = undefined
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store
  // Create the store once in the client
  if (store === undefined) store = _store

  return _store
}

/**
 * hook for wrapping
 *
 * @param initialState initial state
 * @returns store with persistor
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function useStore(initialState: StoreState) {
  const _store = useMemo(() => initializeStore(initialState), [initialState])
  const _persistor = useMemo(() => persistStore(_store), [_store])
  const obj = { store: _store, persistor: _persistor }
  return obj
}

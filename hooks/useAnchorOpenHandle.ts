import type { MouseEventHandler } from 'react'
import { useState } from 'react'

/**
 * get handle for open and close of a element
 *
 * @returns arrays of target element, open handle and close handle
 */
export default function useAnchorOpenHandle<T extends HTMLElement>(): [
  T | null,
  MouseEventHandler<T>,
  VoidFunction,
] {
  const [element, setElement] = useState<null | T>(null)
  const handleOpen: MouseEventHandler<T> = (event) => {
    if (element === null) {
      setElement(event.currentTarget)
      return
    }
    setElement(null)
  }
  const handleClose: VoidFunction = () => {
    setElement(null)
  }
  return [element, handleOpen, handleClose]
}

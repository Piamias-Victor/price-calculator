import { useCallback, useState } from "react"
import { useObjectMemo } from "../memo"

export interface BooleanHandle {
  readonly current: boolean

  set(x: boolean): void

  enable(): void
  disable(): void
  toggle(): void
}

export function useBooleanHandle(init: boolean) {
  const [current, set] = useState(init)

  const enable = useCallback(() => set(true), [set])
  const disable = useCallback(() => set(false), [set])
  const toggle = useCallback(() => set(x => !x), [set])

  return useObjectMemo({ current, set, enable, disable, toggle })
}
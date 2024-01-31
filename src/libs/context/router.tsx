import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { useObjectMemo } from "../react/memo";
import { ChildrenProps } from "../react/props/children";

export interface RouteHandle {
  current?: string
  set(newRoute?: string): void
}

export const RouteContext = createContext<RouteHandle | undefined>(undefined)

export function useRoute() {
  return useContext(RouteContext)!
}

export function RouteProvider(props: ChildrenProps) {

  const [route, setRoute] = useState<string>("home")

  const set = useCallback((newRoute?: string) => {
    if (newRoute)
      setRoute(newRoute)
  }, [])

  const current = useMemo(() => {
    return route
  }, [route])

  const handle = useObjectMemo({ current, set })

  return <RouteContext.Provider value={handle}>
    {props.children}
  </RouteContext.Provider>
}

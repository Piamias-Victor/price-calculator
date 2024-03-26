import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { useObjectMemo } from "../react/memo";
import { ChildrenProps } from "../react/props/children";

export interface AccountHandle {
  current?: number
  set(newAccount?: number): void
}

export const AccountContext = createContext<AccountHandle | undefined>(undefined)

export function useAccount() {
  return useContext(AccountContext)!
}

export function AccountProvider(props: ChildrenProps) {

  const [account, setAccount] = useState<number>(1)

  const set = useCallback((newAccount?: number) => {
    if (newAccount)
      setAccount(newAccount)
  }, [])

  const current = useMemo(() => {
    return account
  }, [account])

  const handle = useObjectMemo({ current, set })

  return <AccountContext.Provider value={handle}>
    {props.children}
  </AccountContext.Provider>
}

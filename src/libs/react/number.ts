import { useCallback, useState } from "react";
import { useObjectMemo } from "./memo";

export interface NumberHandle {
  current: number;
  set(x?: number): void;
  unset(): void;
}

export function useNumber(init?: number) {
  const [current = 0, set] = useState(init);
  const unset = useCallback(() => set(undefined), []);
  return useObjectMemo({ current, set, unset });
}

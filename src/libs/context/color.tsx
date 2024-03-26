import { useState, useCallback, useMemo, createContext, useContext } from "react"
import { useObjectMemo } from "../react/memo"
import { ChildrenProps } from "../react/props/children"
import { Gradients } from "../colors/colors"

export interface ColorHandle {
    current?: Colors
    set(newColor?: number): void
  }

export const ColorContext = createContext<ColorHandle | undefined>(undefined)

export function useColor() {
    return useContext(ColorContext)!
}

export type Colors = {color: number, gradient: string, text: string, border: string}

export function ColorProvider(props: ChildrenProps) {

    const [color1, color2] = Gradients.get(10)

    // const [color, setColor] = useState<Colors>({color: 9, gradient: "from-sky-400 to-blue-400", text : "text-sky-500", border: "border-sky-700"})
    const [color, setColor] = useState<Colors>({color: 10, gradient: `from-${color1} to-${color2}`, text : `text-${color1}`, border: `border-${color1}`})

    const set = useCallback((newColor: number) => {
      const [test1, test2] =  Gradients.get(newColor)
      if (test1 && test2) {
        setColor({color: newColor, gradient: `from-${test1} to-${test2}`, text : `text-${test2}`, border: `border-${test1}`})
      }
    }, [])
  
    const current = useMemo(() => {
      return color
    }, [color])
  
    const handle = useObjectMemo({ current, set })
  
    return <ColorContext.Provider value={handle}>
      {props.children}
    </ColorContext.Provider>
  }
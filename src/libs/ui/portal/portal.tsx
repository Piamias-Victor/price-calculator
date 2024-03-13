import { useLazyMemo } from "@/libs/react/memo"
import { ChildrenProps } from "@/libs/react/props/children"
import { useEffect } from "react"
import { createPortal } from "react-dom"
import { TypeProps } from "../../react/props/type"

export function Portal(props: TypeProps  & ChildrenProps) {
  const {
    children,
    type,
  } = props

  const element = useLazyMemo(() => {
    return document.createElement(type)
  }, [type])


  if (element == null)
    return null

  return <>{createPortal(children, element)}</>
}

export namespace Portal {

  export function Test() {
    return <div className="p-1">
      <Portal type="div">
        Hello world
      </Portal>
      <div className="">
        Hello world
      </div>
    </div>
  }

}
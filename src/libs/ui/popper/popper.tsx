import { useElement } from "@/libs/react/handles/element"
import { ChildrenProps } from "@/libs/react/props/children"
import { TargetProps } from "@/libs/react/props/target"
import { usePopper } from "react-popper"
import { Modal } from "../modal/modal"
import { useBooleanHandle } from "@/libs/react/handles/boolean"
import { ClassNameProps } from "@/libs/react/props/className"


export const popperNoOffsetOptions: any = {
  placement: "bottom",
  modifiers: [{
    name: 'offset',
    options: {
      offset: [0, 5],
    },
  }]
}

export function HoverPopper(props: TargetProps & ChildrenProps) {

  const { children, target } = props

  const element = useElement<HTMLDivElement>()
  const popper = usePopper(
    target.current,
    element.current,
    popperNoOffsetOptions)
  const hovered = useBooleanHandle(false)

  if (!hovered.current && !target.current)
    return null

  return <Modal>
    <div className="fixed px-2"
      style={popper.styles.popper}
      {...popper.attributes.popper}
      onMouseEnter={hovered.enable}
      onMouseLeave={hovered.disable}
      ref={element.set}>
      <div className="p-2 bg-violet2 dark:bg-violet12 border border-default rounded-xl animate-slidedown text-xs">
        {children}
      </div>
    </div>
  </Modal>
}

export function Popper(props: TargetProps & ChildrenProps & ClassNameProps) {

  const { children, target, className } = props

  const element = useElement<HTMLDivElement>()
  const popper = usePopper(
    target.current,
    element.current,
    popperNoOffsetOptions)

  return <Modal>
    <div className="fixed inset-0 animate-opacity-in"
      onClick={target.unset} />
    <div className={`fixed ${className}`}
      style={popper.styles.popper}
      {...popper.attributes.popper}
      ref={element.set}>
      <div className="w-full p-2 bg-white border border-2 rounded-xl animate-scale-in text-xs drop-shadow-md">
        {children}
      </div>
    </div>
  </Modal>
}
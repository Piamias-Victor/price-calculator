import { ChildrenProps } from "@/libs/react/props/children"
import { CloseProps } from "@/libs/react/props/close"
import { Modal } from "../modal/modal"
import {Events} from "@/libs/react/events"

export function Dialog(props: CloseProps & ChildrenProps) {
  const { close, children } = props

  return <Modal>
    <div className="p-4 fixed inset-0 animate-opacity-in"
      onMouseDown={close}
      onClick={Events.keep}>
      <div className="p-4 flex flex-col rounded-xl animate-scale-in"
        onMouseDown={Events.keep}>
        {children}
      </div>
    </div>
  </Modal>
}
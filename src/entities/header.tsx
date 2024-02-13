import { useRoute } from "@/libs/context/router";
import { Outline } from "@/libs/icons/icons";
import { ElementHandle, useElement } from "@/libs/react/handles/element";
import { ChildrenProps } from "@/libs/react/props/children";
import { ElementProps } from "@/libs/react/props/element";
import { Button } from "@/libs/ui/button";
import { Popper } from "@/libs/ui/popper/popper";

export default function Header() {
  
  const sendPopper = useElement()
  const sendPopper2 = useElement()
  const sendPopper3= useElement()
  const url = useRoute()

    return <div className="po-md w-full flex flex-row items-center justify-between text-opposite bg-gradient-to-r from-sky-400 to-blue-400">
      <Button.Base className="po-md hovered-or-clicked-or-focused:scale-105 !transition"
        onClick={() => url.set("home")}>
          <div className={`${Button.Shrinker.className}`}>
            <Outline.PlusIcon className="size-10" />
            LIS PHARMA / MEDICOR
          </div>
      </Button.Base>
      <div>
      <Message/>
      <Notif/>
      <Account/>
      </div>
    </div>
  }


function Account() {

  const sendPopper = useElement()
  const url = useRoute()


  return <>
   <Button.Base className="text-lg border-0 po-md hovered-or-clicked-or-focused:scale-105 !transition"
        onClick={sendPopper.use}>
          <div className={`${Button.Shrinker.className}`}>
            <Outline.UserCircleIcon className="size-6" />
            Compte
          </div>
      </Button.Base>
      <PopperElement element={sendPopper}>
        <div className="flex flex-col gap-4">
              <Button.Gradient className="border-0 po-md hovered-or-clicked-or-focused:scale-105 !transition"
                colorIndex={9}
                onClick={() => url.set("setting")}>
                <div className={`h-full w-full flex items-center gap-2 group-enabled:group-active:scale-90 transition-transform`}>
                  <Outline.Cog6ToothIcon className="size-5" />
                  Options
                </div>
              </Button.Gradient>
              <Button.Gradient className="border-0 po-md hovered-or-clicked-or-focused:scale-105 !transition"
                colorIndex={9}>
                <div className={`h-full w-full flex items-center gap-2 group-enabled:group-active:scale-90 transition-transform`}>
                  <Outline.LightBulbIcon className="size-5" />
                  Mode Sombre
                </div>
              </Button.Gradient>
              <Button.Gradient className="border-0 po-md hovered-or-clicked-or-focused:scale-105 !transition"
                colorIndex={9}>
                <div className={`h-full w-full flex items-center gap-2 group-enabled:group-active:scale-90 transition-transform`}>
                  <Outline.XMarkIcon className="size-5" />
                  Se Déconnecter
                </div>
              </Button.Gradient>
            </div>
      </PopperElement>
  </>
}

function Notif() {

  return <>
   <Button.Base className="text-lg border-0 po-md hovered-or-clicked-or-focused:scale-105 !transition">
          <div className={`${Button.Shrinker.className}`}>
            <Outline.BellAlertIcon className="size-6" />
          </div>
      </Button.Base>
  </>
}

function Message() {

  return <>
   <Button.Base className="text-lg border-0 po-md hovered-or-clicked-or-focused:scale-105 !transition">
          <div className={`${Button.Shrinker.className}`}>
            <Outline.ChatBubbleLeftRightIcon className="size-6" />
          </div>
      </Button.Base>
  </>
}


function PopperElement(props:ChildrenProps & ElementProps) {
  
  const { children, element } = props  

  return <>
    {element.current &&
        <Popper target={element} className="">
          {children}
        </Popper>}
  </>
}
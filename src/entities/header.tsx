import { useRoute } from "@/libs/context/router";
import { Outline } from "@/libs/icons/icons";
import { useElement } from "@/libs/react/handles/element";
import { Button } from "@/libs/ui/button";
import { Popper } from "@/libs/ui/popper/popper";

export default function Header() {
  
  const sendPopper = useElement()
  const url = useRoute()

    return <div className="po-md w-full flex flex-row items-center justify-between text-opposite bg-gradient-to-r from-sky-400 to-blue-400">
      <Button.Base className="po-md hovered-or-clicked-or-focused:scale-105 !transition"
        onClick={() => url.set("home")}>
          <div className={`${Button.Shrinker.className}`}>
            <Outline.PlusIcon className="size-10" />
            LIS PHARMA / MEDICOR
          </div>
      </Button.Base>
      <Button.Base className="border-0 po-md hovered-or-clicked-or-focused:scale-105 !transition"
        onClick={sendPopper.use}>
          <div className={`${Button.Shrinker.className}`}>
            <Outline.UserCircleIcon className="size-5" />
            Compte
          </div>
      </Button.Base>
      {sendPopper.current &&
        <Popper target={sendPopper} className="">
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
        </Popper>}
    </div>
  }
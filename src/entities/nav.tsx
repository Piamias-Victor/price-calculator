import { useRoute } from "@/libs/context/router";
import { Outline } from "@/libs/icons/icons";
import { Button } from "@/libs/ui/button";

export function Nav() {

    const url = useRoute()

    return <div className="flex flex-col gap-4 px-2 py-5 w-full">
      <Button.Gradient className=" w-full border-0 po-md hovered-or-clicked-or-focused:scale-105 !transition"
        colorIndex={9}
        onClick={() => url.set('stock')}>
          <div className={`h-full w-full flex items-center justify-between gap-2 group-enabled:group-active:scale-90 transition-transform`}>
            <Outline.ArchiveBoxArrowDownIcon className="size-5" />
              Stocks disponibles
            <Outline.ChevronRightIcon className="size-5" />
          </div>
      </Button.Gradient>
      <Button.Gradient className=" w-full border-0 po-md hovered-or-clicked-or-focused:scale-105 !transition"
        colorIndex={9}
        onClick={() => url.set('create')}>
          <div className={`h-full w-full flex items-center justify-between gap-2 group-enabled:group-active:scale-90 transition-transform`}>
            <Outline.ShoppingCartIcon className="size-5" />
              Créer une commande
            <Outline.ChevronRightIcon className="size-5" />
          </div>
      </Button.Gradient>
      <Button.Gradient className=" w-full border-0 po-md hovered-or-clicked-or-focused:scale-105 !transition"
        colorIndex={9}
        onClick={() => url.set('order')}>
          <div className={`h-full w-full flex items-center justify-between gap-2 group-enabled:group-active:scale-90 transition-transform`}>
            <Outline.TruckIcon className="size-5" />
              Mes commandes
            <Outline.ChevronRightIcon className="size-5" />
          </div>
      </Button.Gradient>
    </div>
  }
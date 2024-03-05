import { useRoute } from "@/libs/context/router";
import { Outline } from "@/libs/icons/icons";
import { Button } from "@/libs/ui/button";
import { ChildrenProps } from "@/libs/react/props/children";
import { BooleanHandleProps } from "@/libs/react/props/boolean";
import { UrlProps } from "@/libs/react/props/url";
import { useBooleanHandle } from "@/libs/react/handles/boolean";

export function Nav() {

    return <div className="flex flex-col gap-4 px-2 py-5 w-full h-[86vh] overflow-y-scroll">
      <Stock/>
      <CreateOrder/>
      <Order/>
    </div>
  }



function Stock() {

  const deploy = useBooleanHandle(true)

  return <>
    <MainNavButton boolean={deploy}>
      <Outline.ArchiveBoxArrowDownIcon className="size-5" />
      Stocks disponibles
    </MainNavButton>
      {deploy.current === true && <div className="text-sm px-4 flex flex-col gap-3 animate-scale-in">
        <NavButton path="proposal_products">
          <Outline.FlagIcon className="size-5" />
          Mes propositions
        </NavButton>
        <NavButton path="best_products">
          <Outline.FireIcon className="size-5" />
          Meilleures ventes
        </NavButton>
        <NavButton path="offer_products">
          <Outline.ReceiptPercentIcon className="size-5" />
          Offre du Moments
        </NavButton>
        <NavButton path="all_products">
          <Outline.GlobeAltIcon className="size-5" />
          Tous les produits
        </NavButton>
    </div>
    }
  </>
}

function CreateOrder() {
  const deploy = useBooleanHandle(true)

  return <>
    <MainNavButton boolean={deploy}>
      <Outline.ShoppingCartIcon className="size-5" />
      Créer une commande
    </MainNavButton>
      {deploy.current === true && <div className="text-sm px-4 flex flex-col gap-3 animate-scale-in">
        <NavButton path="stock">
          <Outline.ShoppingBagIcon className="size-5" />
          Nouvelles commandes
        </NavButton>
        <NavButton path="stock">
          <Outline.ArrowPathIcon className="size-5" />
          Repasser commande
        </NavButton>
    </div>
    }
  </>
}

function Order() {
  const deploy = useBooleanHandle(true)

  return <>
    <MainNavButton boolean={deploy}>
      <Outline.TruckIcon className="size-5" />
      Mes commandes
    </MainNavButton>
      {deploy.current === true && <div className="text-sm px-4 flex flex-col gap-3 animate-scale-in">
        <NavButton path="order">
          <Outline.ShoppingCartIcon className="size-5" />
          En préparation
        </NavButton>
        <NavButton path="order">
          <Outline.ClockIcon className="size-5" />
          En attentes
        </NavButton>
        <NavButton path="order">
        <Outline.BookmarkSquareIcon className="size-5" />
          Clôturées
        </NavButton>
        <NavButton path="order">
          <Outline.GlobeAltIcon className="size-5" />
          Toutes
        </NavButton>
    </div>
    }
  </>
}


function MainNavButton(props: ChildrenProps & BooleanHandleProps) {

  const { children, boolean } = props

  return <Button.Gradient className=" w-full border-0 po-md hovered-or-clicked-or-focused:scale-105 !transition"
    colorIndex={9}
    onClick={() => boolean?.toggle()}>
      <div className={`h-full w-full flex items-center justify-between gap-2 group-enabled:group-active:scale-90 transition-transform`}>
        {children}
        {
          !boolean?.current
            ? <Outline.ChevronRightIcon className="size-5 flex-none transition-transform duration-300" />
            : <Outline.ChevronRightIcon className="size-5 flex-none transition-transform rotate-90 duration-300" />
        }
      </div>
  </Button.Gradient>
}

function NavButton(props: ChildrenProps & UrlProps) {

  const { children, path } = props
  const url = useRoute()


  return <Button.Contrast className=" w-full border-0 po-md hovered-or-clicked-or-focused:scale-105 !transition"
    onClick={() => url?.set(path)}>
      <div className={`h-full w-full flex items-center justify-between gap-2 group-enabled:group-active:scale-90 transition-transform`}>
        {children}
        <Outline.ChevronRightIcon className="size-5" />
      </div>
  </Button.Contrast>
}
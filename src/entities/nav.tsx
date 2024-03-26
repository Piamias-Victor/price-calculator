import { useRoute } from "@/libs/context/router";
import { Outline } from "@/libs/icons/icons";
import { Button } from "@/libs/ui/button";
import { ChildrenProps } from "@/libs/react/props/children";
import { BooleanHandleProps, BooleanProps } from "@/libs/react/props/boolean";
import { UrlProps } from "@/libs/react/props/url";
import { useBooleanHandle } from "@/libs/react/handles/boolean";
import { useColor } from "@/libs/context/color";
import { useAccount } from "@/libs/context/account";

export function Nav() {

  const account = useAccount()

    return <div className="flex flex-col gap-4 px-2 py-5 w-full h-[86vh] overflow-y-scroll">
      <Stock/>
      <CreateOrder/>
      {account.current !== 4 && <Order/>}
      {account.current !== 2 && <Shipping/>}
    </div>
  }



function Stock() {

  const deploy = useBooleanHandle(true)
  const url = useRoute()
  const account = useAccount()

  return <>
    <MainNavButton boolean={deploy}>
      <Outline.ArchiveBoxArrowDownIcon className="size-5" />
      Stocks disponibles
    </MainNavButton>
      {deploy.current === true && account.current === 2 ? <div className="text-sm px-4 flex flex-col gap-3 animate-scale-in">
        <NavButton path="proposal_products" boolean={url.current === "proposal_products"}>
          <Outline.FlagIcon className="size-5" />
          Mes propositions
        </NavButton>
        <NavButton path="best_products" boolean={url.current === "best_products"}>
          <Outline.FireIcon className="size-5" />
          Meilleures ventes
        </NavButton>
        <NavButton path="offer_products" boolean={url.current === "offer_products"}>
          <Outline.ReceiptPercentIcon className="size-5" />
          Offre du Moments
        </NavButton>
        <NavButton path="all_products" boolean={url.current === "all_products"}>
          <Outline.GlobeAltIcon className="size-5" />
          Tous les produits
        </NavButton>
    </div> : deploy.current === true &&
    <div className="text-sm px-4 flex flex-col gap-3 animate-scale-in">
    <NavButton path="best_products" boolean={url.current === "best_products"}>
      <Outline.FireIcon className="size-5" />
      Meilleures ventes
    </NavButton>
    <NavButton path="offer_products" boolean={url.current === "offer_products"}>
      <Outline.ReceiptPercentIcon className="size-5" />
      Offre du Moments
    </NavButton>
    <NavButton path="all_products" boolean={url.current === "all_products"}>
      <Outline.GlobeAltIcon className="size-5" />
      Tous les produits
    </NavButton>
</div>
    }
  </>
}

function CreateOrder() {
  const deploy = useBooleanHandle(true)
  const url = useRoute()
  const account = useAccount()

  return <>
    <MainNavButton boolean={deploy}>
      <Outline.ShoppingCartIcon className="size-5" />
      Gérer commande
    </MainNavButton>
      {deploy.current === true && account.current != 4 ? <div className="text-sm px-4 flex flex-col gap-3 animate-scale-in">
       <NavButton path="create" boolean={url.current === "create"}>
          <Outline.ShoppingBagIcon className="size-5" />
          Nouvelles commandes
        </NavButton>
        <NavButton path="suivie" boolean={url.current === "suivie"}>
          <Outline.ArrowsRightLeftIcon className="size-5" />
          Suivie des demandes
        </NavButton>
    </div>
    : deploy.current === true && <div className="text-sm px-4 flex flex-col gap-3 animate-scale-in">
      <NavButton path="suivie" boolean={url.current === "suivie"}>
        <Outline.ArrowsRightLeftIcon className="size-5" />
        Suivie des demandes
      </NavButton>
  </div>}
  </>
}

function Order() {
  const deploy = useBooleanHandle(true)
  const url = useRoute()

  return <>
    <MainNavButton boolean={deploy}>
      <Outline.TruckIcon className="size-5" />
      Mes commandes
    </MainNavButton>
      {deploy.current === true && <div className="text-sm px-4 flex flex-col gap-3 animate-scale-in">
        <NavButton path="wait" boolean={url.current === "wait"}>
          <Outline.ShoppingCartIcon className="size-5" />
          En préparations
        </NavButton>
        <NavButton path="travel" boolean={url.current === "travel"}>
          <Outline.ClockIcon className="size-5" />
          En attentes
        </NavButton>
        <NavButton path="close" boolean={url.current === "close"}>
        <Outline.BookmarkSquareIcon className="size-5" />
          Clôturées
        </NavButton>
        <NavButton path="order" boolean={url.current === "order"}>
          <Outline.GlobeAltIcon className="size-5" />
          Toutes
        </NavButton>
    </div>
    }
  </>
}

function Shipping() {
  const deploy = useBooleanHandle(true)
  const url = useRoute()

  return <>
    <MainNavButton boolean={deploy}>
      <Outline.BriefcaseIcon className="size-5" />
      Mes livraisons
    </MainNavButton>
      {deploy.current === true && <div className="text-sm px-4 flex flex-col gap-3 animate-scale-in">
        <NavButton path="wait1" boolean={url.current === "wait1"}>
          <Outline.MapIcon className="size-5" />
          A expédier
        </NavButton>
        <NavButton path="travel1" boolean={url.current === "travel1"}>
          <Outline.ArrowsRightLeftIcon className="size-5" />
          En cours de livraison
        </NavButton>
        <NavButton path="order1" boolean={url.current === "order1"}>
          <Outline.GlobeAltIcon className="size-5" />
          Toutes
        </NavButton>
    </div>
    }
  </>
}


function MainNavButton(props: ChildrenProps & BooleanHandleProps) {

  const { children, boolean } = props
  const color = useColor()

  return <Button.Gradient className=" w-full border-0 po-md hovered-or-clicked-or-focused:scale-105 !transition"
    colorIndex={color.current?.color!}
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

function NavButton(props: ChildrenProps & UrlProps & BooleanProps) {

  const { children, path, boolean } = props
  const url = useRoute()
  const color = useColor()

  return <Button.Contrast className=" w-full border-0 po-md hovered-or-clicked-or-focused:scale-105 !transition"
    onClick={() => url?.set(path)}>
      {
        !boolean
          ? <div className={`h-full w-full flex items-center justify-between gap-2 group-enabled:group-active:scale-90 transition-transform`}>
              {children}
              <Outline.ChevronRightIcon className="size-5" />
            </div>
          : <div className={`${color.current?.text} h-full w-full flex items-center justify-between gap-2 group-enabled:group-active:scale-90 transition-transform`}>
          {children}
          <Outline.ChevronRightIcon className="size-5" />
        </div>
      }
  </Button.Contrast>
}
import { Outline } from "@/libs/icons/icons";
import { useBooleanHandle } from "@/libs/react/handles/boolean";
import { Button } from "@/libs/ui/button";
import { Dialog } from "@/libs/ui/dialog/dialog";
import { Input } from "@/libs/ui/input";
import RequestPopper from "./request";
import { BooleanHandleProps } from "@/libs/react/props/boolean";
import { useCallback, useState } from "react";
import { useNumber } from "@/libs/react/number";
import { useRoute } from "@/libs/context/router";
import { useColor } from "@/libs/context/color";
import { useAccount } from "@/libs/context/account";

export function Suivie({dataset} : SuivieDataProps) {
    const sendPopper = useBooleanHandle(false)
    const color = useColor()
    const account = useAccount()

    return <>
       <div className="w-full flex items-center justify-between px-4">  
            <div className="bg-[#f2f2f2] rounded-[15px] flex items-center justify-center">
                <Input.Contrast placeholder="Produits / Marques"/>
                <Button.Gradient className="rounded-[10px] m-[5px] border-0 po-md hovered-or-clicked-or-focused:scale-105 !transition"
                    colorIndex={color.current?.color!}>
                    <div className={`h-full w-full group-enabled:group-active:scale-90 transition-transform`}>
                        <Outline.MagnifyingGlassIcon className="size-5" />
                    </div>
                </Button.Gradient>
            </div>  
            {account.current === 2 && <Button.Gradient className="rounded-[15px] m-[5px] border-0 po-md hovered-or-clicked-or-focused:scale-105 !transition"
                    colorIndex={color.current?.color!}
                    onClick={sendPopper.toggle}>
                <div className={`h-full w-full flex items-center justify-between gap-2 group-enabled:group-active:scale-90 transition-transform`}>
                    Faire une demande
                    <Outline.PlusIcon className="size-5" />
                </div>
            </Button.Gradient>}    
        </div>
        <div className="flex flex-col h-[75vh] overflow-y-scroll">
            <div className="overflow-x-auto">
            <div className="inline-block min-w-full py-2">
                <div className="overflow-hidden">
                <table className="min-w-full text-left text-sm font-light">
                    <thead className="border-b font-medium">
                        <tr>
                            <th scope="col" className="px-6 py-4">Date</th>
                            <th scope="col" className="px-6 py-4">Ean 13</th>
                            <th scope="col" className="px-6 py-4">Nom</th>
                            <th scope="col" className="px-6 py-4">Lot</th>
                            <th scope="col" className="px-6 py-4">Etat</th>
                            <th scope="col" className="px-6 py-4">Péremption</th>
                            <th scope="col" className="px-6 py-4">Etape</th>
                            <th scope="col" className="px-6 py-4">Details</th>
                        </tr>
                    </thead>
                    <tbody className="">
                        <SuivieLine dataset={dataset} boolean={sendPopper}/>
                    </tbody>
                </table>
                </div>
            </div>
            </div>
        </div>
        {sendPopper.current && <Dialog close={sendPopper.toggle}>
            <RequestPopper boolean={sendPopper}/>
      </Dialog>}
    </>
  }

function SuivieLine({dataset, boolean} : any) {

    return <>
    {
        dataset.map((item : any, index : any) =>
        <ProductLine
              key={index}
              data={item}
              boolean={boolean} />)
    }
    </>
}

function ProductLine({ data, boolean }: any) {

    const details = useBooleanHandle(false)
    const color = useColor()

    return <>
        <tr className="border-b">
            <td className="whitespace-nowrap px-6 py-4 font-medium">01/01/2024</td>
            <td className="whitespace-nowrap px-6 py-4">{data.Ean}</td>
            <td className="whitespace-nowrap px-6 py-4">{data.Name}</td>
            <td className="whitespace-nowrap px-6 py-4">{data.Offers[0].Lots}</td>
            <td className="whitespace-nowrap px-6 py-4">{data.Offers[0].States}</td>
            <td className="whitespace-nowrap px-6 py-4">{data.Offers[0].Expiration}</td>
            <td className="whitespace-nowrap px-6 py-4">{data.Deal === 1 && <span>Commande validée</span>}{data.Deal === 2 && <span>Attente fournisseur</span>}{data.Deal === 3 && <span>Attente réponse</span>}</td>
            <td className="whitespace-nowrap px-6 py-4 flex items-center">
                <Button.Gradient className="flex items-center border-0 po-md hovered-or-clicked-or-focused:scale-105 !transition"
                    colorIndex={color.current?.color!}
                    onClick={details.toggle}>
                    <div className={`h-full w-full flex items-center justify-between gap-2 group-enabled:group-active:scale-90 transition-transform`}>
                    {
                        !details?.current
                            ? <Outline.ChevronDownIcon className="size-5 flex-none transition-transform duration-300" />
                            : <Outline.ChevronDownIcon className="size-5 flex-none transition-transform rotate-180 duration-300" />
                    }
                    </div>
                </Button.Gradient>
            </td>
        </tr>
        {details.current === true && <>
            <tr className="font-medium bg-contrast">
                <td scope="col" className="px-6 py-4">Date</td>
                <td scope="col" className="px-6 py-4">Quantité</td>
                <td scope="col" className="px-6 py-4">Prix</td>
                <th scope="col" className="px-6 py-4">Lot</th>
                <th scope="col" className="px-6 py-4">Etat</th>
                <th scope="col" className="px-6 py-4">Péremption</th>
                <td colSpan={2} scope="col" className="px-6 py-4 text-center">Action</td>
            </tr>
            <>
                {data.Offers.map((item : any, index : any) =>
                    <DetailsLine
                        key={index}
                        data={item}
                        boolean={boolean}/>)}
            </>
        </>
        }
    </>
}


function DetailsLine({data , boolean}: any) {

    const stock = useNumber(data.Stock)

    const url = useRoute()

    const Test = useCallback(() => {
        stock.set(75)
      }, [stock]);

    const Test2 = useCallback(() => {
        boolean.toggle()
        stock.set(25)
      }, [stock, boolean]);

    return <tr className="bg-contrast">
        <td className="whitespace-nowrap px-6 py-4">{data.Expiration}</td>
        <td className="whitespace-nowrap px-6 py-4">{data.Stock}</td>
        <td className="whitespace-nowrap px-6 py-4">{data.Price}</td>
        <td className="whitespace-nowrap px-6 py-4">{data.Lots}</td>
        <td className="whitespace-nowrap px-6 py-4">{data.States}</td>
        <td className="whitespace-nowrap px-6 py-4">{data.Expiration}</td>
        <td colSpan={2} className="whitespace-nowrap  px-6 py-4">
            <div className="flex items-center justify-center gap-8">
                {stock.current === 40 && <>
                    <Button.Gradient className="border-0 po-md hovered-or-clicked-or-focused:scale-105 !transition"
                        colorIndex={5}
                        onClick={Test}>
                        <div className={`flex gap-2 h-full w-full group-enabled:group-active:scale-90 transition-transform`}>
                            Valider
                            <Outline.CheckIcon className="size-5" />
                        </div>
                    </Button.Gradient>
                    <Button.Gradient className="border-0 po-md hovered-or-clicked-or-focused:scale-105 !transition"
                        colorIndex={0}
                        onClick={Test2}>
                        <div className={`flex gap-2 h-full w-full group-enabled:group-active:scale-90 transition-transform`}>
                            Refuser
                            <Outline.XMarkIcon className="size-5" />
                        </div>
                    </Button.Gradient>
                </>}
                {stock.current === 75 && <Button.Gradient className="border-0 po-md hovered-or-clicked-or-focused:scale-105 !transition"
                        colorIndex={5}
                        onClick={() => url.set('order2')}>
                        <div className={`flex gap-2 h-full w-full group-enabled:group-active:scale-90 transition-transform`}>
                            Commande 1865
                            <Outline.ArchiveBoxIcon className="size-5" />
                        </div>
                    </Button.Gradient>}
                {stock.current === 25 && <Button.Gradient className="border-0 po-md hovered-or-clicked-or-focused:scale-105 !transition"
                    colorIndex={0}>
                        <div className={`flex gap-2 h-full w-full group-enabled:group-active:scale-90 transition-transform`}>
                            Offre négociée
                            <Outline.TrashIcon className="size-5" />
                        </div>
                    </Button.Gradient>}
            </div>
        </td>
    </tr>
}

interface SuivieDataProps {
    dataset : SuivieData
}

interface ProductLineProps {
    key : any;
    data: ProductData
}

interface OfferLineProps {
    key : any;
    data: Offer
}

export type SuivieData = ProductData[]
export interface ProductData {
    Ean: string,
    Name: string,
    Marques: string,
    Deal: number,
    Stock: number,
    Offers: Offer[]
}

export interface Offer {
    Stock : number,
    Expiration : string,
    States : string,
    Lots : number,
    Price : string
}
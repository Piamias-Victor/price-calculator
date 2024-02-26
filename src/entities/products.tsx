import { Outline } from "@/libs/icons/icons";
import { useInputChange } from "@/libs/react/events";
import { useBooleanHandle } from "@/libs/react/handles/boolean";
import { InputProps } from "@/libs/react/props/html";
import { StringHandleProps } from "@/libs/react/props/string";
import { Button } from "@/libs/ui/button";
import { Input } from "@/libs/ui/input";
import { useMemo } from "react";

export function Products({dataset} : ProductsDataProps) {
    return <>
        <div className="w-full flex items-center px-4">  
            <div className="bg-[#f2f2f2] rounded-[15px] flex items-center justify-center">
                <Input.Contrast placeholder="Produits / Marques"/>
                <Button.Gradient className="rounded-[10px] m-[5px] border-0 po-md hovered-or-clicked-or-focused:scale-105 !transition"
                    colorIndex={9}>
                    <div className={`h-full w-full group-enabled:group-active:scale-90 transition-transform`}>
                        <Outline.MagnifyingGlassIcon className="size-5" />
                    </div>
                </Button.Gradient>
            </div>            
        </div>
        <div className="flex flex-col h-[75vh] overflow-y-scroll">
            <div className="overflow-x-auto">
            <div className="inline-block min-w-full py-2">
                <div className="overflow-hidden">
                <table className="min-w-full text-left text-sm font-light">
                    <thead className="border-b font-medium">
                    <tr>
                        <th scope="col" className="px-6 py-4">EAN 13</th>
                        <th scope="col" className="px-6 py-4">Nom</th>
                        <th scope="col" className="px-6 py-4">Marque</th>
                        <th scope="col" className="px-6 py-4">Offres</th>
                        <th scope="col" className="px-6 py-4">Quantité</th>
                        <th scope="col" className="px-6 py-4">Details</th>
                    </tr>
                    </thead>
                    <tbody className="">
                        <ProductsLine dataset={dataset}/>
                    </tbody>
                </table>
                </div>
            </div>
            </div>
        </div>
    </>
      
    
  }

function ProductsLine({dataset} : ProductsDataProps) {

    return <>
    {
        dataset.map((item, index) =>
        <ProductLine
              key={index}
              data={item} />)
    }
    </>
}

function ProductLine({ data }: ProductLineProps) {

    const details = useBooleanHandle(false)

    console.log(data)

    return <>
        <tr className="border-b">
            <td className="whitespace-nowrap px-6 py-4 font-medium">{data.Ean}</td>
            <td className="whitespace-nowrap px-6 py-4">{data.Name}</td>
            <td className="whitespace-nowrap px-6 py-4">{data.Marques}</td>
            <td className="whitespace-nowrap px-6 py-4">{data.Deal}</td>
            <td className="whitespace-nowrap px-6 py-4">{data.Stock}</td>
            <td className="whitespace-nowrap px-6 py-4 flex items-center">
                <Button.Gradient className="flex items-center border-0 po-md hovered-or-clicked-or-focused:scale-105 !transition"
                    colorIndex={9}
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
                <td scope="col" className="px-6 py-4">Péremptions</td>
                <td scope="col" className="px-6 py-4">États</td>
                <td scope="col" className="px-6 py-4">Lots</td>
                <td scope="col" className="px-6 py-4">Prix</td>
                <td scope="col" className="px-6 py-4">Quantité</td>
                <td scope="col" className="px-6 py-4">Panier</td>
            </tr>
            <>
                {data.Offers.map((item, index) =>
                    <DetailsLine
                        key={index}
                        data={item} />)}
            </>
        </>
        }
    </>
}


function DetailsLine({data}: OfferLineProps) {

    return <tr className="bg-contrast">
        <td className="whitespace-nowrap px-6 py-4">{data.Expiration}</td>
        <td className="whitespace-nowrap px-6 py-4">{data.States}</td>
        <td className="whitespace-nowrap px-6 py-4">{data.Stock}</td>
        <td className="whitespace-nowrap px-6 py-4">{data.Price}</td>
        <td className="whitespace-nowrap px-6 py-4">{data.Stock}</td>
        <td className="whitespace-nowrap  px-6 py-4">
            <Button.Gradient className="border-0 po-md hovered-or-clicked-or-focused:scale-105 !transition"
                colorIndex={9}>
                <div className={`h-full w-full group-enabled:group-active:scale-90 transition-transform`}>
                    <Outline.PlusIcon className="size-5" />
                </div>
            </Button.Gradient>
        </td>
    </tr>
}

interface ProductsDataProps {
    dataset : ProductsData
}

interface ProductLineProps {
    key : any;
    data: ProductData
}

interface OfferLineProps {
    key : any;
    data: Offer
}

export type ProductsData = ProductData[]
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
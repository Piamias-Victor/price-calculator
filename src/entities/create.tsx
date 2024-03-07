import { Outline } from "@/libs/icons/icons";
import { useInputChange } from "@/libs/react/events";
import { useBooleanHandle } from "@/libs/react/handles/boolean";
import { useElement } from "@/libs/react/handles/element";
import { InputProps } from "@/libs/react/props/html";
import { StringHandleProps } from "@/libs/react/props/string";
import { Button } from "@/libs/ui/button";
import { Input } from "@/libs/ui/input";
import { useMemo, useState } from "react";
import { ChildrenProps } from "@/libs/react/props/children";
import { ElementProps } from "@/libs/react/props/element";
import { Popper } from "@/libs/ui/popper/popper";
import { Dialog } from "@/libs/ui/dialog/dialog";
import Datepicker from "react-tailwindcss-datepicker"; 
import Select from "react-tailwindcss-select";
import { useRoute } from "@/libs/context/router";

export function Create({dataset} : CreateDataProps) {

    const url = useRoute()
    const sendPopper = useBooleanHandle(url.current === 'create2')
       
    const [value, setValue] = useState({ 
        startDate: new Date(), 
        endDate: new Date()
        }); 
    const [value2, setValue2] = useState({ 
        startDate: new Date(), 
        endDate: new Date()
        }); 

    const handleValueChange = (newValue : any) => {
            setValue(newValue); 
            } 
    const handleValueChange2 = (newValue : any) => {
        setValue2(newValue); 
        } 

    const [lot, setLot] = useState(null);
    const [etat, setEtat] = useState(null);
    
    const handleEtatChange  = (value : any) => {
        setEtat(value);
    };
    const handleLotChange = (value : any) => {
        setLot(value);
    };

    const options = [
        { value: "1", label: "1" },
        { value: "2", label: "2" },
        { value: "5", label: "5"},
        { value: "10", label: "10"},
        { value: "20", label: "20"},
        { value: "25", label: "25"},
        { value: "50", label: "50"}
    ];

    const options2 = [
        { value: "Neuf", label: "Neuf" },
        { value: "Ouvert", label: "Ouvert" },
        { value: "Abimé", label: "Abimé"},
    ];

    return <>
        <div className="w-full flex items-center justify-between px-4">  
            <div className="bg-[#f2f2f2] rounded-[15px] flex items-center justify-center">
                <Input.Contrast placeholder="Produits / Marques"/>
                <Button.Gradient className="rounded-[10px] m-[5px] border-0 po-md hovered-or-clicked-or-focused:scale-105 !transition"
                    colorIndex={9}>
                    <div className={`h-full w-full group-enabled:group-active:scale-90 transition-transform`}>
                        <Outline.MagnifyingGlassIcon className="size-5" />
                    </div>
                </Button.Gradient>
            </div>  
            <Button.Gradient className="rounded-[15px] m-[5px] border-0 po-md hovered-or-clicked-or-focused:scale-105 !transition"
                    colorIndex={9}
                    onClick={sendPopper.toggle}>
                <div className={`h-full w-full flex items-center justify-between gap-2 group-enabled:group-active:scale-90 transition-transform`}>
                    Faire une demande
                    <Outline.PlusIcon className="size-5" />
                </div>
            </Button.Gradient>    
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
                        <CreateLine dataset={dataset}/>
                    </tbody>
                </table>
                </div>
            </div>
            </div>
        </div>
        {sendPopper.current && <Dialog close={sendPopper.toggle}>
        <span className="text-center text-xl text-sky-500 font-bold">
            Faire une demande
        </span>
        <div className="flex flex-col gap-8 p-8">
            <div className="bg-[#f2f2f2] rounded-[15px] flex items-center justify-center">
                <Input.Contrast className="w-full" placeholder="Chercher le produit"/>
                <Button.Gradient className="rounded-[10px] m-[5px] border-0 po-md hovered-or-clicked-or-focused:scale-105 !transition"
                    colorIndex={9}>
                    <div className={`h-full w-full group-enabled:group-active:scale-90 transition-transform`}>
                        <Outline.MagnifyingGlassIcon className="size-5" />
                    </div>
                </Button.Gradient>
            </div>  
            <span className="text-sm italic text-center">
                3400956369553 - DOLIPRANE 1000 mg Cpr Plq/100 - Sanofi
            </span>
            <div className="flex justify-between gap-8">
                <div className="flex flex-col gap-4 text-center p-4 w-full rounded-t-xl rounded-l-xl text-opposite border border-sky-400 bg-gradient-to-r from-sky-400 to-blue-400">
                    <span className="text-sm font-bold">
                        Date de péremption mini
                    </span>
                    <Datepicker
                        primaryColor={"sky"}
                        placeholder={"Date"} 
                        asSingle={true}
                        useRange={false} 
                        value={value} 
                        onChange={handleValueChange} 
                        /> 
                </div>
                <div className="flex flex-col gap-4 text-center p-4 w-full rounded-t-xl rounded-r-xl text-opposite border border-sky-400 bg-gradient-to-r from-sky-400 to-blue-400">
                    <span className="text-sm font-bold">
                        Date de péremption max
                    </span>
                    <Datepicker
                        primaryColor={"sky"}
                        placeholder={"Date"} 
                        asSingle={true}
                        useRange={false} 
                        value={value2} 
                        onChange={handleValueChange2} 
                        /> 
                </div>
            </div>
            <div className="flex justify-between gap-8">
                <div className="flex flex-col gap-4 text-center p-4 w-full rounded-xl text-opposite border border-sky-400 bg-gradient-to-r from-sky-400 to-blue-400">
                    <span className="font-bold">
                        Conditionnement des lots
                    </span>
                    <Select
                        placeholder="Lot"
                        primaryColor="sky"
                        value={lot}
                        onChange={handleLotChange}
                        options={options}
                    />
                </div>
            </div>
            <div className="flex justify-between gap-8">
                <div className="flex flex-col gap-4 text-center p-4 w-full rounded-xl text-opposite border border-sky-400 bg-gradient-to-r from-sky-400 to-blue-400">
                    <span className="font-bold">
                        État des produits
                    </span>
                    <Select
                        placeholder="État"
                        primaryColor="sky"
                        value={etat}
                        onChange={handleEtatChange}
                        options={options2}
                    />
                </div>
            </div>
            <div className="grown"/>
            <Button.Gradient className="rounded-lg border-0 po-md hovered-or-clicked-or-focused:scale-105 !transition"
                    colorIndex={9}
                    onClick={sendPopper.toggle}>
                <div className="font-bold">
                    Validez votre demande !
                </div>
                <div className="text-sm">
                    Une alerte vous serez envoyé quand une offre correspondra à vos besoins.
                </div>
            </Button.Gradient> 
        </div>
      </Dialog>}
    </>
      
    
  }

function CreateLine({dataset} : CreateDataProps) {

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

interface CreateDataProps {
    dataset : CreateData
}

interface ProductLineProps {
    key : any;
    data: ProductData
}

interface OfferLineProps {
    key : any;
    data: Offer
}

export type CreateData = ProductData[]
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
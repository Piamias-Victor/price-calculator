import { Outline } from "@/libs/icons/icons"
import { Dialog } from "@/libs/ui/dialog/dialog"
import { Input } from "@/libs/ui/input"
import { Button } from "@/libs/ui/button";
import Datepicker from "react-tailwindcss-datepicker"
import Select from "react-tailwindcss-select"
import { useState } from "react";
import { BooleanHandleProps } from "@/libs/react/props/boolean";
import { useColor } from "@/libs/context/color";

export default function RequestPopper(props: BooleanHandleProps) {

    const { boolean } = props

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

    const color = useColor()

    return <>
            <span className={`text-center text-xl ${color.current?.text} font-bold`}>
            Faire une demande
        </span>
        <div className="flex flex-col gap-8 p-8">
            <div className="bg-[#f2f2f2] rounded-[15px] flex items-center justify-center">
                <Input.Contrast className="w-full" placeholder="Chercher le produit"/>
                <Button.Gradient className="rounded-[10px] m-[5px] border-0 po-md hovered-or-clicked-or-focused:scale-105 !transition"
                    colorIndex={color.current?.color!}>
                    <div className={`h-full w-full group-enabled:group-active:scale-90 transition-transform`}>
                        <Outline.MagnifyingGlassIcon className="size-5" />
                    </div>
                </Button.Gradient>
            </div>  
            <span className="text-sm italic text-center">
                3400956369553 - DOLIPRANE 1000 mg Cpr Plq/100 - Sanofi
            </span>
            <div className="flex justify-between gap-8">
                <div className={`flex flex-col gap-4 text-center p-4 w-full rounded-t-xl rounded-l-xl text-opposite border ${color.current?.border} bg-gradient-to-r ${color.current?.gradient}`}>
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
                <div className={`flex flex-col gap-4 text-center p-4 w-full rounded-t-xl rounded-r-xl text-opposite border ${color.current?.border} bg-gradient-to-r ${color.current?.gradient}`}>
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
                <div className={`flex flex-col gap-4 text-center p-4 w-full rounded-xl text-opposite border ${color.current?.border} bg-gradient-to-r ${color.current?.gradient}`}>
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
                <div className={`flex flex-col gap-4 text-center p-4 w-full rounded-xl text-opposite border ${color.current?.border} bg-gradient-to-r ${color.current?.gradient}`}>
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
                    colorIndex={color.current?.color!}
                    onClick={boolean?.toggle}>
                <div className="font-bold">
                    Validez votre demande !
                </div>
                <div className="text-sm">
                    Une alerte vous serez envoyé quand une offre correspondra à vos besoins.
                </div>
            </Button.Gradient> 
        </div>
    </>
}
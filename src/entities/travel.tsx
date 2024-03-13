import { useRoute } from "@/libs/context/router";
import { Outline } from "@/libs/icons/icons";
import { ExternalDivisionLink } from "@/libs/next/anchor";
import { Button } from "@/libs/ui/button";
import { Input } from "@/libs/ui/input";
import Link from "next/link";

export function OrdersTravel() {

    const url = useRoute()

    return <div className="flex flex-col gap-4 px-4">
        <div className="w-full flex items-center">
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
        <table className="min-w-full text-left text-sm font-light">
            <thead className="border-b font-medium">
            <tr>
                <th scope="col" className="px-6 py-4">Numero</th>
                <th scope="col" className="px-6 py-4">Date</th>
                <th scope="col" className="px-6 py-4">Etape</th>
                <th scope="col" className="px-6 py-4">Quantite</th>
                <th scope="col" className="px-6 py-4">Montant HT</th>
                <th scope="col" className="px-6 py-4">Montant TTC</th>
                <th scope="col" className="px-6 py-4">Details</th>
            </tr>
            </thead>
            <tbody className="">
                <tr onClick={() => url.set('order2')} className="border-b bg-sky-100 cursor-pointer">
                    <td className="whitespace-nowrap px-6 py-4 font-medium">1</td>
                    <td className="whitespace-nowrap px-6 py-4 font-medium">15/02/2024</td>
                    <td className="whitespace-nowrap px-6 py-4 font-medium">En attente de réapprovisionnement</td>
                    <td className="whitespace-nowrap px-6 py-4 font-medium">250</td>
                    <td className="whitespace-nowrap px-6 py-4 font-medium">2670 €</td>
                    <td className="whitespace-nowrap px-6 py-4 font-medium">2820 €</td>
                    <td className="whitespace-nowrap  px-6 py-4">
                        <Button.Gradient className="border-0 po-md hovered-or-clicked-or-focused:scale-105 !transition"
                            colorIndex={9}>
                            <div className={`h-full w-full group-enabled:group-active:scale-90 transition-transform`}>
                                <Outline.ChevronRightIcon className="size-5" />
                            </div>
                        </Button.Gradient>
                    </td>
                </tr>
                <tr onClick={() => url.set('order2')} className="border-b bg-sky-200 cursor-pointer">
                    <td className="whitespace-nowrap px-6 py-4 font-medium">1</td>
                    <td className="whitespace-nowrap px-6 py-4 font-medium">15/02/2024</td>
                    <td className="whitespace-nowrap px-6 py-4 font-medium">En cours de Livraison</td>
                    <td className="whitespace-nowrap px-6 py-4 font-medium">250</td>
                    <td className="whitespace-nowrap px-6 py-4 font-medium">2670 €</td>
                    <td className="whitespace-nowrap px-6 py-4 font-medium">2820 €</td>
                    <td className="whitespace-nowrap  px-6 py-4">
                        <Button.Gradient className="border-0 po-md hovered-or-clicked-or-focused:scale-105 !transition"
                            colorIndex={9}>
                            <div className={`h-full w-full group-enabled:group-active:scale-90 transition-transform`}>
                                <Outline.ChevronRightIcon className="size-5" />
                            </div>
                        </Button.Gradient>
                    </td>
                </tr>
            </tbody>
        </table>
    </div> 
}
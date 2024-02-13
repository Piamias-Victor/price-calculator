import { Outline } from "@/libs/icons/icons";
import { useBooleanHandle } from "@/libs/react/handles/boolean";
import { Button } from "@/libs/ui/button";


export function Products() {
    return <>
        <span>Searchbar</span>
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
                        <ProductsLine/>
                    </tbody>
                </table>
                </div>
            </div>
            </div>
        </div>
    </>
      
    
  }

function ProductsLine() {

    return <>
        <ProductLine/>
        <ProductLineTest/>
        <ProductLine/>
        <ProductLine/>
        <ProductLine/>
        <ProductLine/>
        <ProductLine/>
        <ProductLine/>
        <ProductLine/>
        <ProductLine/>
        <ProductLine/>
        <ProductLine/>
        <ProductLine/>
        <ProductLine/>
        <ProductLine/>
        <ProductLine/>
        <ProductLine/>
        <ProductLine/>
        <ProductLine/>
        <ProductLine/>
        <ProductLine/>
        <ProductLine/>
        <ProductLine/>
        <ProductLine/>
        <ProductLine/>
        <ProductLine/>
        <ProductLine/>
        <ProductLine/>
    </>
}

function ProductLine() {

    return <tr className="border-b">
    <td className="whitespace-nowrap px-6 py-4 font-medium">3400956369553</td>
    <td className="whitespace-nowrap px-6 py-4">DOLIPRANE 1000 mg Cpr Plq/100</td>
    <td className="whitespace-nowrap px-6 py-4">Sanofi</td>
    <td className="whitespace-nowrap px-6 py-4">2</td>
    <td className="whitespace-nowrap px-6 py-4">200</td>
    <td className="whitespace-nowrap px-6 py-4 flex items-center">
        <Button.Gradient className="flex items-center border-0 po-md hovered-or-clicked-or-focused:scale-105 !transition"
            colorIndex={9}>
            <div className={`h-full w-full flex items-center justify-between gap-2 group-enabled:group-active:scale-90 transition-transform`}>
                <Outline.ChevronDownIcon className="size-5" />
            </div>
        </Button.Gradient>
    </td>
  </tr>
}

function ProductLineTest() {

    const details = useBooleanHandle(false)

    return <>
        <tr className="border-b">
            <td className="whitespace-nowrap px-6 py-4 font-medium">3400956369553</td>
            <td className="whitespace-nowrap px-6 py-4">DOLIPRANE 1000 mg Cpr Plq/100</td>
            <td className="whitespace-nowrap px-6 py-4">Sanofi</td>
            <td className="whitespace-nowrap px-6 py-4">2</td>
            <td className="whitespace-nowrap px-6 py-4">200</td>
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
                <td scope="col" className="px-6 py-4">Quantité</td>
                <td scope="col" className="px-6 py-4">Péremptions</td>
                <td scope="col" className="px-6 py-4">États</td>
                <td scope="col" className="px-6 py-4">Lots</td>
                <td scope="col" className="px-6 py-4">Prix</td>
                <td scope="col" className="px-6 py-4">Panier</td>
            </tr>
            <DetailsLine/>
            <DetailsLine/>
        </>
            }
    </>
}


function DetailsLine() {

    return <tr className="bg-contrast">
        <td className="whitespace-nowrap px-6 py-4">100</td>
        <td className="whitespace-nowrap px-6 py-4">17/12/2026</td>
        <td className="whitespace-nowrap px-6 py-4">Neuf</td>
        <td className="whitespace-nowrap px-6 py-4">20</td>
        <td className="whitespace-nowrap px-6 py-4">100 €</td>
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
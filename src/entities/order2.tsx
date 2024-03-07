import { Outline } from "@/libs/icons/icons";
import { Button } from "@/libs/ui/button";
import { Input } from "@/libs/ui/input";

export function Order2({dataset} : ProductsDataProps) {
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
                    colorIndex={9}>
                En cours de Livraison
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
                            <th scope="col" className="px-6 py-4">Péremptions</th>
                            <th scope="col" className="px-6 py-4">États</th>
                            <th scope="col" className="px-6 py-4">Quantité</th>
                            <th scope="col" className="px-6 py-4">Prix</th>
                        </tr>
                    </thead>
                    <tbody className="">
                        <OrdersLine dataset={dataset}/>
                    </tbody>
                </table>
                </div>
            </div>
            </div>
            <Recap dataset={dataset}/>
        </div>
    </>
  }

function OrdersLine({dataset} : ProductsDataProps) {

    return <>
    {
        dataset.map((item, index) =>
        <OrderLine
              key={index}
              data={item} />)
    }
    </>
}

function OrderLine({ data }: OrderLineProps) {


    return <tr className="border-b">
            <td className="whitespace-nowrap px-6 py-4 font-medium">{data.Ean}</td>
            <td className="whitespace-nowrap px-6 py-4">{data.Name}</td>
            <td className="whitespace-nowrap px-6 py-4">{data.Marques}</td>
            <td className="whitespace-nowrap px-6 py-4">{data.Offers[0].Expiration}</td>
            <td className="whitespace-nowrap px-6 py-4">{data.Offers[0].States}</td>
            <td className="whitespace-nowrap px-6 py-4">{data.Offers[0].Stock}</td>
            <td className="whitespace-nowrap px-6 py-4">{data.Offers[0].Price}</td>
        </tr>
}


function Recap({ dataset } : ProductsDataProps) {

    const totalStock = dataset.reduce((stock, product) => {
        if (product.Offers && product.Offers.length > 0) {
            const firstOffers = product.Offers.slice(0, 1);
            const stockSum = firstOffers.reduce((offerStock, offer) => {
            return offerStock + offer.Stock;
          }, 0);
          stock += stockSum;
        }
        return stock;
      }, 0);

    const totalPrice = dataset.reduce((acc, product) => {
        if (product.Offers && product.Offers.length > 0) {
            const firstOffers = product.Offers.slice(0, 1);
            const priceSum = firstOffers.reduce((offerAcc, offer) => {
            const price = parseFloat(offer.Price.replace('€', '').trim());
            return offerAcc + price;
            }, 0);
            acc += priceSum;
        }
        return acc;
    }, 0);

    return <div className="px-4 flex flex-row-reverse items-center gap-4 text-sm">
    <Button.Gradient className="rounded-[15px] m-[5px] border-0 po-md hovered-or-clicked-or-focused:scale-105 !transition"
            colorIndex={9}>
        Prix TTC - <span>{totalPrice * 1.2}</span> €
    </Button.Gradient>  
    <Button.Gradient className="rounded-[15px] m-[5px] border-0 po-md hovered-or-clicked-or-focused:scale-105 !transition"
            colorIndex={9}>
        Prix HT - <span>{totalPrice}</span> €
    </Button.Gradient>
    <Button.Gradient className="rounded-[15px] m-[5px] border-0 po-md hovered-or-clicked-or-focused:scale-105 !transition"
            colorIndex={9}>
        Quantité Total - <span>{totalStock}</span>
    </Button.Gradient> 
    <Button.Gradient className="rounded-[15px] m-[5px] border-0 po-md hovered-or-clicked-or-focused:scale-105 !transition"
            colorIndex={9}>
        Date de livraison - 02/02/2024
    </Button.Gradient> 
    <Button.Gradient className="rounded-[15px] m-[5px] border-0 po-md hovered-or-clicked-or-focused:scale-105 !transition"
            colorIndex={9}>
        Date de création - 02/01/2024
    </Button.Gradient> 
</div>
}

interface ProductsDataProps {
    dataset : ProductsData
}

interface OrderLineProps {
    key : any;
    data: ProductData
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
import { useColor } from "@/libs/context/color";
import { useRoute } from "@/libs/context/router";
import { Outline } from "@/libs/icons/icons";
import { ExternalDivisionLink } from "@/libs/next/anchor";
import { Button } from "@/libs/ui/button";

export default function Home() {

    const color = useColor()

    const url = useRoute()
    return <div className="flex flex-col flex-center gap-8 p-8">
        <h1 className={`text-center text-4xl ${color.current?.text} font-bold`}>Dashboard</h1>
        <div className="max-h-[70vh] p-4 flex flex-col flex-center gap-8 rounded-xl border-4 overflow-y-scroll">
            <div className="flex justify-between gap-8 text-sm">
                <div onClick={() => url.set("wait")} className={`flex flex-col flex-center gap-2 cursor-pointer flex flex-col gap-4 text-center p-4 w-full rounded-xl text-opposite border ${color.current?.border} bg-gradient-to-r ${color.current?.gradient}`}>
                    <span>
                        Commande en preparation
                    </span>
                    <span className="text-xl font-bold">1</span>
                </div>
                <div onClick={() => url.set("travel")} className={`flex flex-col flex-center gap-2 cursor-pointer flex flex-col gap-4 text-center p-4 w-full rounded-xl text-opposite border ${color.current?.border} bg-gradient-to-r ${color.current?.gradient}`}>
                    <span>
                        Commande en attentes
                    </span>
                    <span className="text-xl font-bold">2</span>
                </div>
                <div onClick={() => url.set("close")} className={`flex flex-col flex-center gap-2 cursor-pointer flex flex-col gap-4 text-center p-4 w-full rounded-xl text-opposite border ${color.current?.border} bg-gradient-to-r ${color.current?.gradient}`}>
                    <span>
                        Commande clôturée
                    </span>
                    <span className="text-xl font-bold">1</span>
                </div>
                <div onClick={() => url.set("order")} className={`flex flex-col flex-center gap-2 cursor-pointer flex flex-col gap-4 text-center p-4 w-full rounded-xl text-opposite border ${color.current?.border} bg-gradient-to-r ${color.current?.gradient}`}>
                    <span>
                        Commande totales
                    </span>
                    <span className="text-xl font-bold">4</span>
                </div>
            </div>
            <div className="flex justify-between gap-8 text-sm">
                <div onClick={() => url.set("suivie")} className={`flex flex-col flex-center gap-2 cursor-pointer flex flex-col gap-4 text-center p-4 w-full rounded-xl text-opposite border ${color.current?.border} bg-gradient-to-r ${color.current?.gradient}`}>
                    <span>
                        Demande en attente réponse
                    </span>
                    <span className="text-xl font-bold">3</span>
                </div>
                <div onClick={() => url.set("suivie")} className={`flex flex-col flex-center gap-2 cursor-pointer flex flex-col gap-4 text-center p-4 w-full rounded-xl text-opposite border ${color.current?.border} bg-gradient-to-r ${color.current?.gradient}`}>
                    <span>
                        Demande en attente grossiste
                    </span>
                    <span className="text-xl font-bold">2</span>
                </div>
                <div onClick={() => url.set("suivie")} className={`flex flex-col flex-center gap-2 cursor-pointer flex flex-col gap-4 text-center p-4 w-full rounded-xl text-opposite border ${color.current?.border} bg-gradient-to-r ${color.current?.gradient}`}>
                    <span>
                        Demande en cours
                    </span>
                    <span className="text-xl font-bold">5</span>
                </div>
            </div>
            <div className="flex justify-between gap-8 text-sm">
                <div onClick={() => url.set("all_products")} className={`flex flex-col flex-center gap-2 cursor-pointer flex flex-col gap-4 text-center p-4 w-full rounded-xl text-opposite border ${color.current?.border} bg-gradient-to-r ${color.current?.gradient}`}>
                        <span>
                            Produits disponibles
                        </span>
                        <span className="text-xl font-bold">325</span>
                    </div>
                    <div onClick={() => url.set("offer_products")} className={`flex flex-col flex-center gap-2 cursor-pointer flex flex-col gap-4 text-center p-4 w-full rounded-xl text-opposite border ${color.current?.border} bg-gradient-to-r ${color.current?.gradient}`}>
                        <span>
                            Offres disponibles
                        </span>
                        <span className="text-xl font-bold">122</span>
                    </div>
            </div>
            <div className="flex justify-between gap-8 text-sm">
                <div onClick={() => url.set("order")} className={`flex flex-col flex-center gap-2 cursor-pointer flex flex-col gap-4 text-center p-4 w-full rounded-xl text-opposite border ${color.current?.border} bg-gradient-to-r ${color.current?.gradient}`}>
                        <span>
                            Montant achat HT
                        </span>
                        <span className="text-xl font-bold">6345 €</span>
                    </div>
                    <div onClick={() => url.set("order")} className={`flex flex-col flex-center gap-2 cursor-pointer flex flex-col gap-4 text-center p-4 w-full rounded-xl text-opposite border ${color.current?.border} bg-gradient-to-r ${color.current?.gradient}`}>
                        <span>
                            Montant achat TTC
                        </span>
                        <span className="text-xl font-bold">6923 €</span>
                    </div>
                    <div onClick={() => url.set("order")} className={`flex flex-col flex-center gap-2 cursor-pointer flex flex-col gap-4 text-center p-4 w-full rounded-xl text-opposite border ${color.current?.border} bg-gradient-to-r ${color.current?.gradient}`}>
                        <span>
                            Volumes achat
                        </span>
                        <span className="text-xl font-bold">1231 boites</span>
                    </div>
            </div>
        <ExternalDivisionLink className="w-full" href="https://app.powerbi.com/links/T5YCH65gd6?ctid=41672c37-dd29-4bb8-9261-c2ce03b4a11a&pbi_source=linkShare">
            <Button.Gradient className="w-full flex items-center justify-center gap-4 rounded-lg border-0 po-md hovered-or-clicked-or-focused:scale-105 !transition"
                    colorIndex={color.current?.color!}>
                <div className="font-bold">
                    Voir les statistiques détaillées
                </div>
                <Outline.ArrowTopRightOnSquareIcon className="size-5" />
            </Button.Gradient> 
        </ExternalDivisionLink>
        </div>
        <Test/>
    </div>
}


export function Test() {

    const color = useColor()

    return <div className="">
        <button className="p-4 bg-contrast border-2" onClick={() => color.set(0)}>0</button>
        <button className="p-4 bg-contrast border-2" onClick={() => color.set(1)}>1</button>
        <button className="p-4 bg-contrast border-2" onClick={() => color.set(2)}>2</button>
        <button className="p-4 bg-contrast border-2" onClick={() => color.set(3)}>3</button>
        <button className="p-4 bg-contrast border-2" onClick={() => color.set(4)}>4</button>
        <button className="p-4 bg-contrast border-2" onClick={() => color.set(5)}>5</button>
        <button className="p-4 bg-contrast border-2" onClick={() => color.set(6)}>6</button>
        <button className="p-4 bg-contrast border-2" onClick={() => color.set(7)}>7</button>
        <button className="p-4 bg-contrast border-2" onClick={() => color.set(8)}>8</button>
        <button className="p-4 bg-contrast border-2" onClick={() => color.set(9)}>9</button>
        <button className="p-4 bg-contrast border-2" onClick={() => color.set(10)}>10</button>
        <button className="p-4 bg-contrast border-2" onClick={() => color.set(11)}>11</button>
        <button className="p-4 bg-contrast border-2" onClick={() => color.set(12)}>12</button>
        <button className="p-4 bg-contrast border-2" onClick={() => color.set(13)}>13</button>
        <button className="p-4 bg-contrast border-2" onClick={() => color.set(14)}>14</button>
        <button className="p-4 bg-contrast border-2" onClick={() => color.set(15)}>15</button>
        <button className="p-4 bg-contrast border-2" onClick={() => color.set(16)}>16</button>
    </div>
}
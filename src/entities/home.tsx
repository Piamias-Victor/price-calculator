import { useRoute } from "@/libs/context/router";
import { Outline } from "@/libs/icons/icons";
import { Button } from "@/libs/ui/button";

export default function Home() {

    const url = useRoute()
    return <div className="flex flex-col flex-center gap-8 p-8">
        <h1 className="text-center text-4xl text-sky-500 font-bold">Dashboard</h1>
        <div className="p-4 flex flex-col flex-center gap-8 rounded-xl border-4">
            <div className="flex justify-between gap-8 text-sm">
                <div onClick={() => url.set("wait")} className="flex flex-col flex-center gap-2 cursor-pointer flex flex-col gap-4 text-center p-4 w-full rounded-xl text-opposite border border-sky-400 bg-gradient-to-r from-sky-400 to-blue-400">
                    <span>
                        commande en preparation
                    </span>
                    <span className="text-xl font-bold">1</span>
                </div>
                <div onClick={() => url.set("travel")} className="flex flex-col flex-center gap-2 cursor-pointer flex flex-col gap-4 text-center p-4 w-full rounded-xl text-opposite border border-sky-400 bg-gradient-to-r from-sky-400 to-blue-400">
                    <span>
                        commandes en attentes
                    </span>
                    <span className="text-xl font-bold">2</span>
                </div>
                <div onClick={() => url.set("close")} className="flex flex-col flex-center gap-2 cursor-pointer flex flex-col gap-4 text-center p-4 w-full rounded-xl text-opposite border border-sky-400 bg-gradient-to-r from-sky-400 to-blue-400">
                    <span>
                        commande clôturée
                    </span>
                    <span className="text-xl font-bold">1</span>
                </div>
                <div onClick={() => url.set("order")} className="flex flex-col flex-center gap-2 cursor-pointer flex flex-col gap-4 text-center p-4 w-full rounded-xl text-opposite border border-sky-400 bg-gradient-to-r from-sky-400 to-blue-400">
                    <span>
                        commandes totales
                    </span>
                    <span className="text-xl font-bold">4</span>
                </div>
            </div>
            <div className="flex justify-between gap-8 text-sm">
                <div onClick={() => url.set("all_products")} className="flex flex-col flex-center gap-2 cursor-pointer flex flex-col gap-4 text-center p-4 w-full rounded-xl text-opposite border border-sky-400 bg-gradient-to-r from-sky-400 to-blue-400">
                        <span>
                            Produits disponibles
                        </span>
                        <span className="text-xl font-bold">325</span>
                    </div>
                    <div onClick={() => url.set("offer_products")} className="flex flex-col flex-center gap-2 cursor-pointer flex flex-col gap-4 text-center p-4 w-full rounded-xl text-opposite border border-sky-400 bg-gradient-to-r from-sky-400 to-blue-400">
                        <span>
                            Offres disponibles
                        </span>
                        <span className="text-xl font-bold">122</span>
                    </div>
            </div>
            <div className="flex justify-between gap-8 text-sm">
                <div onClick={() => url.set("order")} className="flex flex-col flex-center gap-2 cursor-pointer flex flex-col gap-4 text-center p-4 w-full rounded-xl text-opposite border border-sky-400 bg-gradient-to-r from-sky-400 to-blue-400">
                        <span>
                            Montant achat HT
                        </span>
                        <span className="text-xl font-bold">6345 €</span>
                    </div>
                    <div onClick={() => url.set("order")} className="flex flex-col flex-center gap-2 cursor-pointer flex flex-col gap-4 text-center p-4 w-full rounded-xl text-opposite border border-sky-400 bg-gradient-to-r from-sky-400 to-blue-400">
                        <span>
                            Montant achat TTC
                        </span>
                        <span className="text-xl font-bold">6923 €</span>
                    </div>
                    <div onClick={() => url.set("order")} className="flex flex-col flex-center gap-2 cursor-pointer flex flex-col gap-4 text-center p-4 w-full rounded-xl text-opposite border border-sky-400 bg-gradient-to-r from-sky-400 to-blue-400">
                        <span>
                            Volumes achat
                        </span>
                        <span className="text-xl font-bold">1231 boites</span>
                    </div>
            </div>
        <Button.Gradient className="flex items-center justify-center gap-4 rounded-lg border-0 po-md hovered-or-clicked-or-focused:scale-105 !transition"
                    colorIndex={9}>
                <div className="font-bold">
                    Voir les statistiques détaillées
                </div>
                <Outline.ArrowTopRightOnSquareIcon className="size-5" />
        </Button.Gradient> 
        </div>
    </div>
}
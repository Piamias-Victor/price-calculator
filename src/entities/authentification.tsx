import { useAccount } from "@/libs/context/account"
import { useColor } from "@/libs/context/color"
import { useRoute } from "@/libs/context/router"
import { Outline } from "@/libs/icons/icons"
import { useString } from "@/libs/react/string"
import { Button } from "@/libs/ui/button"
import { Input } from "@/libs/ui/input"

export default function Authentification() {

    const account = useAccount()
    const color = useColor()
    const id = useString('')
    const pwd = useString('')
    const url = useRoute()

    const handleIdChange = (event : any) => {
        id.set(event.target.value)
    };

    const handlePwdChange = (event : any) => {
        pwd.set(event.target.value)
    };

    const authentifiactor = () => {
        if (id.current === "pharmacie" && pwd.current === "1234") {
            account.set(2)
            color.set(9)
        }
        if (id.current === "depot" && pwd.current === "1234") {
            account.set(3)
            color.set(8)
        }
        if (id.current === "fournisseur" && pwd.current === "1234") {
            account.set(4)
            color.set(10)
        }
        url.set('home')
    }


    return <div className="flex items-center justify-center w-full h-full">
            <div className="flex flex-col items-center rounded-xl gap-8 p-8 border-2 shadow-md">
                <span className="text-2xl font bold">MEDICOR</span>
            <div className="flex flex-col gap-4 items-center">
                <div className="w-full flex items-center">
                <div className="bg-[#f2f2f2] rounded-[15px] flex items-center justify-center border-2">
                    <Input.Contrast onChange={handleIdChange} placeholder="Identifiant"/>
                    <Button.Gradient className="rounded-[10px] m-[5px] border-0 po-md hovered-or-clicked-or-focused:scale-105 !transition"
                        colorIndex={9}>
                        <div className={`h-full w-full group-enabled:group-active:scale-90 transition-transform`}>
                            <Outline.UserIcon className="size-5" />
                        </div>
                    </Button.Gradient>
                </div>            
            </div> 
            <div className="w-full flex items-center">
                <div className="bg-[#f2f2f2] rounded-[15px] flex items-center justify-center border-2">
                    <Input.Contrast onChange={handlePwdChange} type="password" placeholder="Mot de passe"/>
                    <Button.Gradient className="rounded-[10px] m-[5px] border-0 po-md hovered-or-clicked-or-focused:scale-105 !transition"
                        colorIndex={9}>
                        <div className={`h-full w-full group-enabled:group-active:scale-90 transition-transform`}>
                            <Outline.EyeIcon className="size-5" />
                        </div>
                    </Button.Gradient>
                </div>            
            </div> 
            <Button.Gradient onClick={authentifiactor} className="w-full flex items-center justify-center gap-4 rounded-lg border-0 po-md hovered-or-clicked-or-focused:scale-105 !transition"
                    colorIndex={9}>
                <div>
                    Accédez a la plateforme
                </div>
            </Button.Gradient> 
            </div>
            </div> 
    </div>
}
import { useColor } from "@/libs/context/color"

export default function Footer() {

    const color = useColor()  

    return <div className={`po-md w-full flex flex-row items-center justify-between text-opposite bg-gradient-to-r ${color.current?.gradient}`}>
        <span className="w-full text-center">
            Dev By Phardev
        </span>
    </div>
  }
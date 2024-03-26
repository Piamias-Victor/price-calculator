import { useColor } from "@/libs/context/color"
import { Button } from "@/libs/ui/button"

export default function Setting() {
    return <Test/>
}

export function Test() {

    const color = useColor()

    return <div className="flex items-center justify-center gap-4">
        <Button.Gradient className="w-[40px] flex items-center justify-center gap-4 rounded-lg border-0 po-md " colorIndex={0} onClick={() => color.set(0)}>0</Button.Gradient>
        <Button.Gradient className="w-[40px] flex items-center justify-center gap-4 rounded-lg border-0 po-md " colorIndex={1} onClick={() => color.set(1)}>1</Button.Gradient>
        <Button.Gradient className="w-[40px] flex items-center justify-center gap-4 rounded-lg border-0 po-md " colorIndex={2} onClick={() => color.set(2)}>2</Button.Gradient>
        <Button.Gradient className="w-[40px] flex items-center justify-center gap-4 rounded-lg border-0 po-md " colorIndex={3} onClick={() => color.set(3)}>3</Button.Gradient>
        <Button.Gradient className="w-[40px]nflex items-center justify-center gap-4 rounded-lg border-0 po-md " colorIndex={4} onClick={() => color.set(4)}>4</Button.Gradient>
        <Button.Gradient className="w-[40px] flex items-center justify-center gap-4 rounded-lg border-0 po-md " colorIndex={5} onClick={() => color.set(5)}>5</Button.Gradient>
        <Button.Gradient className="w-[40px] flex items-center justify-center gap-4 rounded-lg border-0 po-md " colorIndex={6} onClick={() => color.set(6)}>6</Button.Gradient>
        <Button.Gradient className="w-[40px] flex items-center justify-center gap-4 rounded-lg border-0 po-md " colorIndex={7} onClick={() => color.set(7)}>7</Button.Gradient>
        <Button.Gradient className="w-[40px] flex items-center justify-center gap-4 rounded-lg border-0 po-md " colorIndex={8} onClick={() => color.set(8)}>8</Button.Gradient>
        <Button.Gradient className="w-[40px] flex items-center justify-center gap-4 rounded-lg border-0 po-md " colorIndex={9} onClick={() => color.set(9)}>9</Button.Gradient>
        <Button.Gradient className="w-[40px] flex items-center justify-center gap-4 rounded-lg border-0 po-md " colorIndex={10} onClick={() => color.set(10)}>10</Button.Gradient>
        <Button.Gradient className="w-[40px] flex items-center justify-center gap-4 rounded-lg border-0 po-md " colorIndex={11} onClick={() => color.set(11)}>11</Button.Gradient>
        <Button.Gradient className="w-[40px] flex items-center justify-center gap-4 rounded-lg border-0 po-md " colorIndex={12} onClick={() => color.set(12)}>12</Button.Gradient>
        <Button.Gradient className="w-[40px] flex items-center justify-center gap-4 rounded-lg border-0 po-md " colorIndex={13} onClick={() => color.set(13)}>13</Button.Gradient>
        <Button.Gradient className="w-[40px] flex items-center justify-center gap-4 rounded-lg border-0 po-md " colorIndex={14} onClick={() => color.set(14)}>14</Button.Gradient>
        <Button.Gradient className="w-[40px] flex items-center justify-center gap-4 rounded-lg border-0 po-md " colorIndex={15} onClick={() => color.set(15)}>15</Button.Gradient>
    </div>
}
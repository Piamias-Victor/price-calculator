
import { ChildrenProps } from "@/libs/react/props/children"

export default function Layout(props: ChildrenProps) {

    const {children} = props

    return <main className="po-md w-full flex flex-col items-center justify-center h-full">
        {children}
    </main>
}
import { useRoute } from "@/libs/context/router"
import { Products } from "./products"

export default function Route() {

    const url = useRoute()
  
    if (url.current === "home")
      return <Home/>
    if (url.current === "stock")
      return <Stock/>
    if (url.current === "create")
      return <>Créer une commande</>
    if (url.current === "order")
      return <>Mes commandes</>
    if (url.current === "setting")
      return <>Options</>
    if (url.current === "products")
      return <Products/>
  }

  function Stock() {
    return <>
      Stocks Disponibles1
    </>
  }

  function Home () {
    return <>
      Home1
    </>
  }
  
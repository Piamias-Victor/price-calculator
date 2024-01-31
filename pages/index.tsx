import Footer from "@/entities/footer"
import Header from "@/entities/header"
import { Nav } from "@/entities/nav"
import { RouteHandle, useRoute } from "@/libs/context/router"

export default function Index() {
  
  const url = useRoute()

  return <main id="main" className="p-safe grow w-full flex flex-col overflow-hidden">
        <div className="grow w-full flex flex-col overflow-y-scroll">
          <Header/>
          <div className="grow w-full m-auto flex">
            <div className="h-full w-1/4 m-auto flex flex-col bg-contrast">
              <Nav/>
            </div>
            <div className="grow w-full h-full m-auto flex flex-col">
              <Router/>
            </div>
          </div>
          <Footer/>
        </div>
  </main>
}


function Router() {

  const url = useRoute()

  if (url.current === "home")
    return <>Home</>
  if (url.current === "stock")
    return <>Stocks Disponibles</>
  if (url.current === "create")
    return <>Créer une commande</>
  if (url.current === "order")
    return <>Mes commandes</>
  if (url.current === "setting")
    return <>Options</>
}

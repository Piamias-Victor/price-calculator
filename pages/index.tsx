import Authentification from "@/entities/authentification"
import Footer from "@/entities/footer"
import Header from "@/entities/header"
import { Nav } from "@/entities/nav"
import Route from "@/entities/route"
import { useAccount } from "@/libs/context/account"

export default function Index() {

  const account = useAccount()

  if (account.current === 1) return <Authentification/>
  
  return <main id="main" className="p-safe grow w-full flex flex-col">
        <div className="grow w-full flex flex-col">
          <Header/>
          <div className="grow w-full m-auto flex">
            <div className="h-full w-1/4 m-auto flex flex-col bg-contrast">
              <Nav/>
            </div>
            <div className="grow w-full h-full m-auto flex flex-col px-2 py-5">
              <Route/>
            </div>
          </div>
          <Footer/>
        </div>
  </main>
}

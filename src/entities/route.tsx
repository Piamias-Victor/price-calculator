import { useRoute } from "@/libs/context/router"
import { Products, ProductsData } from "./products"

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
    if (url.current === "all_products")
      return <Products dataset={dataset1}/>
    if (url.current === "offer_products")
      return <Products dataset={dataset2}/>
    if (url.current === "best_products")
      return <Products dataset={dataset3}/>
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
  

  export const dataset1 : ProductsData = [{
    Ean: '3400956369553',
    Name : 'DOLIPRANE 1000 mg Cpr Plq/100',
    Marques : 'Sanofi',
    Deal : 2,
    Stock : 150,
    Offers : [
        {
            Stock : 100,
            Expiration : '17/12/2026',
            States : 'Neuf',
            Lots : 20,
            Price : '100 €'
        },
        {
            Stock : 50,
            Expiration : '08/07/2025',
            States : 'Ouvert',
            Lots : 1,
            Price : '40 €'
        }
    ]
},
{
    Ean: '3282779416139',
    Name : 'CICALFATE CREME MAIN 100 ML',
    Marques : 'Avene',
    Deal : 3,
    Stock : 70,
    Offers : [
        {
            Stock : 10,
            Expiration : '12/06/2026',
            States : 'Neuf',
            Lots : 10,
            Price : '20 €'
        },
        {
            Stock : 40,
            Expiration : '08/07/2024',
            States : 'Neuf',
            Lots : 20,
            Price : '55 €'
        },
        {
            Stock : 20,
            Expiration : '08/07/2028',
            States : 'Ouvert',
            Lots : 1,
            Price : '40 €'
        }
    ]
}]

export const dataset2 : ProductsData = [{
  Ean: '3400956369553',
  Name : 'DOLIPRANE 1000 mg Cpr Plq/100',
  Marques : 'Sanofi',
  Deal : 2,
  Stock : 150,
  Offers : [
      {
          Stock : 100,
          Expiration : '17/12/2026',
          States : 'Neuf',
          Lots : 20,
          Price : '100 €'
      },
      {
          Stock : 50,
          Expiration : '08/07/2025',
          States : 'Ouvert',
          Lots : 1,
          Price : '40 €'
      }
  ]
}]

export const dataset3 : ProductsData = [{
  Ean: '3661434005008',
  Name : 'URIAGE CREME D EAU 40 ML',
  Marques : 'Uriage',
  Deal : 4,
  Stock : 200,
  Offers : [
      {
          Stock : 25,
          Expiration : '10/01/2026',
          States : 'Neuf',
          Lots : 5,
          Price : '50 €'
      },
      {
          Stock : 75,
          Expiration : '08/07/2025',
          States : 'Ouvert',
          Lots : 1,
          Price : '120 €'
      },
      {
        Stock : 50,
        Expiration : '08/03/2027',
        States : 'Neuf',
        Lots : 25,
        Price : '100 €'
    },
    {
      Stock : 50,
      Expiration : '08/08/2026',
      States : 'Ouvert',
      Lots : 1,
      Price : '75 €'
  }
  ]
}]
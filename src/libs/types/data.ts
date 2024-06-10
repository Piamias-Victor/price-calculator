export type Row = [
    ean: string,
    cip: string,
    name: string,
    minCmd: number,
    packing: number,
    listPrice: number,
    htPrice: number,
    discount1: number,
    discount2: number,
    discount3: number,
    discount: number,
    netPrice: number,
    coeff: number,
    margin: number,
    eurosMargin: number,
    topMargin: number,
    vat: number,
    sellingPrice: number,
    purchasePrice: number,
    label: number,
    rotation: number,
    stock: number
  ]

export type Data = string | number
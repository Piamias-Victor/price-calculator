import { _LISTPRICE, _HTPRICE, _DISCOUNT, _NETPRICE, _MARGIN, _SELLINGPRICE, _VAT } from "../alias/data"
import { Row } from "../types/data"

export function calculateRow(cellIndex: number, row: Row): Row {
    if(cellIndex === _HTPRICE) return changeHtPrice(row)
    if(cellIndex === _DISCOUNT) return changeDiscount(row)
    if(cellIndex === _NETPRICE) return changeNetPrice(row)
    if(cellIndex === _MARGIN) return changeMargin(row)
    if(cellIndex === _SELLINGPRICE) return changeSellingPrice(row)
    return row
}

export function changeHtPrice(row: Row) {
    row[_NETPRICE] = row[_HTPRICE] - (row[_HTPRICE] * row[_DISCOUNT] / 100)
    return calculateRow(_NETPRICE, row)
}

export function changeMargin(row: Row) {
    row[_SELLINGPRICE] = row[_NETPRICE] / (1 - (row[_MARGIN] / 100)) * (1 + row[_VAT] / 100)
    return row
}

export function changeDiscount(row: Row) {
    row[_NETPRICE] = row[_HTPRICE] - (row[_HTPRICE] * row[_DISCOUNT] / 100)
    return calculateRow(_NETPRICE, row)
}

export function changeNetPrice(row: Row) {
    row[_DISCOUNT] = ((row[_HTPRICE] - row[_NETPRICE]) / row[_HTPRICE]) * 100
    row[_MARGIN] = (((row[_SELLINGPRICE] / (1 + row[_VAT] / 100))  - row[_NETPRICE]) / (row[_SELLINGPRICE] / (1 + row[_VAT] / 100)) * 100)
    return row
}

export function changeSellingPrice(row: Row) {
    row[_MARGIN] = (((row[_SELLINGPRICE] / (1 + row[_VAT] / 100))  - row[_NETPRICE]) / (row[_SELLINGPRICE] / (1 + row[_VAT] / 100)) * 100)
    return row
}
import { _COEFF, _DISCOUNT, _DISPLAYABLEVALUE, _EDITABLEVALUE, _HTPRICE, _LISTPRICE, _MARGIN, _NETPRICE, _PURCHASEPRICE, _ROTATION, _SELLINGPRICE } from "@/libs/alias/data";
import { calculateRow } from "@/libs/calcul/calcul";
import ReadFile from "@/libs/files/readFiles";
import { Data } from "@/libs/types/data";
import { Row } from "@/libs/types/data";
import { Button } from "@/libs/ui/button";
import { Input } from "@/libs/ui/input";
import { useState, useRef } from "react";
import { deepCopy } from "@/libs/copy/deepCopy";

export default function Price() {

    const [csvData, setCsvData] = useState<Row[] | null>(null);
    const [csvDataCopy, setcsvDataCopy] = useState<Row[] | null>(null);
    const [evolutionSalesPrice, setEvolutionSalesPrice] = useState(0)
    const [evolutionPurchasePrice, setEvolutionPurchasePrice] = useState(0)
    const [evolutionRotation, setEvolutionRotation] = useState(0)


    const inputRef = useRef<HTMLInputElement | null>(null)

    const HandleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const data = await ReadFile(event);
        setCsvData(data);
        setcsvDataCopy(deepCopy(data) as Row[])
    }

    const triggerFileInput = () => {
        if (inputRef.current) {
            inputRef.current.click()
        }
    }

    const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>, rowIndex: number, cellIndex: number) => {
        changeValue(parseFloat(event.target.value), rowIndex, cellIndex)
    }

    const handleSalesPriceEvolutionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEvolutionSalesPrice(parseFloat(event.target.value))
        const newData = deepCopy(csvData as Row[])
        let i = 1
        if(newData) {
            while(newData[i]) {
                newData[i][_SELLINGPRICE] = csvDataCopy[i][_SELLINGPRICE] * (1 + (event.target.value / 100))
                newData[i] = calculateRow(_SELLINGPRICE, newData[i] as Row)
                i++
            }
        }
        setCsvData(newData as Row[])
    }

    const handlePurchasePriceEvolutionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEvolutionPurchasePrice(parseFloat(event.target.value))
        const newData = deepCopy(csvData as Row[])
        let i = 1
        if(newData) {
            while(newData[i]) {
                newData[i][_NETPRICE] = csvDataCopy[i][_NETPRICE] * (1 + (event.target.value / 100))
                newData[i] = calculateRow(_NETPRICE, newData[i] as Row)
                i++
            }
        }
        setCsvData(newData as Row[])
    }

    const handleRotationEvolutionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEvolutionRotation(parseFloat(event.target.value))
        const newData = deepCopy(csvData as Row[])
        let i = 1
        if(newData) {
            while(newData[i]) {
                newData[i][_ROTATION] = csvDataCopy[i][_ROTATION] * (1 + (event.target.value / 100))
                newData[i] = calculateRow(_ROTATION, newData[i] as Row)
                i++
            }
        }
        setCsvData(newData as Row[])
    }

    const changeValue = (value : number, rowIndex: number, cellIndex: number) => {
        if (csvData) {
            if(typeof csvData[rowIndex][cellIndex] === 'number') {
                const newData = [...csvData]
                const newRow = [...newData[rowIndex]]
                newRow[cellIndex] = value
                newData[rowIndex] = calculateRow(cellIndex, newRow as Row)
                setCsvData(newData)
            }
        }
    }

    const roundPrice = (option: boolean) => {
        const newData = deepCopy(csvData as Row[])
        let i = 1
        if(newData) {
            while(newData[i]) {
                if (option && checkDecimal(newData[i][_SELLINGPRICE], 0.50)) {
                    newData[i][_SELLINGPRICE] = Math.floor(newData[i][_SELLINGPRICE]) + 0.49
                }
                else {
                    newData[i][_SELLINGPRICE] = Math.floor(newData[i][_SELLINGPRICE]) + 0.99
                }
                newData[i] = calculateRow(_SELLINGPRICE, newData[i] as Row)
                i++
            }
        }
        setCsvData(newData as Row[])
    }

    const checkDecimal = (value: number, min: number) => {
        const integerPart = Math.floor(value)
        const decimalPart = value - integerPart
        return decimalPart < min
    }

    const calculateCa = (data : Row[] | null) => {
        let res = 0
        let i = 1
        if(data) {
            while(data[i]) {
                res += (data[i][_SELLINGPRICE] * data[i][_ROTATION]) * 12
                i++
            }
        }
        return res
    }

    const calculateMarge = (data : Row[] | null) => {
        let res = 0
        let i = 1
        if(data) {
            while(data[i]) {
                res += ((data[i][_SELLINGPRICE] - data[i][_NETPRICE]) * data[i][_ROTATION]) * 12
                i++
            }
        }
        return res
    }

    const calculateSell = (data : Row[] | null) => {
        let res = 0
        let i = 1
        if(data) {
            while(data[i]) {
                res += (data[i][_ROTATION]) * 12
                i++
            }
        }
        return res
    }

    const renderData = (data: Data, rowIndex: number, cellIndex: number) => {
        if (typeof data === 'number' && _EDITABLEVALUE.includes(cellIndex)) return <input className="max-w-[3vw]" value={parseFloat(data.toFixed(2)).toString()} type="number" onChange={(event) => handleChangeValue(event, rowIndex, cellIndex)}/>
        if (_DISPLAYABLEVALUE.includes(cellIndex)) return <span className="max-w-[3vw]">{data}</span>
    }
    
return <>
    <input ref={inputRef} className="hidden" placeholder="Selectionez votre fichier" type="file" onChange={HandleFileChange} accept=".tsv" />
    <Button.Gradient className="po-md"
        colorIndex={9}
        onClick={triggerFileInput}>
            Deposez votre fichier
    </Button.Gradient>
    <div className="h-8"/>
    <div className="flex items-center gap-20 justify-center">
        <div className="flex flex-col gap-4">
            <div className="flex items-end gap-2">
            <label className="block mb-2 text-lg font-bold">Evolution prix de vente % :</label>
            <Input.Contrast className="rounded-lg" min={-100} max={100} step="1" onChange={handleSalesPriceEvolutionChange} value={evolutionSalesPrice} type="number"/>
            </div>
            <input min={-100} max={100} step="1" onChange={handleSalesPriceEvolutionChange} value={evolutionSalesPrice} id="default-range" type="range" className="border border-1 border-gray-400 w-full h-2 bg-contrast rounded-lg appearance-none cursor-pointer"/>
        </div>
        <div className="flex flex-col gap-4">
            <div className="flex items-end gap-2">
            <label className="block mb-2 text-lg font-bold">Evolution prix achat % :</label>
            <Input.Contrast className="rounded-lg" min={-100} max={100} step="1" onChange={handlePurchasePriceEvolutionChange} value={evolutionPurchasePrice} type="number"/>
            </div>
            <input min={-100} max={100} step="1" onChange={handlePurchasePriceEvolutionChange} value={evolutionPurchasePrice} id="default-range" type="range" className="border border-1 border-gray-400 w-full h-2 bg-contrast rounded-lg appearance-none cursor-pointer"/>
        </div>
        <div className="flex flex-col gap-4">
            <div className="flex items-end gap-2">
            <label className="block mb-2 text-lg font-bold">Evolution rotation % :</label>
            <Input.Contrast className="rounded-lg" min={-100} max={100} step="1" onChange={handleRotationEvolutionChange} value={evolutionRotation} type="number"/>
            </div>
            <input min={-100} max={100} step="1" onChange={handleRotationEvolutionChange} value={evolutionRotation} id="default-range" type="range" className="border border-1 border-gray-400 w-full h-2 bg-contrast rounded-lg appearance-none cursor-pointer"/>
        </div>
    </div>
    <div className="h-8"/>
    {
        csvData &&
        <div className="w-full overflow-y-auto h-[50vh]">
            <table className="w-full text-xs">
                    <tbody>
                        {
                            csvData.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    {
                                        row.map((cell : Data, cellIndex: number) => (
                                            <td key={`${rowIndex}-${cellIndex}`}>{renderData(cell, rowIndex, cellIndex)}</td>
                                        ))
                                    }
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
        </div>
            
    }
    <div className="h-4"/>
    <div className="flex items-center gap-4">
        <Button.Gradient className="po-md"
            colorIndex={9}
            onClick={() => roundPrice(false)}>
                Arrondir Prix de vente 0.99
        </Button.Gradient>
        <Button.Gradient className="po-md"
            colorIndex={9}
            onClick={() => roundPrice(true)}>
                Arrondir Prix de vente 0.49
        </Button.Gradient>
    </div>
    <div className="h-4"/>
    <div className="flex items-center gap-20 justify-center">
        <Button.Gradient className="po-md rounded-md"
            colorIndex={9}>
                <div className="flex flex-col gap-2 items-start">
                    <div>
                        <span>CA avant Evolution : </span>
                        <span>{calculateCa(csvDataCopy).toFixed(2)}</span>
                    </div>
                    <div>
                        <span>CA apres Evolution : </span>
                        <span>{calculateCa(csvData).toFixed(2)}</span>
                    </div>
                </div> 
        </Button.Gradient>
        <Button.Gradient className="po-md rounded-md"
            colorIndex={9}>
                <div className="flex flex-col gap-2 items-start">
                    <div>
                        <span>Marge avant Evolution : </span>
                        <span>{calculateMarge(csvDataCopy).toFixed(2)}</span>
                    </div>
                    <div>
                        <span>Marge apres Evolution : </span>
                        <span>{calculateMarge(csvData).toFixed(2)}</span>
                    </div>
                </div> 
        </Button.Gradient>
        <Button.Gradient className="po-md rounded-md"
            colorIndex={9}>
                <div className="flex flex-col gap-2 items-start">
                    <div>
                        <span>Unite vendue avant Evolution : </span>
                        <span>{calculateSell(csvDataCopy).toFixed(0)}</span>
                    </div>
                    <div>
                        <span>Unite vendue apres Evolution : </span>
                        <span>{calculateSell(csvData).toFixed(0)}</span>
                    </div>
                </div> 
        </Button.Gradient>
    </div>
    
  </>
}
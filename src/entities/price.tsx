import { _COEFF, _DISCOUNT, _DISPLAYABLEVALUE, _EDITABLEVALUE, _HTPRICE, _LISTPRICE, _MARGIN, _NETPRICE, _PURCHASEPRICE, _ROTATION, _SELLINGPRICE } from "@/libs/alias/data";
import { calculateRow } from "@/libs/calcul/calcul";
import ReadFile from "@/libs/files/readFiles";
import { Data } from "@/libs/types/data";
import { Row } from "@/libs/types/data";
import { Button } from "@/libs/ui/button";
import { useState, useRef } from "react";

export default function Price() {

    const [csvData, setCsvData] = useState<Row[] | null>(null);

    const inputRef = useRef<HTMLInputElement | null>(null)

    const HandleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const data = await ReadFile(event);
        setCsvData(data);
    }

    const triggerFileInput = () => {
        if (inputRef.current) {
            inputRef.current.click()
        }
    }

    const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>, rowIndex: number, cellIndex: number) => {
        changeValue(parseFloat(event.target.value), rowIndex, cellIndex)
    }

    const changeValue = (value : number, rowIndex: number, cellIndex: number) => {
        if (csvData) {
            if(typeof csvData[rowIndex][cellIndex] === 'number') {
                const newData = [...csvData];
                const newRow = [...newData[rowIndex]];
                newRow[cellIndex] = value
                newData[rowIndex] = calculateRow(cellIndex, newRow as Row);
                setCsvData(newData);
            }
        }
    }

    const renderData = (data: Data, rowIndex: number, cellIndex: number) => {
        if (typeof data === 'number' && _EDITABLEVALUE.includes(cellIndex)) return <input className="max-w-[3vw]" value={parseFloat(data.toFixed(2)).toString()} type="number" onChange={(event) => handleChangeValue(event, rowIndex, cellIndex)}/>
        if (_DISPLAYABLEVALUE.includes(cellIndex)) return <span className="max-w-[3vw]">{data}</span>
    }

return <>
    <input ref={inputRef} className="hidden" placeholder="Selectionez votre fichier" type="file" onChange={HandleFileChange} accept=".tsv" />
    <Button.Gradient className="po-md mb-8"
        colorIndex={9}
        onClick={triggerFileInput}>
            Deposez votre fichier
    </Button.Gradient>
    {
        csvData &&
            <table className="w-full">
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
    }
  </>
}

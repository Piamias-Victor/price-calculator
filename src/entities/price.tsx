import ReadFile from "@/libs/files/readFiles";
import { Button } from "@/libs/ui/button";
import { useState, useRef, SetStateAction } from "react";

export default function Price() {

    const [csvData, setCsvData] = useState<any[] | null>(null);

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

    console.log(csvData)

return <>
    <input ref={inputRef} className="hidden" placeholder="Selectionez votre fichier" type="file" id="avatar" name="avatar" onChange={HandleFileChange} accept=".tsv" />
    <Button.Gradient className="po-md"
        colorIndex={9}
        onClick={triggerFileInput}>
            Deposez votre fichier
    </Button.Gradient>
  </>
}

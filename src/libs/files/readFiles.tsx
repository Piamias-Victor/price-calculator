import { Row } from "../types/data";

export default async function ReadFile(event: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0]

    if (selectedFile) {
        return new Promise<Row[]>((resolve, reject) => {
            const reader = new FileReader()
            reader.onload = () => {
                if (reader.result) {
                    const csvContent = reader.result as string;
                    const rows: any[] = csvContent.split('\r\n').map(row => {
                        const res = row.split('\t').map(cell => {
                            return isNaN(parseFloat(cell)) ? cell : parseFloat(cell)
                        });
                        return res
                    });
                    resolve(rows)
                } else {
                    reject(new Error("FileReader result is null"))
                }
            }
            reader.onerror = () => {
                reject(new Error("FileReader error"))
            }
            reader.readAsText(selectedFile)
        })
    } else {
        return []
    }
}
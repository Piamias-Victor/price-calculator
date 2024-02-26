import { useNumber } from "@/libs/react/number"
import { useCallback } from "react";
import { Calcul } from "../other/calcul";
import { Input } from "@/libs/ui/input";

export default function Calculator() {

    const coef = useNumber(400)
    const heure = useNumber(37)
    const old = useNumber(0)
    
    const tauxHorraire = useCallback(() => {
        return Calcul(coef, heure, old)
      }, [coef, heure, old]);

    const handleCoefChange = (event : any) => {
        coef.set(parseInt(event.target.value))
      };

    const handleHeureChange = (event : any) => {
        heure.set(parseInt(event.target.value))
      };
    
      const handleOldChange = (event : any) => {
        old.set(parseInt(event.target.value))
      };

      const CalculateNet = (value : number) => {
        return (value - (value * 0.22));
      }
  
    return <main id="main" className="p-20">
        <label className="block mb-2 text-lg font-bold text-gray-900">Coefficient :</label>
        <div>
          <Input.Contrast className="rounded-lg" min={100} max={800} step="10" onChange={handleCoefChange} value={coef.current} type="number"/>
        </div>
        <input min={100} max={800} step="10" onChange={handleCoefChange} value={coef.current} id="default-range" type="range" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"/>
        <div className="h-10"/>
        <label className="block mb-2 text-lg font-bold text-gray-900">Temps de travail par semaine (en heures) :</label>
        <div>
          <Input.Contrast className="rounded-lg" min={1} max={46} step="1" onChange={handleHeureChange} value={heure.current} type="number"/>
        </div>
        <input min={1} max={46} step="1" onChange={handleHeureChange} value={heure.current} id="default-range" type="range" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"/>
        <div className="h-10"/>
        <label className="block mb-2 text-lg font-bold text-gray-900">Ancienneté :</label>
        <div>
          <Input.Contrast className="rounded-lg" min={0} max={15} step="1" onChange={handleOldChange} value={old.current} type="number"/>
        </div>
        <input min={0} max={15} step="1" onChange={handleOldChange} value={old.current} id="default-range" type="range" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"/>
        <div className="h-10"/>
        <p className="block mb-2 text-2xl font-bold text-gray-900">Taux horaire brut</p><span className="block mb-2 text-2xl font-bold text-gray-900">{tauxHorraire().toFixed(2)}</span>
        <p className="block mb-2 text-2xl font-bold text-gray-900">Salaire mensuel brut</p><span className="block mb-2 text-2xl font-bold text-gray-900">{(tauxHorraire() * (heure.current * 4)).toFixed(2)}</span>
        <p className="block mb-2 text-2xl font-bold text-gray-900">Salaire mensuel net</p><span className="block mb-2 text-2xl font-bold text-gray-900">{CalculateNet((tauxHorraire() * (heure.current * 4))).toFixed(2)}</span>
    </main>
  }


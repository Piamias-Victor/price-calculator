import { useState, useRef, useCallback, useMemo, ChangeEvent } from "react";
import { 
  _COEFF, _DISCOUNT, _DISPLAYABLEVALUE, _EDITABLEVALUE, _HIGHERINGREEN, 
  _HIGHERINRED, _HTPRICE, _LISTPRICE, _MARGIN, _NETPRICE, _PURCHASEPRICE, 
  _ROTATION, _SELLINGPRICE, _VAT 
} from "@/libs/alias/data";
import { calculateRow } from "@/libs/calcul/calcul";
import ReadFile from "@/libs/files/readFiles";
import { Data, Row } from "@/libs/types/data";
import { deepCopy } from "@/libs/copy/deepCopy";
import { exportToCsv } from "./test";

// Importing Heroicons
import { 
  DocumentArrowUpIcon, 
  CheckIcon, 
  TrashIcon, 
  ArrowPathIcon, 
  ArrowDownTrayIcon,
  ChevronUpDownIcon
} from "@heroicons/react/24/outline";

const formatNumber = (value: number): string => {
    if (value >= 1_000_000) return (value / 1_000_000).toFixed(1) + "M";
    if (value >= 1_000) return (value / 1_000).toFixed(1) + "K";
    return value.toFixed(2);
};

export default function Price() {
    const [csvData, setCsvData] = useState<Row[] | null>(null);
    const [csvDataCopy, setCsvDataCopy] = useState<Row[] | null>(null);
    const [csvDataBase, setCsvDataBase] = useState<Row[] | null>(null);
    const [evolution, setEvolution] = useState({
        salesPrice: 0,
        purchasePrice: 0,
        rotation: 0
    });
    const [selectedIndex, setSelectedIndex] = useState<Set<number>>(new Set());

    const inputRef = useRef<HTMLInputElement | null>(null);

    // Memoize calculations to avoid unnecessary recalculations
    const calculations = useMemo(() => {
        if (!csvData || !csvDataBase) return { 
            ca: { before: 0, after: 0, diff: 0 },
            marge: { before: 0, after: 0, diff: 0 },
            sell: { before: 0, after: 0, diff: 0 }
        };

        const calculateValue = (data: Row[] | null, calculator: (row: Row) => number): number => {
            if (!data) return 0;
            return data.slice(1).reduce((sum, row) => sum + calculator(row), 0);
        };

        const caCalc = (row: Row) => (row[_SELLINGPRICE] * row[_ROTATION]) * 12;
        const margeCalc = (row: Row) => ((row[_SELLINGPRICE] - row[_NETPRICE]) * row[_ROTATION]) * 12;
        const sellCalc = (row: Row) => row[_ROTATION] * 12;

        const caBefore = calculateValue(csvDataBase, caCalc);
        const caAfter = calculateValue(csvData, caCalc);
        const margeBefore = calculateValue(csvDataBase, margeCalc);
        const margeAfter = calculateValue(csvData, margeCalc);
        const sellBefore = calculateValue(csvDataBase, sellCalc);
        const sellAfter = calculateValue(csvData, sellCalc);

        return {
            ca: { before: caBefore, after: caAfter, diff: caAfter - caBefore },
            marge: { before: margeBefore, after: margeAfter, diff: margeAfter - margeBefore },
            sell: { before: sellBefore, after: sellAfter, diff: sellAfter - sellBefore }
        };
    }, [csvData, csvDataBase]);

    const HandleFileChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
        const data = await ReadFile(event);
        setCsvData(data);
        setCsvDataCopy(deepCopy(data) as Row[]);
        setCsvDataBase(deepCopy(data) as Row[]);
    
        // Sélectionner tous les indices sauf l'en-tête (index 0)
        const newSelection = new Set<number>();
        if (data) {
            data.forEach((_, index) => {
                if (index > 0) newSelection.add(index);
            });
        }
    
        // Appliquer la sélection par défaut
        setSelectedIndex(newSelection);
    
        // Reset évolution
        setEvolution({ salesPrice: 0, purchasePrice: 0, rotation: 0 });
    }, []);

    const triggerFileInput = useCallback(() => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    }, []);

    const changeValue = useCallback((value: number, rowIndex: number, cellIndex: number) => {
        if (!csvData) return;
        
        setCsvData(prevData => {
            if (!prevData) return null;
            
            const newData = [...prevData];
            if (typeof newData[rowIndex][cellIndex] === 'number') {
                const newRow = [...newData[rowIndex]] as Row;
                newRow[cellIndex] = value;
                newData[rowIndex] = calculateRow(cellIndex, newRow);
            }
            return newData;
        });
        
        // Update the copy data as well
        setCsvDataCopy(prevData => {
            if (!prevData) return null;
            
            const newData = [...prevData];
            if (typeof newData[rowIndex][cellIndex] === 'number') {
                const newRow = [...newData[rowIndex]] as Row;
                newRow[cellIndex] = value;
                newData[rowIndex] = calculateRow(cellIndex, newRow);
            }
            return newData;
        });
    }, [csvData]);

    const handleChangeValue = useCallback((event: React.ChangeEvent<HTMLInputElement>, rowIndex: number, cellIndex: number) => {
        changeValue(parseFloat(event.target.value), rowIndex, cellIndex);
    }, [changeValue]);

    const simulateChangeEvent = useCallback((value: number): React.ChangeEvent<HTMLInputElement> => {
        return {
            target: { value: value.toString() } as HTMLInputElement,
        } as React.ChangeEvent<HTMLInputElement>;
    }, []);

    const updateSelectedRowsData = useCallback((
        valueCalculator: (originalValue: number, evolutionPercent: number) => number,
        fieldToUpdate: number,
        fieldToRecalculate: number,
        evolutionValue: number
    ) => {
        if (!csvData || !csvDataCopy) return null;

        return [...csvData].map((row, index) => {
            if (index > 0 && selectedIndex.has(index)) {
                const newRow = [...row] as Row;
                newRow[fieldToUpdate] = valueCalculator(csvDataCopy[index][fieldToUpdate], evolutionValue);
                return calculateRow(fieldToRecalculate, newRow);
            }
            return row;
        });
    }, [csvData, csvDataCopy, selectedIndex]);

    const handleEvolutionChange = useCallback((type: 'salesPrice' | 'purchasePrice' | 'rotation', event: ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(event.target.value);
        
        setEvolution(prev => ({ ...prev, [type]: value }));
        
        let newData;
        const evolutionFactor = (value: number, percent: number) => value * (1 + (percent / 100));
        
        switch (type) {
            case 'salesPrice':
                newData = updateSelectedRowsData(evolutionFactor, _SELLINGPRICE, _SELLINGPRICE, value);
                break;
            case 'purchasePrice':
                newData = updateSelectedRowsData(evolutionFactor, _NETPRICE, _NETPRICE, value);
                break;
            case 'rotation':
                newData = updateSelectedRowsData(evolutionFactor, _ROTATION, _ROTATION, value);
                break;
        }
        
        if (newData) setCsvData(newData);
    }, [updateSelectedRowsData]);

    const resetEvolution = useCallback((type: 'salesPrice' | 'purchasePrice' | 'rotation') => {
        handleEvolutionChange(type, simulateChangeEvent(0));
    }, [handleEvolutionChange, simulateChangeEvent]);

    const toggleRowSelection = useCallback((index: number) => {
        setSelectedIndex(prev => {
            const newSet = new Set(prev);
            if (newSet.has(index)) {
                newSet.delete(index);
            } else {
                newSet.add(index);
            }
            return newSet;
        });
    }, []);

    const handleSelectAll = useCallback(() => {
        if (!csvData) return;
        
        setSelectedIndex(prev => {
            // If all are already selected (or no rows), deselect all
            if (prev.size === csvData.length) {
                return new Set();
            }
            
            // Otherwise select all rows
            const newSet = new Set<number>();
            csvData.forEach((_, i) => newSet.add(i));
            return newSet;
        });
    }, [csvData]);

    const roundPrice = useCallback((option: boolean) => {
        if (!csvData) return;
        
        setCsvData(prevData => {
            if (!prevData) return null;
            
            return prevData.map((row, i) => {
                if (i > 0 && selectedIndex.has(i)) {
                    const newRow = [...row] as Row;
                    const sellingPrice = newRow[_SELLINGPRICE];
                    
                    newRow[_SELLINGPRICE] = option 
                        ? Math.floor(sellingPrice) + 0.49 
                        : Math.floor(sellingPrice) + 0.99;
                    
                    return calculateRow(_SELLINGPRICE, newRow);
                }
                return row;
            });
        });
    }, [csvData, selectedIndex]);

    const resetData = useCallback(() => {
        if (!csvData || !csvDataBase) return;
        
        setCsvData(prevData => {
            if (!prevData) return null;
            
            return prevData.map((row, i) => {
                if (i > 0 && selectedIndex.has(i) && csvDataBase[i]) {
                    return [...csvDataBase[i]];
                }
                return row;
            });
        });
        
        // Reset evolution values when resetting data
        setEvolution({ salesPrice: 0, purchasePrice: 0, rotation: 0 });
    }, [csvData, csvDataBase, selectedIndex]);

    const renderDataCell = useCallback((data: Data, rowIndex: number, cellIndex: number) => {
        if (!csvDataBase) return null;
        
        const isEditable = typeof data === 'number' && _EDITABLEVALUE.includes(cellIndex);
        const isDisplayable = _DISPLAYABLEVALUE.includes(cellIndex);
        
        if (!isDisplayable) return null;
        
        let cellColor = '';
        if (csvDataBase[rowIndex]) {
            if (_HIGHERINRED.includes(cellIndex) && typeof data === 'number') {
                if (data > csvDataBase[rowIndex][cellIndex]) cellColor = 'text-rose-500 font-medium';
                else if (data < csvDataBase[rowIndex][cellIndex]) cellColor = 'text-emerald-500 font-medium';
            } else if (_HIGHERINGREEN.includes(cellIndex) && typeof data === 'number') {
                if (data < csvDataBase[rowIndex][cellIndex]) cellColor = 'text-rose-500 font-medium';
                else if (data > csvDataBase[rowIndex][cellIndex]) cellColor = 'text-emerald-500 font-medium';
            }
        }
        
        if (isEditable) {
            return (
                <input 
                    className={`w-full max-w-[80px] py-2 px-3 bg-transparent rounded-md ${cellColor} 
                               focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500`} 
                    value={typeof data === 'number' ? parseFloat(data.toFixed(2)).toString() : '0'} 
                    type="number" 
                    onChange={(e) => handleChangeValue(e, rowIndex, cellIndex)}
                />
            );
        }
        
        return (
            <span className={`block w-full py-2 px-3 ${cellColor}`}>
                {typeof data === 'number' ? formatNumber(data) : data}
            </span>
        );
    }, [csvDataBase, handleChangeValue]);

    const SelectionCheckbox = useCallback(({ rowIndex }: { rowIndex: number }) => {
        const isSelected = selectedIndex.has(rowIndex);
        
        return (
            <td className="p-0">
                <button
                    type="button"
                    className={`flex items-center justify-center w-8 h-8 m-1 rounded-md transition-colors
                               ${isSelected 
                                 ? 'bg-indigo-500 text-white hover:bg-indigo-600' 
                                 : 'bg-gray-100 hover:bg-gray-200'}`}
                    onClick={() => toggleRowSelection(rowIndex)}
                >
                    {isSelected && <CheckIcon className="w-4 h-4" />}
                </button>
            </td>
        );
    }, [selectedIndex, toggleRowSelection]);

    const StatsCard = useCallback(({ title, before, after, diff, valueType = '' }: 
        { title: string, before: number, after: number, diff: number, valueType?: string }) => {
        
        const diffColor = diff >= 0 ? 'text-emerald-500' : 'text-rose-500';
        const diffPrefix = diff >= 0 ? '+' : '';
        
        return (
            <div className="bg-white rounded-xl shadow-md p-5 w-full max-w-xs">
                <h3 className="text-gray-500 text-sm font-medium mb-3">{title}</h3>
                
                <div className="space-y-2">
                    <div className="flex justify-between">
                        <span className="text-gray-500 text-sm">Avant</span>
                        <span className="font-medium">{formatNumber(before)}</span>
                    </div>
                    
                    <div className="flex justify-between">
                        <span className="text-gray-500 text-sm">Après</span>
                        <span className="font-medium">{formatNumber(after)}</span>
                    </div>
                    
                    <div className="pt-2 border-t border-gray-100 mt-2">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-500 text-sm">Variation</span>
                            <span className={`font-semibold ${diffColor}`}>
                                {diffPrefix}{formatNumber(diff)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }, []);

    const EvolutionControl = useCallback(({ 
        type, 
        label, 
        value, 
        onChange, 
        onReset,
        icon
    }: { 
        type: 'salesPrice' | 'purchasePrice' | 'rotation', 
        label: string, 
        value: number, 
        onChange: (e: ChangeEvent<HTMLInputElement>) => void, 
        onReset: () => void,
        icon: React.ReactNode
    }) => (
        <div className="bg-white rounded-xl shadow-md p-5 w-full">
            <div className="flex items-center gap-2 mb-4">
                {icon}
                <h3 className="text-gray-700 font-medium">{label}</h3>
            </div>
            
            <div className="flex items-center gap-3 mb-4">
                <input 
                    className="w-full appearance-none h-2 bg-gray-200 rounded-lg overflow-hidden"
                    style={{
                        background: `linear-gradient(to right, 
                                     ${value < 0 ? '#f43f5e' : '#10b981'} 0%, 
                                     ${value < 0 ? '#f43f5e' : '#10b981'} ${Math.abs(value)}%, 
                                     #e5e7eb ${Math.abs(value)}%, 
                                     #e5e7eb 100%)`
                    }}
                    min={-100} 
                    max={100} 
                    step="1" 
                    onChange={onChange} 
                    value={value} 
                    type="range"
                />
                
                <button
                    type="button"
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                    onClick={onReset}
                >
                    <TrashIcon className="w-4 h-4 text-gray-500" />
                </button>
            </div>
            
            <div className="flex items-center">
                <input 
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                    min={-100} 
                    max={100} 
                    step="1" 
                    onChange={onChange} 
                    value={value} 
                    type="number"
                />
                <span className="ml-2 text-gray-500 font-medium">%</span>
            </div>
        </div>
    ), []);

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 bg-gray-50 overflow-y-auto">
            <input 
                ref={inputRef} 
                className="hidden" 
                type="file" 
                onChange={HandleFileChange} 
                accept=".tsv"
            />
            
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-semibold text-gray-800 mb-2">Simulation de Prix</h1>
                <p className="text-gray-500">Téléchargez votre catalogue et simulez des changements de prix</p>
            </div>
            
            {/* Upload Button - Show prominently if no data loaded */}
            {!csvData ? (
                <div className="flex items-center justify-center h-64 border-2 border-dashed border-gray-300 rounded-xl bg-white">
                    <button
                        onClick={triggerFileInput}
                        className="flex flex-col items-center justify-center px-6 py-4 text-indigo-600 hover:text-indigo-700 transition-colors"
                    >
                        <DocumentArrowUpIcon className="w-12 h-12 mb-3" />
                        <span className="text-sm font-medium">Déposez votre fichier TSV</span>
                        <span className="text-xs text-gray-500 mt-1">ou cliquez pour choisir un fichier</span>
                    </button>
                </div>
            ) : (
                <>
                    {/* Stats Section */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <StatsCard 
                            title="Chiffre d'Affaires" 
                            before={calculations.ca.before} 
                            after={calculations.ca.after} 
                            diff={calculations.ca.diff}
                        />
                        <StatsCard 
                            title="Marge" 
                            before={calculations.marge.before} 
                            after={calculations.marge.after} 
                            diff={calculations.marge.diff}
                        />
                        <StatsCard 
                            title="Unités vendues" 
                            before={calculations.sell.before} 
                            after={calculations.sell.after} 
                            diff={calculations.sell.diff} 
                            valueType="unit"
                        />
                    </div>
                    
                    {/* Evolution Controls */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <EvolutionControl 
                            type="salesPrice"
                            label="Évolution prix de vente"
                            value={evolution.salesPrice}
                            onChange={(e) => handleEvolutionChange('salesPrice', e)}
                            onReset={() => resetEvolution('salesPrice')}
                            icon={<ChevronUpDownIcon className="w-5 h-5 text-indigo-500" />}
                        />
                        <EvolutionControl 
                            type="purchasePrice"
                            label="Évolution prix d'achat"
                            value={evolution.purchasePrice}
                            onChange={(e) => handleEvolutionChange('purchasePrice', e)}
                            onReset={() => resetEvolution('purchasePrice')}
                            icon={<ChevronUpDownIcon className="w-5 h-5 text-indigo-500" />}
                        />
                        <EvolutionControl 
                            type="rotation"
                            label="Évolution rotation"
                            value={evolution.rotation}
                            onChange={(e) => handleEvolutionChange('rotation', e)}
                            onReset={() => resetEvolution('rotation')}
                            icon={<ChevronUpDownIcon className="w-5 h-5 text-indigo-500" />}
                        />
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3 mb-8">
                        <button
                            onClick={() => roundPrice(false)}
                            className="px-4 py-2 bg-white rounded-lg text-sm font-medium shadow-sm hover:shadow-md transition-shadow"
                        >
                            Arrondir à 0.99
                        </button>
                        <button
                            onClick={() => roundPrice(true)}
                            className="px-4 py-2 bg-white rounded-lg text-sm font-medium shadow-sm hover:shadow-md transition-shadow"
                        >
                            Arrondir à 0.49
                        </button>
                        <button
                            onClick={resetData}
                            className="px-4 py-2 bg-white rounded-lg text-sm font-medium shadow-sm hover:shadow-md transition-shadow flex items-center gap-2"
                        >
                            <ArrowPathIcon className="w-4 h-4" />
                            Catalogue initial
                        </button>
                        <button
                            onClick={() => csvData && exportToCsv('Catalogue', csvData)}
                            className="px-4 py-2 bg-white rounded-lg text-sm font-medium shadow-sm hover:shadow-md transition-shadow flex items-center gap-2"
                        >
                            <ArrowDownTrayIcon className="w-4 h-4" />
                            Télécharger
                        </button>
                        <button
                            onClick={triggerFileInput}
                            className="px-4 py-2 bg-indigo-500 text-white rounded-lg text-sm font-medium shadow-sm hover:bg-indigo-600 transition-colors flex items-center gap-2"
                        >
                            <DocumentArrowUpIcon className="w-4 h-4" />
                            Changer de fichier
                        </button>
                    </div>
                    
                    {/* Table Section */}
                    <div className="bg-white rounded-xl shadow-md overflow-hidden">
                        <div className="max-h-[calc(100vh-450px)] overflow-auto">
                            <table className="w-full border-collapse">
                                <thead className="bg-gray-50 sticky top-0 z-10">
                                    <tr>
                                        <th className="p-3">
                                            <button
                                                onClick={handleSelectAll}
                                                className="w-8 h-8 rounded-md bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                                            >
                                                <CheckIcon className="w-4 h-4 text-gray-500" />
                                            </button>
                                        </th>
                                        {csvData[0].map((cell, index) => (
                                            _DISPLAYABLEVALUE.includes(index) && (
                                                <th key={index} className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    {String(cell)}
                                                </th>
                                            )
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {csvData.slice(1).map((row, rowIndex) => {
                                        // Ajout +1 à rowIndex car nous commençons à partir de l'index 1 ici
                                        const actualRowIndex = rowIndex + 1;
                                        return (
                                            <tr 
                                                key={actualRowIndex} 
                                                className={`${rowIndex % 2 === 0 ? 'bg-gray-50' : ''} 
                                                           hover:bg-indigo-50 transition-colors`}
                                            >
                                                <SelectionCheckbox rowIndex={actualRowIndex} />
                                                {row.map((cell: Data, cellIndex: number) => (
                                                    _DISPLAYABLEVALUE.includes(cellIndex) && (
                                                        <td key={`${actualRowIndex}-${cellIndex}`} className="p-0">
                                                            {renderDataCell(cell, actualRowIndex, cellIndex)}
                                                        </td>
                                                    )
                                                ))}
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
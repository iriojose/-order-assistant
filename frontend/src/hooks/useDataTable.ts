import { useEffect, useState } from 'react';
import { useForm, useFieldArray } from "react-hook-form"
import { Data } from '../store/types';
import { useContextProvider } from '../store';

export const useDataTable = (rows: Data[]) => {
    const { actions } = useContextProvider()
    
    const { control, handleSubmit, getValues, formState: { isValid } } = useForm<{ rows: Data[] }>({
        defaultValues: {
            rows: rows,
        },
        mode: "onChange"
    });
    
    const { fields, append, remove } = useFieldArray({
        control,
        name: "rows"
    });

    const [totals, setTotals] = useState<number[]>(Array(fields.length).fill(0))

    useEffect(() => {
        const newTotals = rows.map(row => row.quantity * row.price);
        setTotals(newTotals);
    }, [rows])

    const handleAddRow = () => {
        setTotals(prevTotal => [...prevTotal, 0])
        append({ product: '', quantity: 0, price: 0 });
        actions.setRows(getValues('rows'));
    };

    const handleDeleteRow = (index: number) => {
        setTotals(prevTotals => prevTotals.filter((_, i) => i !== index));
        remove(index)
        actions.setRows(getValues('rows'));
    };

    const handleInputChange = (index: number, field: keyof Data, value: string | number) => {
        const updatedRows = getValues('rows');

        if(field === 'quantity' || field === 'price') {
            const cantidad = field === 'quantity' ? +value : updatedRows[index].quantity;
            const precio = field === 'price' ? +value : updatedRows[index].price;
            setTotals(prevTotals => prevTotals.map((total, i) => i === index ? cantidad * precio : total));
        }
        
        actions.setRows(updatedRows);
    }

    const calculateTotal = () => totals.reduce((sum, row) => sum + row, 0)
    const calculateSubtotal = (total: number) => total - total * 0.16

    const totalGeneral = calculateTotal()
    const subtotal = calculateSubtotal(totalGeneral)

    return {
        totalGeneral,
        subtotal, 
        isValid,
        fields,
        control,
        totals,
        handleAddRow, 
        handleDeleteRow,
        handleInputChange,
        handleSubmit
    }
}
import { FC } from "react";
import { Data } from "../../../store/types";
import { Control } from "react-hook-form";
import { TableRow, TableCell, Button} from "@mui/material";
import { FormInput } from "../../atoms/FormInput";

type Props= {
    index: number,
    control: Control<{ rows: Data[] }>,
    totals: number[],
    remove: (index: number) => void,
    handleInputChange: (index: number, field: keyof Data, value: string | number) => void
}

export const TableContentRow: FC<Props> = ({ index, control, totals, remove, handleInputChange }) => {
    return (
        <TableRow key={index}>
            <TableCell component="th" scope="row">
                <FormInput
                    name={`rows.${index}.product`}
                    rules={{ required: 'El producto es obligatorio' }}
                    control={control}
                    onChange={(e) => handleInputChange(index, 'product', +e.target.value)}
                />
            </TableCell>
            <TableCell align="right">
                <FormInput
                    name={`rows.${index}.quantity`}
                    control={control}
                    type="number"
                    rules={{ required: 'La cantidad es obligatoria', min: { value: 1, message: 'La cantidad debe ser al menos 1' } }}
                    onChange={(e) => handleInputChange(index, 'quantity', +e.target.value)}
                />
            </TableCell>
            <TableCell align="right">
                <FormInput
                    name={`rows.${index}.price`}
                    control={control}
                    type="number"
                    rules={{ required: 'El precio es obligatorio', min: { value: 0.01, message: 'El precio debe ser mayor' }}}
                    onChange={(e) => handleInputChange(index, 'price', +e.target.value)}
                />
            </TableCell>
            <TableCell align="right">${totals[index] ? totals[index].toFixed(2):0}</TableCell>
            <TableCell align="right">
                <Button variant="contained" onClick={() => remove(index)} sx={{ ml: 1 }}>Eliminar</Button>
            </TableCell>
        </TableRow>
    );
}
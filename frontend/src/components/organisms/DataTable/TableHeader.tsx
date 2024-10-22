import { FC } from 'react';
import { TableCell, TableHead, TableRow } from '@mui/material';

export const TableHeader: FC = () => (
    <TableHead>
        <TableRow>
            <TableCell>Producto</TableCell>
            <TableCell>Cantidad</TableCell>
            <TableCell>Precio</TableCell>
            <TableCell>Total</TableCell>
            <TableCell>Opciones</TableCell>
        </TableRow>
    </TableHead>
);

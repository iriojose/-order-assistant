import { FC } from 'react';
import { Box, Typography } from '@mui/material';

type Props = {
    totalGeneral: number;
    subtotal: number;
}

export const TableFooter: FC<Props> = ({ totalGeneral, subtotal }) => (
    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', flexDirection: 'column', alignItems: 'flex-end' }}>
        <Typography variant="h6">Subtotal: ${subtotal.toFixed(2)}</Typography>
        <Typography variant="h4" sx={{ mt: 1 }}>Total General: ${totalGeneral.toFixed(2)}</Typography>
    </Box>
);


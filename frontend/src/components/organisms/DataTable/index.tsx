import { FC } from 'react';
import { Table, TableBody, TableContainer, Paper, Button, Box } from '@mui/material';
import { TableHeader } from './TableHeader';
import { TableContentRow } from './TableContent';
import { TableFooter } from './TableFooter';
import { useMutation, useApolloClient } from '@apollo/client';
import { CREATE_ORDER } from '../../../graphql/mutations';
import { GET_ORDERS } from '../../../graphql/queries';
import { useContextProvider } from '../../../store';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Data } from '../../../store/types';
import { useDataTable } from '../../../hooks/useDataTable';

type Props = {
    back: () => void
}

export const DataTable: FC<Props> = ({ back }) => {
    const client = useApolloClient();
    const navigate = useNavigate()
    const { actions, state } = useContextProvider()
    const [createOrder, { loading }] = useMutation(CREATE_ORDER);

    const { handleSubmit, handleInputChange, handleAddRow, handleDeleteRow, isValid, subtotal, totalGeneral, fields, control, totals } = useDataTable(state.rows)

    const onSubmit = async(data: { rows: Data[] }) => {
        const orderDetails = data.rows.map((row, i) => ({
            product: row.product,
            price: +row.price,
            quantity: +row.quantity,
            total: totals[i]
        }));

        try {
            await createOrder({
                variables: {
                    client: state.clientInformation?.client,
                    address: state.clientInformation?.address,
                    subtotal: subtotal,
                    tax: totalGeneral * 0.16,
                    total: totalGeneral,
                    orderDetails
                },
            });

            await client.refetchQueries({
                include: [GET_ORDERS],
            });

            actions.cleanStore()
            toast.success("¡Orden creada con éxito!");
            setTimeout(() => navigate("/") , 1000)
        } catch (error) {
            console.error('Error creating order:', error);
            toast.error("Ocurrió un error al crear la orden. Inténtalo de nuevo.");
        }
    };

    return (
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: "40px" }}>
            <Box sx={{ width: '120%' }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                        <Button variant="contained" onClick={handleAddRow}>
                            Agregar
                        </Button>
                    </Box>

                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHeader />

                            <TableBody>
                                {fields.map((_, index) => { 
                                    return (
                                        <TableContentRow
                                            key={index}
                                            index={index}
                                            control={control}
                                            totals={totals}
                                            remove={handleDeleteRow}
                                            handleInputChange={(i, field, value) => handleInputChange(i, field, value)}
                                        />
                                    )
                                })} 
                            </TableBody>

                        </Table>
                    </TableContainer>

                    <TableFooter totalGeneral={totalGeneral} subtotal={subtotal} />

                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: "center", pt: 2 }}>
                        <Button
                            color="inherit"
                            onClick={back}
                            sx={{ mr: 6 }}
                        >
                            Atrás
                        </Button>

                        <Button type='submit' sx={{ mr: 6 }} disabled={!isValid && !loading || fields.length <= 0} variant="contained">
                            {loading ? "Cargando...":"Guardar " }
                        </Button>
                    </Box>
                </form>
            </Box>
        </Box>
    );
}

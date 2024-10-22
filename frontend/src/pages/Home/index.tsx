import { FC, Fragment } from "react";
import { Navbar } from "../../components/templates/Navbar";
import { useQuery } from '@apollo/client';
import { GET_ORDERS } from "../../graphql/queries";
import { List } from "../../components/atoms/List";
import { OrderCard } from "../../components/organisms/OrderCard";
import { Box, CircularProgress, Typography } from '@mui/material';
import { Order } from "../../models/order";

export const Home: FC = () => {
    const { loading, error, data } = useQuery<{orders: Order[]}>(GET_ORDERS);

    if (loading) return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <CircularProgress />
        </Box>
    );
    
    if (error) return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <Typography variant="h6" color="error">{error.message}</Typography>
        </Box>
    );

    return (
        <Fragment>
            <Navbar />

            <Box 
                display="flex" 
                justifyContent="center" 
                alignItems="center" 
                minHeight="100vh" 
                px={2} 
                marginTop={5}
            >
                <Box maxWidth="600px" width="100%">
                    {data && data.orders.length === 0 ? (
                        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                            <Typography variant="h6" align="center">
                                Aún no hay órdenes
                            </Typography>
                        </Box>
                    ) : (
                        <List values={data?.orders ?? []}>
                            {(order, i) => (
                                <OrderCard key={i} order={order} />
                            )}
                        </List>
                    )} 
                </Box>
            </Box>
        </Fragment>
    )
}

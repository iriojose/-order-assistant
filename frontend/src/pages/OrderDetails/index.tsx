import { FC }from 'react';
import { useQuery } from '@apollo/client';
import { useParams, useNavigate } from 'react-router-dom';
import { CircularProgress, Typography, Box, Card, CardContent, Button } from '@mui/material'
import { GET_ORDER } from '../../graphql/queries/getOrder'
import { Order } from '../../models/order'
import { OrderDetail } from "../../models/orderDetail"

export const OrderDetails: FC = () => {
    const { id } = useParams<{ id: string }>();  
    const orderId = id ? id : null;

    const navigate = useNavigate()

    const { loading, data } = useQuery<{ order: Order }>(GET_ORDER, {
        variables: { id: orderId},
        skip: orderId === null,
    });

    if (loading) return (
        <Box 
            display="flex" 
            flexDirection="column" 
            alignItems="center" 
            justifyContent="center" 
            height="100vh"
            textAlign="center"
        >
            <CircularProgress />;
        </Box>
    )

    if (!data?.order) {
        return (
            <Box 
                display="flex" 
                flexDirection="column" 
                alignItems="center" 
                justifyContent="center" 
                height="100vh"
                textAlign="center"
            >
                <Typography variant="h6" color="error">
                    Order not found.
                </Typography>
                <Button 
                    variant="contained" 
                    color="primary" 
                    sx={{ marginTop: 2 }} 
                    onClick={() => navigate('/')} 
                >
                    Go to Home
                </Button>
            </Box>
        );
    }

    const order = data.order;

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4" gutterBottom>
                Order
            </Typography>
            <Card>
                <CardContent>
                    <Typography variant="h5">Order ID: {order.id}</Typography>
                    <Typography variant="subtitle1">Client: {order.client}</Typography>
                    <Typography variant="subtitle1">Date: {new Date(+order.date).toLocaleDateString()}</Typography>
                    <Typography variant="h6">Subtotal: ${order.subtotal.toFixed(2)}</Typography>
                    <Typography variant="h6">Tax: ${order.tax}</Typography>
                    <Typography variant="h6">Total: ${order.total.toFixed(2)}</Typography>
                    <Typography variant="subtitle1" sx={{ marginTop: 2 }}>Address:</Typography>
                    <Typography variant="body2">{order.address}</Typography>
                </CardContent>
            </Card>

            <Typography variant="h6" sx={{ marginTop: 2 }}>
                Order Details:
            </Typography>
            <Box 
                display="flex" 
                flexDirection="column" 
                gap={2}
                sx={{ marginTop: 2 }} 
            >
                {order.orderDetails.map((detail: OrderDetail) => (
                    <Card key={detail.id}>
                        <CardContent>
                            <Typography variant="h6">{detail.product}</Typography>
                            <Typography variant="body2">Quantity: {detail.quantity}</Typography>
                            <Typography variant="body2">Price: ${detail.price.toFixed(2)}</Typography>
                            <Typography variant="body2">Total: ${detail.total.toFixed(2)}</Typography>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Box>
    );
};

export default OrderDetails;
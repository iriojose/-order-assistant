import { FC } from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { Order } from '../../../models/order';
import { Link } from 'react-router-dom';

type Props = {
    order: Order
}

export const OrderCard: FC<Props> = ({ order }) => {
    const date = new Date(+order.date).toLocaleDateString()

    return (
        <Link to={`/detail/${order.id}`}>
            <Card sx={{ mb: 2, p: 2, boxShadow: 3 }}>
                <CardContent>
                    <Typography variant="h6" color="textPrimary">
                        {date}
                    </Typography>

                    <Typography variant="h6" color="textPrimary">
                        {order.client}
                    </Typography>
                    
                    <Box display="flex" justifyContent="space-between" my={1}>
                        <Typography variant="body1" color="textSecondary">
                            {order.orderDetails.length} {order.orderDetails.length === 1 ? 'item' : 'items'}
                        </Typography>
                        
                        <Typography variant="body1" color="textSecondary">
                            Subtotal: ${order.subtotal.toFixed(2)}
                        </Typography>
                    </Box>

                    <Box display="flex" justifyContent="flex-end">
                        <Typography variant="h6" color="textPrimary">
                            Total: ${order.total.toFixed(2)}
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        </Link>
    )
}
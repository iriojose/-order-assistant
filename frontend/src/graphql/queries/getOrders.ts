import { gql } from '@apollo/client';

export const GET_ORDERS = gql`
    query {
        orders {
            id
            client
            date
            subtotal
            total
            orderDetails {
                id
                product
                quantity
                price
                total
            }
        }
    }
`;
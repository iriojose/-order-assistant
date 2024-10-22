import { gql } from '@apollo/client';

export const CREATE_ORDER = gql`
    mutation CreateOrder($client: String!, $address: String!, $subtotal: Float!, $tax: Float!, $total: Float!, $orderDetails: [OrderDetailInput!]!) {
        createOrder(client: $client, address: $address, subtotal: $subtotal, tax: $tax, total: $total, orderDetails: $orderDetails) {
            id
            client
            address
            subtotal
            tax
            total
            orderDetails {
                product
                price
                quantity
                total
            }
        }
    }
`;
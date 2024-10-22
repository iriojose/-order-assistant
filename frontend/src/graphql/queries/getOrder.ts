import { gql } from '@apollo/client';

export const GET_ORDER = gql`
    query($id: String!) {
        order(id: $id){
            id
            client
            address
            date
            subtotal
            total
            tax
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
import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Order {
    id: String!
    orderNumber: Int!
    client: String!
    address: String!
    date: String!
    subtotal: Float!
    tax: Float!
    total: Float!
    orderDetails: [OrderDetail!]!
  }

  type OrderDetail {
    id: String!
    orderId: String!
    product: String!
    quantity: Int!
    price: Float!
    total: Float!
  }

  type Query {
    orders: [Order!]!
    order(id: String!): Order!
  }

  type Mutation {
    createOrder(
        client: String!, 
        address: String!, 
        subtotal: Float!, 
        tax: Float!, 
        total: Float!, 
        orderDetails: [OrderDetailInput!]!
    ): Order!
  }

  input OrderDetailInput {
    product: String!
    quantity: Int!
    price: Float!
    total: Float!
  }
`;
import { prisma } from "../../prisma/client";

export const orderResolvers = {
    Query: {
        orders: async () => {
            return await prisma.order.findMany({
                include: { orderDetails: true }
            });
        },
        order: async (_: any, args: { id: string }) => {
            return await prisma.order.findUnique({
                where: { id: args.id },
                include: { orderDetails: true }
            });
        },
    },

    Mutation: {
        createOrder: async (
                _: any, 
                args: { 
                    client: string, 
                    address: string, 
                    subtotal: number, 
                    tax: number, 
                    total: number, 
                    orderDetails: { product: string; price: number, quantity: number, total: number }[] 
                }
        ) => {
            const newOrder = await prisma.order.create({
                data: {
                client: args.client,
                address: args.address,
                subtotal: args.subtotal,
                tax: args.tax,
                total: args.total,
                orderDetails: {
                    create: args.orderDetails
                }
                },
                include: { orderDetails: true }
            });
            return newOrder;
        }
    }
};
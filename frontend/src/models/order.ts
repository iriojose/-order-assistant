import { OrderDetail } from "./orderDetail"

export type Order = {
    id: number
    orderNumber: number
    client: string
    address: string
    date: string
    subtotal: number
    tax: number
    total: number
    orderDetails: OrderDetail[]
}

import { OrderStatus } from '../enum/orders-status.enum';

export interface Order {
    id: number;
    userId: number;
    items: {
        productId: number;
        quantity: number;
        price: number;
    }[];
    totalPrice: number;
    status: OrderStatus;
    createdAt: Date;
    updatedAt: Date;
}
import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { Order } from './interfaces/order.interface';
import { OrderStatus } from './enum/orders-status.enum';

@Injectable()
export class OrdersService {
  private orders: Order[] = [];

  createOrder(createOrderDto: CreateOrderDto) {
    const newOrder: Order = {
      id: this.orders.length + 1,
      userId: createOrderDto.userId,
      items: createOrderDto.items.map(item => ({
        ...item,
        price: this.calculateItemPrice(item.productId, item.quantity),
      })),
      totalPrice: createOrderDto.totalPrice,
      status: OrderStatus.PENDING,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.orders.push(newOrder);
    return newOrder;
  }

  updateOrderStatus(updateOrderStatusDto: UpdateOrderStatusDto) {
    const order = this.orders.find(o => o.id === updateOrderStatusDto.orderId);
    if (order) {
      order.status = updateOrderStatusDto.status;
      order.updatedAt = new Date();
    }
    return order;
  }

  private calculateItemPrice(productId: number, quantity: number): number {
    // Mock logic for calculating item price (fetch from product service)
    return 100 * quantity;
  }
}
// src/orders/orders.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { OrderStatus } from './enum/orders-status.enum';
import { PrismaService } from '@src/prisma/prisma.service';

describe('OrdersService', () => {
  let service: OrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrdersService, PrismaService],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
  });

  it('should create an order', () => {
    const order = service.createOrder({
      userId: 1,
      items: [{ productId: 1, quantity: 2 }],
      totalPrice: 200,
    });
    expect(order).toBeDefined();
    expect(order.status).toEqual('PENDING');
  });

  it('should update order status', () => {
    service.createOrder({
      userId: 1,
      items: [{ productId: 1, quantity: 2 }],
      totalPrice: 200,
    });
    const updatedOrder = service.updateOrderStatus({
      orderId: 1,
      status: OrderStatus.CONFIRMED,
    });
    expect(updatedOrder.status).toEqual('CONFIRMED');
  });
});

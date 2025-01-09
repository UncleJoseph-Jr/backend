import { IsEnum, IsNotEmpty } from 'class-validator';
import { OrderStatus } from '../enum/orders-status.enum';

export class UpdateOrderStatusDto {
    @IsNotEmpty()
    orderId: number;

    @IsEnum(OrderStatus)
    status: OrderStatus;
}
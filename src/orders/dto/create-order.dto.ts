import { IsNotEmpty, IsArray, IsNumber } from 'class-validator';

export class CreateOrderDto {
    @IsNotEmpty()
    userId: number;

    @IsArray()
    items: {
		productId: number;
        quantity: number;
    }[];

    @IsNumber()
    totalPrice: number;
}
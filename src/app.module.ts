import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma/prisma.service';
import { MerchantsModule } from './merchants/merchants.module';
import { ProductsModule } from './products/products.module';
import { OrdersService } from './orders/orders.service';
import { OrdersController } from './orders/orders.controller';
import { OrdersModule } from './orders/orders.module';
import { DriversModule } from './drivers/drivers.module';

@Module({
  imports: [UsersModule, MerchantsModule, ProductsModule, OrdersModule, DriversModule],
  controllers: [AppController, OrdersController],
  providers: [AppService, PrismaService, OrdersService],
})
export class AppModule {}

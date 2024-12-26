import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma/prisma.service';
import { MerchantsModule } from './merchants/merchants.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [UsersModule, MerchantsModule, ProductsModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}

import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // ทำให้โมดูลนี้ใช้ได้ทั่วแอปพลิเคชัน
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}

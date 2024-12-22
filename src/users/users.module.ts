import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport'; // เพิ่มการ import
import { JwtStrategy } from './jwt.strategy'; // เพิ่มการ import

@Module({
  imports: [
    PrismaModule,
    PassportModule.register({ defaultStrategy: 'jwt' }), // เพิ่ม PassportModule
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secret',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [UsersService, JwtAuthGuard, JwtStrategy], // เพิ่ม JwtStrategy
  controllers: [UsersController],
  exports: [UsersService, PassportModule], // เพิ่ม PassportModule ใน exports
})
export class UsersModule {}

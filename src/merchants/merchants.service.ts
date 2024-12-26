import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMerchantDto } from './dto/create-merchant.dto';
import { UpdateMerchantDto } from './dto/update-merchant.dto';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class MerchantsService {
  constructor(
    // private prisma: PrismaService,
    private readonly prisma: PrismaService, 
    private readonly jwtService: JwtService
) {}

  // async createMerchant(dto: CreateMerchantDto) {
  //     return this.prisma.merchant.create({
  //         data: dto,
  //     });
  // }

  async createMerchant(data: CreateMerchantDto) {
    const {
      name,
      phoneNumber,
      category,
      description,
      openingTime,
      closingTime,
      email,
      password,
      latitude,
      longitude,
    } = data;

    // ตรวจสอบว่า email มีอยู่แล้วหรือไม่
    const existingMerchant = await this.prisma.merchant.findUnique({
      where: { email },
    });
    if (existingMerchant) {
      throw new Error('Email is already registered');
    }

    // เข้ารหัส password
    const hashedPassword = await bcrypt.hash(password, 10);

    return await this.prisma.merchant.create({
      data: {
        name,
        phoneNumber,
        category,
        description,
        openingTime,
        closingTime,
        email,
        password: hashedPassword,
        latitude,
        longitude,
      },
    });
  }

  async loginMerchant(email: string, password: string) {
    const merchant = await this.prisma.merchant.findUnique({
      where: { email },
    });
    if (!merchant) {
      throw new Error('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, merchant.password);
    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    // สร้าง JWT Token (ถ้าใช้ระบบ JWT)
    const payload = { sub: merchant.id, role: 'merchant' };
    const token = this.jwtService.sign(payload);

    return {
      accessToken: token,
      merchant: {
        id: merchant.id,
        name: merchant.name,
        email: merchant.email,
      },
    };
  }

  async updateMerchant(id: number, dto: UpdateMerchantDto) {
    return this.prisma.merchant.update({
      where: { id },
      data: dto,
    });
  }

  async getMerchantById(id: number) {
    return this.prisma.merchant.findUnique({
      where: { id },
      include: { menus: true },
    });
  }

  async deleteMerchant(id: number) {
    return this.prisma.merchant.delete({
      where: { id },
    });
  }

  async verifyMerchant(id: number) {
    return this.prisma.merchant.update({
      where: { id },
      data: { isVerified: true },
    });
  }
}

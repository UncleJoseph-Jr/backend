import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // ลงทะเบียนผู้ใช้
  async register(name: string, email: string, password: string): Promise<User> {

    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: 'USER', // กำหนด role เป็น USER โดยปริยาย
      },
    });
    return newUser;
  }

  // ล็อกอินผู้ใช้และสร้าง JWT
  async login(email: string, password: string): Promise<{ accessToken: string; user: any }> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    const updateUser = await this.prisma.user.update({
        where: { email },
        data: { 
            updatedAt: new Date(),
            lastLogin: new Date(),
        },
    });

    const payload = { sub: user.id, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

    return{
        accessToken: token,
        user: {
            id: updateUser.id,
            name: updateUser.name,
            email: updateUser.email,
            role: updateUser.role,
            createdAt: updateUser.createdAt,
            updatedAt: updateUser.updatedAt,
            lastLogin: updateUser.updatedAt,
        },
    };
  }

  // ค้นหาผู้ใช้โดยอีเมล์
  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }
}
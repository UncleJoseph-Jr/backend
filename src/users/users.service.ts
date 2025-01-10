import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async register(name: string, email: string, password: string, phoneNumber: string): Promise<User> {

    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new BadRequestException('Email or password is incorrect');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phoneNumber,
        role: 'USER',
      },
    });
    return newUser;
  }

  async login(email: string, password: string): Promise<{ accessToken: string; user: any }> { 
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new BadRequestException('Email or password is incorrect');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Email or password is incorrect');
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

    return {
        accessToken: token,
        user: {
            id: updateUser.id,
            name: updateUser.name,
            email: updateUser.email,
            phoneNumber: updateUser.phoneNumber,
            role: updateUser.role,
            createdAt: updateUser.createdAt,
            updatedAt: updateUser.updatedAt,
            lastLogin: updateUser.lastLogin,
        },
    };
}


  async changePassword(userId: number, currentPassword: string, newPassword: string): Promise<string> {

    // console.log('userId:', userId);
    // console.log('currentPassword:', currentPassword);
    // console.log('newPassword:', newPassword);
    
  const user = await this.prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new Error('User not found');
  }

  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) {
    throw new Error('Invalid current password');
  }

  const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
  if (!isPasswordValid) {
    throw new Error('Current password is incorrect');
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await this.prisma.user.update({
    where: { id: userId },
    data: { password: hashedPassword },
  });

  return 'Password updated successfully';
}

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  
}
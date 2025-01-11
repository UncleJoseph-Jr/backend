import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDriverDto } from './dto/register-driver.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class DriversService {
  constructor(private prisma: PrismaService) {}

  async register(registerDto: RegisterDriverDto) {
    const { email, phone, password, ...rest } = registerDto;

    const existingDriver = await this.prisma.drivers.findFirst({
      where: {
        OR: [{ email }, { phone }],
      },
    });

    if (existingDriver) {
      throw new BadRequestException(
        existingDriver.email === email
          ? 'Email is already in use'
          : 'Phone number is already in use',
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    return this.prisma.drivers.create({
      data: {
        email,
        phone,
        password: hashedPassword,
        ...rest,
      },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.drivers.findUnique({ where: { email } });
  }

  async findById(id: number) {
    return this.prisma.drivers.findUnique({ where: { id } });
  }
}

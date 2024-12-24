import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMerchantDto } from './dto/create-merchant.dto';
import { UpdateMerchantDto } from './dto/update-merchant.dto';

@Injectable()
export class MerchantsService {
    constructor(private prisma: PrismaService) {}

    async createMerchant(dto: CreateMerchantDto) {
        return this.prisma.merchant.create({
            data: dto,
        });
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


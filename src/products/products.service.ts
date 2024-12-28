import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  // async createProduct(dto: CreateProductDto) {
  //   return this.prisma.product.create({ data: dto });
  // }
  async createProduct(dto: CreateProductDto) {
    return this.prisma.product.create({
      data: {
        name: dto.name,
        description: dto.description,
        price: parseFloat(dto.price.toString()),
        category: dto.category || null,
        merchantId: parseInt(dto.merchantId.toString()),
        imageUrl: dto.imageUrl || null,
      }
    })
  }

  async updateProduct(id: number, dto: UpdateProductDto) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return this.prisma.product.update({
      where: { id },
      data: dto,
    });
  }

  async deleteProduct(id: number) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return this.prisma.product.delete({ where: { id } });
  }

  async getProductById(id: number) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async getProductsByMerchant(merchantId: number) {
    return this.prisma.product.findMany({
      where: { merchantId },
    });
  }

<<<<<<< HEAD
=======
  // เพิ่มฟังก์ชันสำหรับอัปเดตรูปภาพสินค้า
>>>>>>> d13d93d500124cf0811e5da41ea5140702091ed3
  async updateProductImage(productId: number, imagePath: string) {
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return this.prisma.product.update({
      where: { id: productId },
<<<<<<< HEAD
      data: { imageUrl: imagePath },
    });
  }
}
=======
      data: { imageUrl: imagePath }, // อัปเดต path รูปภาพในฐานข้อมูล
    });
  }
}
>>>>>>> d13d93d500124cf0811e5da41ea5140702091ed3

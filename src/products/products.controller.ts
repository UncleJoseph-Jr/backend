import {
  Controller,
  Post,
  Put,
  Delete,
  Get,
  Body,
  Param,
  Query,
  ParseIntPipe,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
<<<<<<< HEAD
=======

>>>>>>> d13d93d500124cf0811e5da41ea5140702091ed3
import { extname } from 'path';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}


  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/products',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )

  async createProduct(
    @Body() dto: CreateProductDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const imageUrl = file ? `/uploads/products/${file.filename}` : null;
    return this.productsService.createProduct({ ...dto, imageUrl });
  }
  // @Post()
  // createProduct(@Body() dto: CreateProductDto) {
  //   return this.productsService.createProduct(dto);
  // }

  @Put(':id')
  updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateProductDto,
  ) {
    return this.productsService.updateProduct(id, dto);
  }

  @Delete(':id')
  deleteProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.deleteProduct(id);
  }

  @Get(':id')
  getProductById(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.getProductById(id);
  }

  @Get()
  getProductsByMerchant(@Query('merchantId', ParseIntPipe) merchantId: number) {
    return this.productsService.getProductsByMerchant(merchantId);
  }

<<<<<<< HEAD
=======
  // เพิ่ม endpoint สำหรับอัปโหลดรูปภาพ
>>>>>>> d13d93d500124cf0811e5da41ea5140702091ed3
  @Post(':id/upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
<<<<<<< HEAD
        destination: './uploads/products',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${uniqueSuffix}${ext}`);
=======
        destination: './uploads/products', // โฟลเดอร์เก็บไฟล์
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${uniqueSuffix}${ext}`); // ตั้งชื่อไฟล์ให้ไม่ซ้ำ
>>>>>>> d13d93d500124cf0811e5da41ea5140702091ed3
        },
      }),
    }),
  )
<<<<<<< HEAD

=======
>>>>>>> d13d93d500124cf0811e5da41ea5140702091ed3
  async uploadProductImage(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
<<<<<<< HEAD
    const imageUrl =  `/uploads/products/${file.filename}`;
    return this.productsService.updateProductImage(id, file.path);
=======
    return this.productsService.updateProductImage(id, file.path); // อัปเดต path รูปภาพในฐานข้อมูล
>>>>>>> d13d93d500124cf0811e5da41ea5140702091ed3
  }
}

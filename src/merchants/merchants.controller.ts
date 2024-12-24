import { Controller, Post, Get, Put, Delete, Body, Param } from '@nestjs/common';
import { MerchantsService } from './merchants.service';
import { CreateMerchantDto } from './dto/create-merchant.dto';
import { UpdateMerchantDto } from './dto/update-merchant.dto';

@Controller('merchants')
export class MerchantsController {
    constructor(private readonly merchantsService: MerchantsService) {}

    @Post()
    createMerchant(@Body() dto: CreateMerchantDto) {
        return this.merchantsService.createMerchant(dto);
    }
    
    @Get(':id')
    getMerchantById(@Param('id') id: number) {
        return this.merchantsService.getMerchantById(id);
    }

    @Put(':id')
    updateMerchant(@Param('id') id: number, @Body() dto: UpdateMerchantDto) {
        return this.merchantsService.updateMerchant(id, dto);
    }

    @Delete(':id')
    deleteMerchant(@Param('id') id: number) {
        return this.merchantsService.deleteMerchant(id);
    }

    @Put(':id/verify')
    verifyMerchant(@Param('id') id: number) {
        return this.merchantsService.verifyMerchant(id);
    }
}

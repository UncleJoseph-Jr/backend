import { 
    Controller, 
    Post, 
    Get, 
    Put, 
    Delete, 
    Body, 
    Param, 
    BadRequestException 
} from '@nestjs/common';
import { MerchantsService } from './merchants.service';
import { CreateMerchantDto } from './dto/create-merchant.dto';
import { UpdateMerchantDto } from './dto/update-merchant.dto';

@Controller('merchants')
export class MerchantsController {
    constructor(private readonly merchantsService: MerchantsService) {}

    @Post('register')
    async register(@Body() body: CreateMerchantDto) {
        return this.merchantsService.createMerchant(body);
    }

    @Post('login')
    async login(
        @Body('email') email: string,
        @Body('password') password: string,
    ) {
        return this.merchantsService.loginMerchant(email, password);
    }

    @Post()
    createMerchant(@Body() dto: CreateMerchantDto) {
        return this.merchantsService.createMerchant(dto);
    }

    @Get(':id')
    getMerchantById(@Param('id') id: string) {
        const merchantId = parseInt(id, 10);
        if (isNaN(merchantId)) {
            throw new BadRequestException('Invalid merchant ID');
        }
        return this.merchantsService.getMerchantById(merchantId);
    }

    @Put(':id')
    updateMerchant(@Param('id') id: string, @Body() dto: UpdateMerchantDto) {
        const merchantId = parseInt(id, 10);
        if (isNaN(merchantId)) {
            throw new BadRequestException('Invalid merchant ID');
        }
        return this.merchantsService.updateMerchant(merchantId, dto);
    }

    @Delete(':id')
    deleteMerchant(@Param('id') id: string) {
        const merchantId = parseInt(id, 10);
        if (isNaN(merchantId)) {
            throw new BadRequestException('Invalid merchant ID');
        }
        return this.merchantsService.deleteMerchant(merchantId);
    }

    @Put(':id/verify')
    verifyMerchant(@Param('id') id: string) {
        const merchantId = parseInt(id, 10);
        if (isNaN(merchantId)) {
            throw new BadRequestException('Invalid merchant ID');
        }
        return this.merchantsService.verifyMerchant(merchantId);
    }
}

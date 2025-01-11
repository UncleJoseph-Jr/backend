import { Controller, Body, Post } from '@nestjs/common';
import { DriversService } from './drivers.service';
import { RegisterDriverDto } from './dto/register-driver.dto';

@Controller('drivers')
export class DriversController {
    constructor(private readonly driversService: DriversService) {}

    @Post('register')
    async register(@Body() registerDto: RegisterDriverDto) {
        return this.driversService.register(registerDto);
    }
}

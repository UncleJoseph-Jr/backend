import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    // Endpoint สำหรับสมัครสมาชิก
    @Post('register')
    async register(@Body() body: RegisterDto) {
        const { name, email, password } = body;
        try {
           const user = await this.usersService.register(name, email, password);
        return user; 
        } catch (error) {
            throw new BadRequestException('This email is already registered.');
        }
        throw new Error('An unexpected error occurred');
        
    }

    // Endpoint สำหรับล็อกอิน
    @Post('login')
    async login(@Body() body: LoginDto) {
        const { email, password } = body;
        // const token = await this.usersService.login(email, password);
        const result = await this.usersService.login(email, password);
        return {result};
    }
}

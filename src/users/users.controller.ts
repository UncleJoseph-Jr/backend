import {
  Controller,
  Post,
  Body,
  BadRequestException,
  UseGuards,
  Request,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Endpoint สำหรับสมัครสมาชิก
  @Post('register')
  async register(@Body() body: RegisterDto) {
    const { name, email, password, phoneNumber } = body;
    try {
      const user = await this.usersService.register(name, email, password, phoneNumber);
      return user;
    } catch (error) {
      throw new BadRequestException('This email is already registered.');
    }
  }

  // Endpoint สำหรับล็อกอิน
  @Post('login')
  async login(@Body() body: LoginDto) {
    const { email, password } = body;
    const result = await this.usersService.login(email, password);
    return { result };
  }

  // Endpoint สำหรับเปลี่ยนรหัสผ่าน
  @UseGuards(AuthGuard('jwt')) // ใช้ AuthGuard ที่ลงทะเบียน 'jwt'
  @Post('changepassword')
  async changePassword(
    @Req() req,
    @Body('currentPassword') currentPassword: string,
    @Body('newPassword') newPassword: string,
  ) {
    const userId = req.user?.id; // ดึง userId จาก JWT payload
    // console.log('userId from JWT:', userId); // ตรวจสอบว่า userId ถูกดึงมาหรือไม่
    if (!userId) {
      throw new BadRequestException('Invalid user token');
    }
    return this.usersService.changePassword(
      userId,
      currentPassword,
      newPassword,
    );
  }
}

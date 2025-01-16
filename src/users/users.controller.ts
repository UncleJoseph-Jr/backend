import {
  Controller,
  Post,
  Body,
  BadRequestException,
  UseGuards,
  Request,
  Req,
  Get,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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

  @Post('login')
  async login(@Body() body: LoginDto) {
    const { email, password } = body;
    const result = await this.usersService.login(email, password);
    return { result };
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('changepassword')
  async changePassword(
    @Req() req,
    @Body('currentPassword') currentPassword: string,
    @Body('newPassword') newPassword: string,
  ) {
    const userId = req.user?.id;
    if (!userId) {
      throw new BadRequestException('Invalid user token');
    }
    return this.usersService.changePassword(
      userId,
      currentPassword,
      newPassword,
    );
  }
  ////////////////////////////////////////////////

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }
  ////////////////////////////////////////////////
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Req() req: any) {
    const userId = req.user?.id;
    if (!userId || typeof userId !== 'number') {
      throw new BadRequestException('Invalid user token or missing userId');
    }
    return this.usersService.findUserById(userId);
  }
}

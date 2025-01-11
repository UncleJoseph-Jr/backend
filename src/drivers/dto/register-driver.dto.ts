import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class RegisterDriverDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  profileImage?: string;

  @IsOptional()
  @IsString()
  licenseImage?: string;

  @IsOptional()
  @IsString()
  idCardImage?: string;
}

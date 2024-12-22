import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private prisma: PrismaService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET, // ใช้ environment variable
        });
    }

    async validate(payload: any) {
        // ตรวจสอบ user จาก database
        const user = await this.prisma.user.findUnique({ where: { id: payload.sub } });

        // หากไม่พบ user ให้ throw ข้อผิดพลาด
        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        // ส่งคืน user เพื่อใช้ใน Request object
        return user;
    }
}

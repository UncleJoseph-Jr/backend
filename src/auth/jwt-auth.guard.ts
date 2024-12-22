import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization?.split(' ')[1];

        if (!token) {
            throw new UnauthorizedException('Token not found');
        }

        try {
            const payload = this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
            request.user = payload;
            return true;
        }catch (error) {
            throw new UnauthorizedException('Invalid or expired token');
        }
    }
}
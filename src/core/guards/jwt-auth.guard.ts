import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard {
    constructor(private jwtService: JwtService) {}

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;

        if (!authHeader) {
            throw new UnauthorizedException('No token provided');
        }

        const [bearer, token] = authHeader.split(' ');

        if (bearer !== 'Bearer' || !token) {
            throw new UnauthorizedException('Invalid token format');
        }

        try {
            const user = this.jwtService.verify(token);
            request.user = user; 
            return true;
        } catch {
            throw new UnauthorizedException('Invalid token');
        }
    }
}

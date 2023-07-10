import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  NotFoundException,
  Injectable,
} from '@nestjs/common';
import { envConfig } from '../configs/env.config';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class VerifyJwtGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;

    const token = authorization.split(' ')[1];
    if (!token) throw new UnauthorizedException('Token not found');
    try {
      const decode = await this.jwtService.verifyAsync(token, {
        secret: envConfig.accessTokenSecret,
      });
      if (!decode) throw new UnauthorizedException('Token malformed');
      const user = await this.userService.getUser(decode);
      if (!user) throw new NotFoundException('User not found');
      request.user = user;
      return true;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}

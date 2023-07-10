import { Controller, Body, Post, Get, Patch } from '@nestjs/common';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import { LoginUserDto } from '../auth/dto/login-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private userService: AuthService) {}
  @Post('/signup')
  async createUser(@Body() body: CreateUserDto) {
    return this.userService.create(body);
  }

  @Post('/login')
  async loginUser(@Body() body: LoginUserDto) {
    return this.userService.login(body);
  }
}

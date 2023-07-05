import { Controller, Body, Post, Get, Patch } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post('/')
  async createUser(@Body() body: CreateUserDto) {
    return this.userService.create(body);
  }
}

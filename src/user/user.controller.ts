import * as httpStatus from 'http-status';
import * as responseHandler from '../common/response';
import { Controller, Get, Injectable, Request } from '@nestjs/common';
import { UserService } from './user.service';

@Injectable()
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/profile')
  async getProfile(@Request() request: any) {
    return responseHandler.success(
      httpStatus.OK,
      'User details fetched successfully',
      {
        email: request.user.email,
        phoneNo: request.user.phoneNo,
        firstName: request.user.firstName,
        lastName: request.user.lastName,
        username: request.user.username,
      },
    );
  }

  // @Patch('/profile')
  // async editProfile(@Request request: any) {}
}

import * as httpStatus from 'http-status';
import * as responseHandler from '../common/response';
import { Controller, Get, Injectable, Body, Patch } from '@nestjs/common';
import { User } from './user.schema';
import { UserService } from './user.service';
import { EditProfileDto } from './dtos/edit-profile.dto';
import { RequestUser } from '../decorators/request.decorator';

@Injectable()
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/profile')
  async getProfile(@RequestUser() user: User) {
    return responseHandler.success(
      httpStatus.OK,
      'User details fetched successfully',
      {
        email: user.email,
        phoneNo: user.phoneNo,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
      },
    );
  }

  @Patch('/profile')
  async editProfile(@RequestUser() user: User, @Body() body: EditProfileDto) {
    const updateStatus = await this.userService.editProfile(user['_id'], body);
    return responseHandler.success(
      httpStatus.OK,
      'User details updated successfully',
      updateStatus,
    );
  }
}

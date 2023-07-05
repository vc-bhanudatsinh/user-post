import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthUtils } from '../utils/auth.utils';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private authUtils: AuthUtils,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const userDetails = {};
    userDetails['tokenPass'] = this.authUtils.generateTokenPass();
    Object.assign(userDetails, createUserDto);
    const createUser = new this.userModel(userDetails);
    return createUser.save();
  }
}

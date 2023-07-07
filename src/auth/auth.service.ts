import * as httpStatus from 'http-status';
import { Model } from 'mongoose';
import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../user/user.schema';
import * as responseHandler from '../common/response';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import { AuthUtils } from '../utils/auth.utils';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private authUtils: AuthUtils,
  ) {}

  async create(
    createUserDto: CreateUserDto,
  ): Promise<responseHandler.ICommonResponse> {
    let user: User | null;
    if (createUserDto.phoneNo)
      user = await this.userModel.findOne({
        email: createUserDto.email,
        phoneNo: createUserDto.phoneNo,
      });
    else user = await this.userModel.findOne({ email: createUserDto.email });
    if (user) throw new ConflictException('User Already Exists');
    createUserDto.password = await this.authUtils.hashPassword(
      createUserDto.password,
    );
    const createUser = new this.userModel({
      ...createUserDto,
      tokenPass: this.authUtils.generateTokenPass(),
    });
    const createdUser = await createUser.save();
    const accessToken = await this.authUtils.createJwtToken(createdUser['_id']);
    return responseHandler.sucess(
      httpStatus.CREATED,
      'User created Successfully',
      {
        accessToken,
      },
    );
  }
}

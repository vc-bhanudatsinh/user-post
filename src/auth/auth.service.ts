import * as httpStatus from 'http-status';
import { Model } from 'mongoose';
import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../user/user.schema';
import { JwtService } from '@nestjs/jwt';
import * as responseHandler from '../common/response';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import { LoginUserDto } from '../auth/dto/login-user.dto';
import { AuthUtils } from '../utils/auth.utils';
import { envConfig } from 'src/configs/env.config';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private authUtils: AuthUtils,
    private jwtService: JwtService,
  ) {}

  async create(user: CreateUserDto): Promise<responseHandler.ICommonResponse> {
    interface Ibody {
      email: string;
      phoneNo?: string;
    }
    const body: Ibody = {
      email: user.email,
    };

    if (user.phoneNo) body.phoneNo = user.phoneNo;

    const duplicateUser = await this.userModel.findOne(body).lean();
    if (duplicateUser) throw new ConflictException('User Already Exists');

    user.password = await this.authUtils.hashPassword(user.password);

    const createUser = new this.userModel({
      ...user,
      tokenPass: this.authUtils.generateTokenPass(),
    });
    await createUser.save();

    const accessToken = await this.jwtService.signAsync({
      id: createUser['_id'],
      token: createUser.tokenPass,
    });
    return responseHandler.success(
      httpStatus.CREATED,
      'User created Successfully',
      {
        accessToken,
      },
    );
  }

  async login(user: LoginUserDto) {
    const userData = await this.userModel.findOne({ email: user.email });
    if (!userData)
      return responseHandler.error(
        httpStatus.NOT_FOUND,
        'Account does not exists',
      );

    const accessToken = await this.jwtService.signAsync({
      id: userData['_id'],
      token: userData.tokenPass,
    });
    return responseHandler.success(httpStatus.OK, 'Logged in Successfully', {
      accessToken,
    });
  }
}

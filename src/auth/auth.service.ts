import { Model } from 'mongoose';
import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, IUser } from '../user/user.schema';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import { AuthUtils } from '../utils/auth.utils';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private authUtils: AuthUtils,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<IUser> {
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
    return {
      firstName: createdUser.firstName,
      lastName: createUser.lastName,
      email: createUser.email,
      id: createUser['_id'],
      username: createUser.username,
    };
  }
}

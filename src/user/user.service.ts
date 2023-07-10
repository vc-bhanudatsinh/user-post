import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async getUser(user) {
    return await this.userModel
      .findOne({ _id: user.id, tokenPass: user.token })
      .lean();
  }
}

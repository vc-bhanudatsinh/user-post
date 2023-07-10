import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import { Types } from 'mongoose';
import { EditProfileDto } from './dtos/edit-profile.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async getUser(user) {
    return await this.userModel
      .findOne({ _id: user.id, tokenPass: user.token })
      .lean();
  }

  async editProfile(id: Types.ObjectId, userDetails: EditProfileDto) {
    return await this.userModel.updateOne({ _id: id }, userDetails);
  }
}

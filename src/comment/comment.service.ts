import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Posts, IComments } from '../post/post.schema';

@Injectable()
export class CommentService {
  constructor(@InjectModel(Posts.name) private postModel: Model<Posts>) {}
  async create(data: IComments, id: Types.ObjectId) {
    console.log('data', data, id);
    return this.postModel.updateOne({ _id: id }, { $push: { comments: data } });
  }
}

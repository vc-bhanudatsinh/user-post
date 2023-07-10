import { Injectable } from '@nestjs/common';
import { Posts } from './post.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PostService {
  constructor(@InjectModel(Posts.name) private postModel: Model<Posts>) {}

  async create(data) {
    const post = await this.postModel.create(data);
    await post.save();
    return post;
  }
}

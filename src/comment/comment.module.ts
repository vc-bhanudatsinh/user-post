import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Posts, PostSchema } from '../post/post.schema';
import { User, UserSchema } from '../user/user.schema';
import { PostService } from '../post/post.service';
import { UserService } from '../user/user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Posts.name, schema: PostSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [CommentController],
  providers: [CommentService, PostService, UserService],
})
export class CommentModule {}

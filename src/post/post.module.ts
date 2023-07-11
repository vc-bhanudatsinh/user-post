import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { UserService } from '../user/user.service';
import { Posts, PostSchema } from './post.schema';
import { User, UserSchema } from '../user/user.schema';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Posts.name, schema: PostSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [PostController],
  providers: [PostService, UserService],
  exports: [
    MongooseModule.forFeature([{ name: Posts.name, schema: PostSchema }]),
  ],
})
export class PostModule {}

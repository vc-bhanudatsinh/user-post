import { Controller, Post, Injectable, Body } from '@nestjs/common';
import { PostService } from './post.service';
// import { Posts } from './post.schema';
import { CreatePostDto } from './dtos/create-post.dto';
import * as httpStatus from 'http-status';
import * as responseHandler from '../common/response';

@Controller('post')
@Injectable()
export class PostController {
  constructor(private postService: PostService) {}

  @Post('/')
  async createPost(@Body() postDetails: CreatePostDto) {
    const posts = await this.postService.create(postDetails);
    return responseHandler.success(
      httpStatus.CREATED,
      'Post created Successfully',
      posts,
    );
  }
}

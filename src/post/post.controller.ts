import {
  Controller,
  Post,
  Injectable,
  Body,
  Query,
  Param,
  Get,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { PostService } from './post.service';
import { UserService } from '../user/user.service';
import { User } from '../user/user.schema';
import { RequestUser } from '../decorators/request.decorator';
import { GetPostListDto } from './dtos/post-list.dto';
import { CreatePostDto } from './dtos/create-post.dto';
import { GetPostDetailsDto } from './dtos/post-details.dto';
import * as httpStatus from 'http-status';
import * as responseHandler from '../common/response';
import { VerifyJwtGuard } from '../guard/verify-jwt.guard';

@Controller('post')
@Injectable()
@UseGuards(VerifyJwtGuard)
export class PostController {
  constructor(
    private postService: PostService,
    private userService: UserService,
  ) {}

  @Post('/')
  async createPost(@Body() postDetails: CreatePostDto) {
    const posts = await this.postService.create(postDetails);
    return responseHandler.success(
      httpStatus.CREATED,
      'Post created Successfully',
      posts,
    );
  }

  @Get('/')
  async getPostList(@RequestUser() user: User, @Query() query: GetPostListDto) {
    const { limit = '5', pageNo = '1' } = query;
    let searchUserId: string | Types.ObjectId = query.searchUserId;
    const searchComment =
      query.searchComment === undefined
        ? query.searchComment
        : new RegExp(query.searchComment);

    if (searchUserId) {
      const isValid = await this.userService.validateUserIds([searchUserId]);
      if (isValid.length === 0)
        throw new NotFoundException('Filtered User does not exist');
      searchUserId = isValid[0]['_id'];
    }

    const skip = (parseInt(pageNo) - 1) * parseInt(limit);

    const posts = await this.postService.getPostLists(
      user['_id'],
      +limit,
      +skip,
      searchComment,
      searchUserId as Types.ObjectId,
    );
    if (posts.length === 0) throw new NotFoundException('Posts does not exist');
    return responseHandler.success(
      httpStatus.OK,
      'Post Lists fetched Successfully',
      posts[0],
    );
  }

  @Get('/details/:id/')
  async getPostDetails(
    @Param() param: { id: string },
    @RequestUser() user: User,
    @Query() query: GetPostDetailsDto,
  ) {
    const postId = new Types.ObjectId(param.id);
    const { limit = '5', pageNo = '1' } = query;
    const startIndex = (+pageNo - 1) * +limit;
    const endIndex = limit;

    const comments = await this.postService.getPostDetailsId(
      postId,
      +startIndex,
      +limit,
      +endIndex,
      user['_id'],
    );

    if (comments.length === 0)
      throw new NotFoundException("Post does not exist or it's private");

    return responseHandler.success(
      httpStatus.OK,
      'comment fetched successfully',
      comments[0],
    );
  }
}

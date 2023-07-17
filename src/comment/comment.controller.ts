import {
  Controller,
  Injectable,
  Post,
  Body,
  UseGuards,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { RequestUser } from '../decorators/request.decorator';
import { User } from '../user/user.schema';
import * as httpStatus from 'http-status';
import { CommentService } from './comment.service';
import * as responseHandler from '../common/response';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { VerifyJwtGuard } from 'src/guard/verify-jwt.guard';
import { PostService } from '../post/post.service';

@Injectable()
@Controller('comment')
@UseGuards(VerifyJwtGuard)
export class CommentController {
  constructor(
    private commentService: CommentService,
    private postService: PostService,
  ) {}

  @Post('/')
  async create(@Body() comment: CreateCommentDto, @RequestUser() user: User) {
    const post = await this.postService.getPostById(comment.postId);
    if (!post) throw new NotFoundException('Post does not exist');

    if (post.postType === 'private' && !post.shareOnly.includes(user['_id']))
      throw new ForbiddenException('You do not have access to this post');

    const updateStatus = await this.commentService.create(
      {
        comment: comment.comment,
        mentions:
          comment.mentions === undefined
            ? []
            : comment.mentions.map((id) => new Types.ObjectId(id)),
        userId: user['_id'],
      },
      new Types.ObjectId(comment.postId),
    );

    return responseHandler.success(
      httpStatus.CREATED,
      'Comment Created Successfully',
      updateStatus,
    );
  }
}

import { IsString, IsArray, IsOptional } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  comment: string;

  @IsString()
  postId: string;

  @IsArray()
  @IsOptional()
  mentions: string[];
}

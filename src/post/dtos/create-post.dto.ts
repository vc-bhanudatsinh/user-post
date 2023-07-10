import { IsString, IsOptional, IsArray } from 'class-validator';

export class CreatePostDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsArray()
  @IsOptional()
  mentions: string[];

  @IsArray()
  @IsOptional()
  shareOnly: string[];

  @IsString()
  postType: string;
}

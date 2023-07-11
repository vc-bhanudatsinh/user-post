import { IsString, IsOptional } from 'class-validator';

export class GetPostListDto {
  @IsString()
  limit: string;

  @IsString()
  pageNo: string;

  @IsString()
  searchUserId: string;

  @IsString()
  @IsOptional()
  searchComment: string;
}

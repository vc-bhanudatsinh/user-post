import { IsString, IsOptional } from 'class-validator';

export class GetPostListDto {
  @IsString()
  @IsOptional()
  limit: string;

  @IsString()
  @IsOptional()
  pageNo: string;

  @IsString()
  @IsOptional()
  searchUserId: string;

  @IsString()
  @IsOptional()
  searchComment: string;
}

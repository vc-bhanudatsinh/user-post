import { IsString } from 'class-validator';

export class GetPostDetailsDto {
  @IsString()
  limit: string;

  @IsString()
  pageNo: string;
}

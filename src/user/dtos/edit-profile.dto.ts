import {
  IsEmail,
  IsOptional,
  IsString,
  MinLength,
  MaxLength,
  IsNumber,
  Min,
  Max,
} from 'class-validator';

export class EditProfileDto {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsNumber()
  @Min(10 ** 9, { message: 'Phone No should be of length 10' })
  @Max(10 ** 10 - 1, { message: 'Phone No should be of length 10' })
  @IsOptional()
  phoneNo: string;

  @IsString()
  @IsOptional()
  @MinLength(2, { message: 'Last Name can not  be have length less than 2' })
  @MaxLength(20, { message: 'Last Name can not have length more than 20 ' })
  username: string;

  @IsString()
  @IsOptional()
  @MinLength(2, { message: 'First Name can not  be have length less than 2' })
  @MaxLength(20, { message: 'First Name can not have length more than 20 ' })
  firstName: string;

  @IsString()
  @IsOptional()
  @MinLength(2, { message: 'Last Name can not  be have length less than 2' })
  @MaxLength(20, { message: 'Last Name can not have length more than 20 ' })
  lastName: string;
}

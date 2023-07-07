import {
  IsString,
  IsEmail,
  IsNumber,
  IsOptional,
  MaxLength,
  MinLength,
  Min,
  Max,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(2, { message: 'First Name can not  be have length less than 2' })
  @MaxLength(20, { message: 'First Name can not have length more than 20 ' })
  firstName: string;

  @IsString()
  @MinLength(2, { message: 'Last Name can not  be have length less than 2' })
  @MaxLength(20, { message: 'Last Name can not have length more than 20 ' })
  lastName: string;

  @IsString()
  @MinLength(8, { message: 'Password length should be minimun 8' })
  password: string;

  @IsNumber()
  @Min(10 ** 9, { message: 'Phone No should be of length 10' })
  @Max(10 ** 10 - 1, { message: 'Phone No should be of length 10' })
  @IsOptional()
  phoneNo: string;
}

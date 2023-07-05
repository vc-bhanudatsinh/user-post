import {
  IsString,
  IsEmail,
  IsNumber,
  IsOptional,
  MaxLength,
  MinLength,
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
  @MaxLength(10 ** 10, { message: 'Phone Number should be of 10 digit' })
  @MinLength(10 ** 10, { message: 'Phone Number should be of 10 digit' })
  @IsOptional()
  phoneNo: string;
}

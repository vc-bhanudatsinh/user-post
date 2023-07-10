import { IsString, IsEmail, MinLength } from 'class-validator';

export class LoginUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8, { message: 'Password length should be of minimun 8' })
  password: string;
}

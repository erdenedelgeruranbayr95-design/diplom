import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterParentDto {
  @IsString()
  @MinLength(2)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  @MinLength(6)
  password2: string;

  @IsEmail()
  childEmail: string;
}

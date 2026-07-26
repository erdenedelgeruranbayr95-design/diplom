import { IsEmail, IsIn, IsString, MinLength } from 'class-validator';
import { Role } from '@prisma/client';

export class CreateUserDto {
  @IsString()
  @MinLength(2)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsIn([Role.ADMIN, Role.THERAPIST])
  role: typeof Role.ADMIN | typeof Role.THERAPIST;
}

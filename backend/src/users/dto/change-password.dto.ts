import { IsString, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @IsString()
  currentPassword!: string;

  @IsString()
  @MinLength(6, { message: 'Шинэ нууц үг дор хаяж 6 тэмдэгт байх ёстой' })
  newPassword!: string;
}

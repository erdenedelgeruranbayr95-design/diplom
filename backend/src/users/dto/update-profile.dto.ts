import { IsHexColor, IsIn, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  @MinLength(2, { message: 'Нэр дор хаяж 2 тэмдэгт байх ёстой' })
  name?: string;

  @IsOptional()
  @IsHexColor({ message: 'Өнгө нь HEX хэлбэртэй байх ёстой' })
  avatarColor?: string;

  /* ЭМЗЭГ эрүүл мэндийн мэдээлэл — заавал биш, хоосон мөр илгээвэл цэвэрлэнэ (§14). */
  @IsOptional()
  @IsIn(['', 'deaf', 'hoh', 'hearing'], { message: 'Сонсголын байдал буруу утгатай' })
  hearingProfile?: string;
}

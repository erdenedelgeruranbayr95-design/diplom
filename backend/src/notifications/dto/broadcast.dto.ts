import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class BroadcastDto {
  @IsString()
  @MinLength(3, { message: 'Зарлалын текст дор хаяж 3 тэмдэгт байх ёстой' })
  @MaxLength(500)
  text!: string;

  @IsOptional()
  @IsString()
  @MaxLength(8)
  icon?: string;
}

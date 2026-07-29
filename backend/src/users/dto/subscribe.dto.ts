import { IsOptional, IsString, MinLength } from 'class-validator';

export class SubscribeDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  plan?: string;
}

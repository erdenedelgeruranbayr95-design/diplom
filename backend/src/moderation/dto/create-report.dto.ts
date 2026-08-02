import { IsIn, IsString, MinLength } from 'class-validator';

export class CreateReportDto {
  @IsIn(['song', 'user'])
  targetType: 'song' | 'user';

  @IsString()
  @MinLength(1)
  targetId: string;

  @IsString()
  @MinLength(3)
  reason: string;
}

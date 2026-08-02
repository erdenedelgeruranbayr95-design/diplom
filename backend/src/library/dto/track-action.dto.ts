import { IsIn, IsString, MinLength } from 'class-validator';

export class TrackActionDto {
  @IsString()
  @MinLength(1)
  songId: string;

  @IsIn(['LIKE', 'SAVE'])
  action: 'LIKE' | 'SAVE';
}

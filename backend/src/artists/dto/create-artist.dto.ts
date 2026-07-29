import { IsOptional, IsString, IsUrl, MinLength } from 'class-validator';

export class CreateArtistDto {
  @IsString()
  @MinLength(1)
  name: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsString()
  careerInfo?: string;

  @IsOptional()
  @IsUrl()
  photoUrl?: string;
}

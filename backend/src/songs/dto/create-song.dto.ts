import { IsBoolean, IsInt, IsOptional, IsString, IsUrl, Max, Min, MinLength } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateSongDto {
  @IsString()
  @MinLength(1)
  title: string;

  @IsOptional()
  @IsString()
  artist?: string;

  /* Артист каталог (Artist model)-той холбох — сонголтоор, өгөгдөөгүй бол Song.artist
     чөлөөт текст хэвээр ажиллана (backward-compatible). */
  @IsOptional()
  @IsString()
  artistId?: string;

  @IsOptional()
  @IsString()
  genre?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1900)
  @Max(2100)
  releaseYear?: number;

  @IsOptional()
  @IsUrl()
  coverUrl?: string;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  featured?: boolean;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  duration?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  bpm?: number;

  /* Файл upload-ын оронд алсын URL-аар дуу нэмэх (PRO хэрэглэгч) — file-тай хамт биш,
     аль нэг нь заавал байх ёстойг controller дотор шалгана. */
  @IsOptional()
  @IsUrl()
  sourceUrl?: string;
}

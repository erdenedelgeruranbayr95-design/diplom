import { IsBoolean, IsEnum, IsInt, IsOptional, IsString, IsUrl, Max, Min, MinLength, ValidateIf } from 'class-validator';
import { Type } from 'class-transformer';
import { SongLicense } from '@prisma/client';

/* Curator/uploader мета засах — бүгд optional (PATCH-style семантик, гэхдээ
   роадмапын шаардлагаар PUT route дор ажиллана). */
export class UpdateSongDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  title?: string;

  @IsOptional()
  @IsString()
  artist?: string;

  @IsOptional()
  @IsString()
  artistId?: string;

  @IsOptional()
  @IsString()
  genre?: string;

  @IsOptional()
  @IsString()
  description?: string;

  // Уг үг — LRC-төстэй `[mm:ss.xx] мөр` эсвэл цаг тэмдэглэгээгүй чөлөөт текст (заавал биш).
  @IsOptional()
  @IsString()
  lyrics?: string;

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
  @IsEnum(SongLicense)
  license?: SongLicense;

  @ValidateIf((o) => o.license === SongLicense.LICENSED)
  @IsString()
  @MinLength(1)
  licenseSrc?: string;
}

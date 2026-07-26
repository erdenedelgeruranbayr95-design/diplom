import { IsInt, IsOptional, IsString, IsUrl, Min, MinLength } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateSongDto {
  @IsString()
  @MinLength(1)
  title: string;

  @IsOptional()
  @IsString()
  artist?: string;

  @IsOptional()
  @IsString()
  genre?: string;

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

import { IsBoolean, IsEnum, IsInt, IsOptional, IsString, IsUrl, Max, Min, MinLength, ValidateIf } from 'class-validator';
import { Type } from 'class-transformer';
import { SongLicense } from '@prisma/client';

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

  /* Presigned upload-аар байршуулсан КОВЕР ЗУРГИЙН key (`kind: 'cover'`).
     `coverUrl`-ийн оронд ирнэ — backend өөрөө нийтийн URL болгож хөрвүүлнэ.
     Клиент URL-ээ угсрахыг хүлээхгүй нь чухал: bucket/эндпойнт өөрчлөгдвөл
     зөвхөн backend мэдэх ёстой. */
  @IsOptional()
  @IsString()
  coverKey?: string;

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

  /* MinIO-д аль хэдийн байршуулсан (presigned upload) файлын key — presigned урсгалаар
     upload хийсэн үед `file`/`sourceUrl`-ийн оронд ирнэ (см. songs.controller.ts). */
  @IsOptional()
  @IsString()
  storageKey?: string;

  // Лиценз ЗААВАЛ (см. ROADMAP-7-PHASES.md Үе шат 5 DoD): "Лицензгүй дуу upload хийгдэхгүй".
  @IsEnum(SongLicense)
  license: SongLicense;

  // LICENSED (гэрээт/тусдаа лиценз) сонговол эх сурвалж/гэрээний тайлбар заавал.
  @ValidateIf((o) => o.license === SongLicense.LICENSED)
  @IsString()
  @MinLength(1)
  licenseSrc?: string;
}

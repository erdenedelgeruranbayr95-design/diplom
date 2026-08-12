import { Type } from 'class-transformer';
import { ArrayMaxSize, IsArray, IsInt, IsOptional, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';

export class UpsertAlbumDto {
  @IsString()
  @MinLength(1, { message: 'Цомгийн нэрээ оруулна уу' })
  @MaxLength(120)
  title: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  coverUrl?: string;

  /* Presigned upload-аар байршуулсан ковер зургийн key (`kind: 'cover'`).
     Өгөгдвөл `coverUrl`-ийг ДАРНА — нийтийн URL-ыг backend угсарна. */
  @IsOptional()
  @IsString()
  @MaxLength(300)
  coverKey?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1900)
  @Max(2100)
  year?: number;
}

export class SetAlbumSongsDto {
  /** Дуунуудын id — МАССИВЫН ДАРААЛАЛ нь цомог доторх дараалал болно.
   *  Уран бүтээлч чирж өөрчлөхөд шинэ дараалал бүхэлдээ илгээгдэнэ. */
  @IsArray()
  @ArrayMaxSize(200, { message: 'Нэг цомогт 200 хүртэл дуу байж болно' })
  @IsString({ each: true })
  songIds: string[];
}

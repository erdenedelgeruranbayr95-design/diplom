import { IsBoolean, IsInt, IsOptional, IsString, Min, MinLength } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateHistoryDto {
  @IsString()
  @MinLength(1)
  songId: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  durationMs?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  bpm?: number;

  @IsOptional()
  @IsString()
  visualizerStyle?: string;

  /* Тухайн сонсголд чичиргээ асаалттай байсан эсэх.

     `GET /me/stats`-ийн `vib` тоолуур нь `listenHistory.count({ vibrations: true })`
     -ээр бодогддог (library.service.ts). Энэ талбар schema-д эхнээсээ байсан ч
     DTO-д ороогүй байсан тул клиент тал ХЭЗЭЭ Ч тохируулж чадахгүй, улмаас
     "чичиргээ" хэмжүүр үүрд 0 харагддаг байв. Энэ бол уг төслийн гол хэмжүүр
     (сонсголгүй хэрэглэгч хэдэн удаа хөгжмийг мэдэрсэн) тул нээв. */
  @IsOptional()
  @IsBoolean()
  vibrations?: boolean;
}

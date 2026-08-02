import { IsArray, IsIn, IsNumber, IsOptional, IsString, MinLength } from 'class-validator';

/* Python worker дуусахад (эсвэл алдаа гарахад) дуудах webhook — HAPTIC_CALLBACK_SECRET
   header-ээр баталгаажина (JWT биш, worker нь хэрэглэгчийн session-гүй серверийн
   дотоод үйлчилгээ тул тусдаа энгийн shared-secret хамгаалалт хангалттай). */
export class HapticCallbackDto {
  @IsString()
  @MinLength(1)
  songId: string;

  @IsIn(['READY', 'FAILED'])
  status: 'READY' | 'FAILED';

  @IsOptional()
  @IsString()
  scoreUrl?: string;

  @IsOptional()
  @IsNumber()
  bpm?: number;

  @IsOptional()
  @IsString()
  musicalKey?: string;

  /** Секундээр — frontend-ийн BeatScheduler (timestamp-driven, <40мс latency замд) шууд ашиглана. */
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  beatTimestamps?: number[];

  @IsOptional()
  @IsString()
  error?: string;

  // ---- HLS/AAC хөрвүүлэлт + ковер боловсруулалт (заавал биш баяжуулалт) ----
  @IsOptional()
  @IsString()
  hlsUrl?: string;

  @IsOptional()
  @IsString()
  coverThumbUrl?: string;

  @IsOptional()
  @IsString()
  coverMediumUrl?: string;

  @IsOptional()
  @IsString()
  coverLargeUrl?: string;
}

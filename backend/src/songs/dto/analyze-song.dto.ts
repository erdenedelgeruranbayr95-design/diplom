import { IsArray, IsInt, IsNumber, IsOptional, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class AnalyzeSongDto {
  /* Дууны бүтэн урт (секунд). Browser-ийн decodeAudioData() өгсөн AudioBuffer.duration-аас
     гаралтай тул upload хийсэн дуу бүр анализын алхмаараа duration-аа автоматаар авна —
     хэрэглэгч гараар оруулах шаардлагагүй. (Max 6 цаг — хэт том утгаас хамгаална.) */
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(21600)
  duration?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(400)
  bpm?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  beatCount?: number;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  beatTimestamps?: number[];

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(1)
  rms?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(1)
  peak?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(1)
  bassEnergy?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(1)
  midEnergy?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(1)
  trebleEnergy?: number;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  waveformPeaks?: number[];

  /* 8 логарифм бүсийн энерги [0..1] — Python worker-ийн Haptic Score-той (BAND_EDGES_HZ)
     зах тохирсон, `analyze.ts`-ийн computeBandEnergies8() гаралт. */
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  bandEnergies?: number[];
}

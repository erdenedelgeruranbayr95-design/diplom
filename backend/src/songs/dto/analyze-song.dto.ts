import { IsArray, IsInt, IsNumber, IsOptional, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class AnalyzeSongDto {
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
}

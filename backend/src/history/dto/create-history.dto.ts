import { IsInt, IsOptional, IsString, Min, MinLength } from 'class-validator';
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
}

import { IsInt, IsOptional, IsString, Max, Min, MinLength } from 'class-validator';
import { Type } from 'class-transformer';

export class JamendoSearchDto {
  @IsString()
  @MinLength(1)
  q: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(30)
  limit?: number;
}

export class JamendoImportDto {
  @IsString()
  @MinLength(1)
  jamendoId: string;
}

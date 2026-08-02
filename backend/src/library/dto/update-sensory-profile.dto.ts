import { IsBoolean, IsInt, IsObject, IsOptional, Max, Min } from 'class-validator';

export class UpdateSensoryProfileDto {
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(2)
  vibLevel?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(2)
  lightLevel?: number;

  @IsOptional()
  @IsObject()
  bands?: Record<string, boolean>;

  @IsOptional()
  @IsObject()
  deviceMap?: Record<string, string>;

  @IsOptional()
  @IsBoolean()
  calibrated?: boolean;
}

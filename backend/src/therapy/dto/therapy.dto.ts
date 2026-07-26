import { IsDateString, IsIn, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { SessionStatus } from '@prisma/client';

export class CreateTherapySessionDto {
  @IsString()
  userId: string;

  @IsOptional()
  @IsString()
  songId?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsDateString()
  scheduledAt?: string;
}

export class UpdateTherapySessionDto {
  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsIn([SessionStatus.SCHEDULED, SessionStatus.IN_PROGRESS, SessionStatus.COMPLETED, SessionStatus.CANCELLED])
  status?: SessionStatus;

  @IsOptional()
  @IsDateString()
  scheduledAt?: string;

  @IsOptional()
  @IsDateString()
  completedAt?: string;
}

export class CreateProgressDto {
  @IsString()
  userId: string;

  @IsOptional()
  @IsString()
  therapySessionId?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100)
  completionPct?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100)
  engagementScore?: number;
}

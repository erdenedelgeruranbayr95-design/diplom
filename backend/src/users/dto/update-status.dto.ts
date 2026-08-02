import { IsIn } from 'class-validator';
import { UserStatus } from '@prisma/client';

export class UpdateStatusDto {
  @IsIn([UserStatus.ACTIVE, UserStatus.BANNED])
  status: UserStatus;
}

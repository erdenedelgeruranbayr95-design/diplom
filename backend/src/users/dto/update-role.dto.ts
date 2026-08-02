import { IsIn } from 'class-validator';
import { Role } from '@prisma/client';

const ASSIGNABLE_ROLES = [Role.ADMIN, Role.CURATOR, Role.MODERATOR, Role.THERAPIST, Role.USER, Role.PARENT];

export class UpdateRoleDto {
  @IsIn(ASSIGNABLE_ROLES)
  role: Role;
}

import { IsString } from 'class-validator';

export class CreateTherapistAssignmentDto {
  @IsString()
  therapistId: string;

  @IsString()
  userId: string;
}

export class CreateParentLinkDto {
  @IsString()
  parentId: string;

  @IsString()
  childUserId: string;
}

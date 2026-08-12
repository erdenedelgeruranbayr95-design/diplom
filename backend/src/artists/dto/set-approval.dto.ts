import { IsBoolean } from 'class-validator';

export class SetApprovalDto {
  /** `true` = баталгаажуулах, `false` = буцаах (эрхийг нь хаах). */
  @IsBoolean()
  approved: boolean;
}

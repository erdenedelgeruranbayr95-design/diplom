import { IsIn } from 'class-validator';
import { ReportStatus } from '@prisma/client';

export class ResolveReportDto {
  @IsIn([ReportStatus.RESOLVED, ReportStatus.DISMISSED])
  status: typeof ReportStatus.RESOLVED | typeof ReportStatus.DISMISSED;
}

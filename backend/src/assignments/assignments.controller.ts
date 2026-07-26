import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Role } from '@prisma/client';
import { AssignmentsService } from './assignments.service';
import { CreateTherapistAssignmentDto, CreateParentLinkDto } from './dto/create-assignment.dto';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import type { AuthUser } from '../common/decorators/current-user.decorator';

@Controller('assignments')
@UseGuards(RolesGuard)
@Roles(Role.ADMIN)
export class AssignmentsController {
  constructor(private assignments: AssignmentsService) {}

  /* Method-level @Roles нь getAllAndOverride-ээр class-level ADMIN-only-г хучиж THERAPIST/PARENT-д нээнэ. */
  @Roles(Role.THERAPIST)
  @Get('my-patients')
  listMyPatients(@CurrentUser() user: AuthUser) {
    return this.assignments.listMyPatients(user.userId);
  }

  @Roles(Role.PARENT)
  @Get('my-children')
  listMyChildren(@CurrentUser() user: AuthUser) {
    return this.assignments.listMyChildren(user.userId);
  }

  @Post('therapists')
  createTherapistAssignment(@Body() dto: CreateTherapistAssignmentDto) {
    return this.assignments.createTherapistAssignment(dto.therapistId, dto.userId);
  }

  @Get('therapists')
  listTherapistAssignments() {
    return this.assignments.listTherapistAssignments();
  }

  @Delete('therapists/:id')
  removeTherapistAssignment(@Param('id') id: string) {
    return this.assignments.removeTherapistAssignment(id);
  }

  @Post('parents')
  createParentLink(@Body() dto: CreateParentLinkDto) {
    return this.assignments.createParentLink(dto.parentId, dto.childUserId);
  }

  @Get('parents')
  listParentLinks() {
    return this.assignments.listParentLinks();
  }

  @Delete('parents/:id')
  removeParentLink(@Param('id') id: string) {
    return this.assignments.removeParentLink(id);
  }
}

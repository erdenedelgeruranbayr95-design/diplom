import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { HistoryService } from './history.service';
import { CreateHistoryDto } from './dto/create-history.dto';
import { ListHistoryDto } from './dto/list-history.dto';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import type { AuthUser } from '../common/decorators/current-user.decorator';

@Controller('history')
export class HistoryController {
  constructor(private history: HistoryService) {}

  @Post()
  log(@Body() dto: CreateHistoryDto, @CurrentUser() user: AuthUser) {
    return this.history.log(user.userId, dto);
  }

  @Get()
  list(@Query() q: ListHistoryDto, @CurrentUser() user: AuthUser) {
    return this.history.list(user.userId, q);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: AuthUser) {
    return this.history.remove(id, user.userId, user.role);
  }
}

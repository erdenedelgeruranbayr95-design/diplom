import { BadRequestException, Body, Controller, Delete, Get, Param, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Role } from '@prisma/client';
import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create-song.dto';
import { AnalyzeSongDto } from './dto/analyze-song.dto';
import { songMulterOptions } from './multer.config';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import type { AuthUser } from '../common/decorators/current-user.decorator';
import { Public } from '../common/decorators/public.decorator';

@Controller('songs')
export class SongsController {
  constructor(private songs: SongsService) {}

  @UseGuards(RolesGuard)
  @Roles(Role.USER, Role.ADMIN)
  @Post()
  @UseInterceptors(FileInterceptor('file', songMulterOptions))
  upload(@UploadedFile() file: Express.Multer.File | undefined, @Body() dto: CreateSongDto, @CurrentUser() user: AuthUser) {
    if (!file && !dto.sourceUrl) {
      throw new BadRequestException('Дууны файл эсвэл холбоос (URL) заавал шаардлагатай');
    }
    return this.songs.create({
      title: dto.title,
      artist: dto.artist,
      genre: dto.genre,
      duration: dto.duration,
      bpm: dto.bpm,
      fileUrl: file ? '/uploads/' + file.filename : dto.sourceUrl!,
      uploadedBy: user.userId,
    });
  }

  @Get()
  list() {
    return this.songs.list();
  }

  /* QR-аар дуу нээхэд гар утас (нэвтрээгүй) энэ endpoint-ыг дуудна. */
  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.songs.findOne(id);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.USER, Role.ADMIN)
  @Post(':id/analyze')
  analyze(@Param('id') id: string, @Body() dto: AnalyzeSongDto, @CurrentUser() user: AuthUser) {
    return this.songs.saveAnalysis(id, dto, user.userId, user.role);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: AuthUser) {
    return this.songs.remove(id, user.userId, user.role);
  }
}

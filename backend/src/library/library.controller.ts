import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { LibraryService } from './library.service';
import { UpdateSensoryProfileDto } from './dto/update-sensory-profile.dto';
import { TrackActionDto } from './dto/track-action.dto';
import { CreatePlaylistDto, RenamePlaylistDto, AddPlaylistTrackDto } from './dto/playlist.dto';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import type { AuthUser } from '../common/decorators/current-user.decorator';

@Controller()
export class LibraryController {
  constructor(private library: LibraryService) {}

  /* ---------- Мэдрэхүйн тохиргоо ---------- */

  @Get('me/sensory-profile')
  getSensoryProfile(@CurrentUser() user: AuthUser) {
    return this.library.getSensoryProfile(user.userId);
  }

  @Put('me/sensory-profile')
  putSensoryProfile(@CurrentUser() user: AuthUser, @Body() dto: UpdateSensoryProfileDto) {
    return this.library.upsertSensoryProfile(user.userId, dto);
  }

  /* ---------- Дуртай / хадгалсан ---------- */

  @Get('me/library')
  getLibrary(@CurrentUser() user: AuthUser) {
    return this.library.getLibrary(user.userId);
  }

  @Post('me/actions')
  addAction(@CurrentUser() user: AuthUser, @Body() dto: TrackActionDto) {
    return this.library.addAction(user.userId, dto);
  }

  @Delete('me/actions')
  removeAction(@CurrentUser() user: AuthUser, @Query('songId') songId: string, @Query('action') action: 'LIKE' | 'SAVE') {
    return this.library.removeAction(user.userId, songId, action);
  }

  /* ---------- Статистик ---------- */

  @Get('me/stats')
  getStats(@CurrentUser() user: AuthUser) {
    return this.library.getStats(user.userId);
  }

  /* ---------- Төлбөр ---------- */

  @Get('me/payments')
  getPayments(@CurrentUser() user: AuthUser) {
    return this.library.getPayments(user.userId);
  }

  /* ---------- Playlist ---------- */

  @Get('playlists')
  listPlaylists(@CurrentUser() user: AuthUser) {
    return this.library.listPlaylists(user.userId);
  }

  @Post('playlists')
  createPlaylist(@CurrentUser() user: AuthUser, @Body() dto: CreatePlaylistDto) {
    return this.library.createPlaylist(user.userId, dto);
  }

  @Patch('playlists/:id')
  renamePlaylist(@CurrentUser() user: AuthUser, @Param('id') id: string, @Body() dto: RenamePlaylistDto) {
    return this.library.renamePlaylist(user.userId, id, dto);
  }

  @Delete('playlists/:id')
  deletePlaylist(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.library.deletePlaylist(user.userId, id);
  }

  @Post('playlists/:id/tracks')
  addTrack(@CurrentUser() user: AuthUser, @Param('id') id: string, @Body() dto: AddPlaylistTrackDto) {
    return this.library.addTrack(user.userId, id, dto);
  }

  @Delete('playlists/:id/tracks/:songId')
  removeTrack(@CurrentUser() user: AuthUser, @Param('id') id: string, @Param('songId') songId: string) {
    return this.library.removeTrack(user.userId, id, songId);
  }
}

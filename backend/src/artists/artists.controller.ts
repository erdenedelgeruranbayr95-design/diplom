import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { Role } from '@prisma/client';
import { ArtistsService } from './artists.service';
import { AlbumsService } from './albums.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpsertMyArtistDto } from './dto/upsert-my-artist.dto';
import { SetAlbumSongsDto, UpsertAlbumDto } from './dto/upsert-album.dto';
import { SetApprovalDto } from './dto/set-approval.dto';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { Public } from '../common/decorators/public.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import type { AuthUser } from '../common/decorators/current-user.decorator';

@Controller('artists')
export class ArtistsController {
  constructor(
    private artists: ArtistsService,
    private albums: AlbumsService,
  ) {}

  /* ADMIN дуучны бүртгэл нэмнэ — SongLibraryPanel-ийн дуу нэмэх урсгалтай адил зарчим. */
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Post()
  create(@Body() dto: CreateArtistDto) {
    return this.artists.create(dto);
  }

  /* ---- Хэрэглэгчийн ӨӨРИЙН профайл ----

     ⚠️ Эдгээр нь `:id` замуудаас ӨМНӨ бичигдсэн байх ЁСТОЙ. Nest маршрутыг
     дарааллаар нь тааруулдаг тул `@Get(':id')` дээр байвал "me" гэдгийг
     дуучны id гэж үзээд 404 буцаана.

     Дүрийн хамгаалалтгүй: нэвтэрсэн ХЭН Ч уран бүтээлч болж болно. Хяналт нь
     дуу дээр — тэдгээр ноорог үүсч, куратор/админ нийтэлнэ. */
  @Get('me')
  mine(@CurrentUser() user: AuthUser) {
    return this.artists.findMine(user.userId);
  }

  @Put('me')
  upsertMine(@CurrentUser() user: AuthUser, @Body() dto: UpsertMyArtistDto) {
    return this.artists.upsertMine(user.userId, dto);
  }

  /** Өөрийн дуунууд — ноорог хамт (хүлээгдэж буйг нь харуулахын тулд). */
  @Get('me/songs')
  mySongs(@CurrentUser() user: AuthUser) {
    return this.artists.mySongs(user.userId);
  }

  /* ---- Цомог (зөвхөн баталгаажсан уран бүтээлч) ---- */

  @Get('me/albums')
  myAlbums(@CurrentUser() user: AuthUser) {
    return this.albums.listMine(user.userId);
  }

  @Post('me/albums')
  createAlbum(@CurrentUser() user: AuthUser, @Body() dto: UpsertAlbumDto) {
    return this.albums.create(user.userId, dto);
  }

  @Put('me/albums/:id')
  updateAlbum(@CurrentUser() user: AuthUser, @Param('id') id: string, @Body() dto: UpsertAlbumDto) {
    return this.albums.update(user.userId, id, dto);
  }

  @Delete('me/albums/:id')
  deleteAlbum(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.albums.remove(user.userId, id);
  }

  /** Цомгийн дуу ба ДАРААЛЛЫГ бүхэлд нь оноох — чирч өөрчлөхөд энэ дуудагдана. */
  @Put('me/albums/:id/songs')
  setAlbumSongs(@CurrentUser() user: AuthUser, @Param('id') id: string, @Body() dto: SetAlbumSongsDto) {
    return this.albums.setSongs(user.userId, id, dto.songIds);
  }

  /* ---- Админы баталгаажуулалт ---- */

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Get('admin/pending')
  pending() {
    return this.artists.pending();
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Post(':id/approval')
  setApproval(@Param('id') id: string, @Body() dto: SetApprovalDto) {
    return this.artists.setApproval(id, dto.approved);
  }

  @Public()
  @Get()
  list() {
    return this.artists.list();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.artists.findOne(id);
  }

  @Public()
  @Get(':id/songs')
  songs(@Param('id') id: string) {
    return this.artists.songs(id);
  }
}

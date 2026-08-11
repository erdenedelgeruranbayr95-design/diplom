import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { Role } from '@prisma/client';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpsertMyArtistDto } from './dto/upsert-my-artist.dto';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { Public } from '../common/decorators/public.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import type { AuthUser } from '../common/decorators/current-user.decorator';

@Controller('artists')
export class ArtistsController {
  constructor(private artists: ArtistsService) {}

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

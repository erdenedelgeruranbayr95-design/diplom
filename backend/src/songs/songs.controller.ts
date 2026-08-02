import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { Role } from '@prisma/client';
import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { AnalyzeSongDto } from './dto/analyze-song.dto';
import { RequestUploadUrlDto } from './dto/request-upload-url.dto';
import { JamendoSearchDto, JamendoImportDto } from './dto/jamendo-search.dto';
import { JamendoService } from './jamendo.service';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import type { AuthUser } from '../common/decorators/current-user.decorator';
import { Public } from '../common/decorators/public.decorator';
import { HapticService } from '../haptic/haptic.service';
import { HapticCallbackDto } from '../haptic/dto/haptic-callback.dto';
import { HapticCallbackGuard } from '../haptic/haptic-callback.guard';
import { StorageService } from '../storage/storage.service';

const CATALOG_ROLES: Role[] = [Role.CURATOR, Role.MODERATOR, Role.ADMIN];

@Controller('songs')
export class SongsController {
  constructor(
    private songs: SongsService,
    private haptic: HapticService,
    private storage: StorageService,
    private jamendo: JamendoService,
  ) {}

  /* ---------- Presigned S3 upload (MinIO) ---------- */
  /* Клиент эхлээд энэ endpoint-ыг дуудаж, буцаж ирсэн `uploadUrl` руу файлаа шууд
     PUT хийнэ (backend дундуур том аудио байт дамжихгүй) — дараа нь POST /songs дуудаж
     `storageKey`-г дамжуулснаар Song мөр үүснэ (см. CreateSongDto.storageKey). */
  @UseGuards(RolesGuard)
  @Roles(Role.USER, Role.ADMIN, ...CATALOG_ROLES)
  @Post('upload-url')
  async requestUploadUrl(@Body() dto: RequestUploadUrlDto) {
    const key = this.storage.buildKey('songs', dto.filename);
    const uploadUrl = await this.storage.getPresignedUploadUrl(key, dto.contentType);
    return { uploadUrl, key, publicUrl: this.storage.publicUrlFor(key) };
  }

  /* Файл нь ЗААВАЛ эхлээд presigned URL-аар MinIO руу очсон байх ёстой (storageKey),
     эсвэл гадаад холбоос (sourceUrl) — backend дундуур multipart байтаар дамжуулах
     (multer/локал диск) зам ЭНД БАЙХГҮЙ (Үе шат 5 DoD: "Файл S3-д, DB-д зөвхөн URL"). */
  @UseGuards(RolesGuard)
  @Roles(Role.USER, Role.ADMIN, ...CATALOG_ROLES)
  @Post()
  async upload(@Body() dto: CreateSongDto, @CurrentUser() user: AuthUser) {
    if (!dto.sourceUrl && !dto.storageKey) {
      throw new BadRequestException('Дууны холбоос (URL) эсвэл storageKey (presigned upload) заавал шаардлагатай');
    }

    const fileUrl = dto.storageKey ? this.storage.publicUrlFor(dto.storageKey) : dto.sourceUrl!;

    const isCatalogStaff = CATALOG_ROLES.includes(user.role) || user.role === Role.ROOT;
    const song = await this.songs.create({
      title: dto.title,
      artist: dto.artist,
      artistId: dto.artistId,
      genre: dto.genre,
      description: dto.description,
      releaseYear: dto.releaseYear,
      coverUrl: dto.coverUrl,
      featured: dto.featured,
      duration: dto.duration,
      bpm: dto.bpm,
      fileUrl,
      uploadedBy: user.userId,
      license: dto.license,
      licenseSrc: dto.licenseSrc,
      /* Curator/Admin/Root өөрсдөө upload хийвэл шууд нийтэлнэ; энгийн хэрэглэгчийн
         upload ноороглогдож (published=false), дараа нь Curator publish хийнэ. */
      published: isCatalogStaff,
    });

    /* MinIO-д байгаа файл л Haptic Score тооцоолуулна — гадаад URL (sourceUrl)-ийг worker
       уншиж чадахгүй байж болзошгүй тул одоохондоо алгасна. */
    if (dto.storageKey) {
      this.haptic.enqueueAnalysis(song.id, fileUrl, dto.coverUrl).catch(() => {});
    }
    return song;
  }

  @Public()
  @Get()
  list() {
    return this.songs.list();
  }

  /* Curator/Admin/Root — ноорог (нийтлэгдээгүй) дуу хамт харах каталог. */
  @UseGuards(RolesGuard)
  @Roles(...CATALOG_ROLES)
  @Get('catalog')
  catalog() {
    return this.songs.catalog();
  }

  /* ---------- Jamendo каталог импорт (Creative Commons лицензтэй л) ---------- */

  @UseGuards(RolesGuard)
  @Roles(...CATALOG_ROLES)
  @Get('jamendo/search')
  jamendoSearch(@Query() q: JamendoSearchDto) {
    return this.jamendo.search(q.q, q.limit);
  }

  @UseGuards(RolesGuard)
  @Roles(...CATALOG_ROLES)
  @Post('jamendo/import')
  jamendoImport(@Body() dto: JamendoImportDto, @CurrentUser() user: AuthUser) {
    return this.jamendo.importTrack(dto.jamendoId, user.userId);
  }

  /* Нүүр хуудасны "Хамгийн алдартай / Сүүлийн үеийн / Онцлох" — специфик endpoint-ууд,
     жагсаалт бүр өөр эрэмбэ/шүүлттэй тул list()-ээс тусад нь. Query param биш тусдаа
     route болгосон нь frontend талд кэшлэхэд/тодорхойд илүү энгийн. */
  @Public()
  @Get('featured')
  featured() {
    return this.songs.featured();
  }

  @Public()
  @Get('recent')
  recent() {
    return this.songs.recent();
  }

  @Public()
  @Get('popular')
  popular() {
    return this.songs.popular();
  }

  /* QR-аар дуу нээхэд гар утас (нэвтрээгүй) энэ endpoint-ыг дуудна. */
  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.songs.findOne(id);
  }

  @Public()
  @Get(':id/more-by-artist')
  moreByArtist(@Param('id') id: string) {
    return this.songs.moreByArtist(id);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.USER, Role.ADMIN)
  @Post(':id/analyze')
  analyze(@Param('id') id: string, @Body() dto: AnalyzeSongDto, @CurrentUser() user: AuthUser) {
    return this.songs.saveAnalysis(id, dto, user.userId, user.role);
  }

  /* ---------- Мета засах, лиценз, нийтлэл (Үе шат 5) ---------- */

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateSongDto, @CurrentUser() user: AuthUser) {
    return this.songs.update(id, dto, user.userId, user.role);
  }

  @Post(':id/publish')
  publish(@Param('id') id: string, @CurrentUser() user: AuthUser) {
    return this.songs.publish(id, user.userId, user.role);
  }

  @Post(':id/unpublish')
  unpublish(@Param('id') id: string, @CurrentUser() user: AuthUser) {
    return this.songs.unpublish(id, user.userId, user.role);
  }

  /* ---------- Haptic Score (Python worker, librosa) ---------- */

  @Public()
  @Get(':id/analysis-status')
  analysisStatus(@Param('id') id: string) {
    return this.haptic.getAnalysisStatus(id);
  }

  @Public()
  @Get(':id/score')
  score(@Param('id') id: string) {
    return this.haptic.getScore(id);
  }

  /* Worker → backend callback (JWT-гүй, shared-secret хамгаалалттай, HapticCallbackGuard). */
  @Public()
  @UseGuards(HapticCallbackGuard)
  @Post('haptic-callback')
  hapticCallback(@Body() dto: HapticCallbackDto) {
    return this.haptic.handleCallback(dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @CurrentUser() user: AuthUser) {
    const result = await this.songs.remove(id, user.userId, user.role);
    const key = this.storage.keyFromUrl(result.fileUrl);
    if (key) this.storage.delete(key).catch(() => {});
    if (result.coverUrl) {
      const coverKey = this.storage.keyFromUrl(result.coverUrl);
      if (coverKey) this.storage.delete(coverKey).catch(() => {});
    }
    return { ok: true };
  }
}

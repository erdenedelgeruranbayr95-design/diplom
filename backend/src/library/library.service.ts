import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateSensoryProfileDto } from './dto/update-sensory-profile.dto';
import { TrackActionDto } from './dto/track-action.dto';
import { CreatePlaylistDto, RenamePlaylistDto, AddPlaylistTrackDto } from './dto/playlist.dto';

const DEFAULT_BANDS = { bass: true, mid: true, high: true };

@Injectable()
export class LibraryService {
  constructor(private prisma: PrismaService) {}

  /* ---------- Мэдрэхүйн тохиргоо (калибровк) ---------- */

  async getSensoryProfile(userId: string) {
    const profile = await this.prisma.sensoryProfile.findUnique({ where: { userId } });
    if (!profile) return { vibLevel: 1, lightLevel: 1, bands: DEFAULT_BANDS, deviceMap: null, calibrated: false };
    return profile;
  }

  async upsertSensoryProfile(userId: string, dto: UpdateSensoryProfileDto) {
    return this.prisma.sensoryProfile.upsert({
      where: { userId },
      create: {
        userId,
        vibLevel: dto.vibLevel ?? 1,
        lightLevel: dto.lightLevel ?? 1,
        bands: dto.bands ?? DEFAULT_BANDS,
        deviceMap: dto.deviceMap,
        calibrated: dto.calibrated ?? false,
      },
      update: {
        ...(dto.vibLevel !== undefined ? { vibLevel: dto.vibLevel } : {}),
        ...(dto.lightLevel !== undefined ? { lightLevel: dto.lightLevel } : {}),
        ...(dto.bands !== undefined ? { bands: dto.bands } : {}),
        ...(dto.deviceMap !== undefined ? { deviceMap: dto.deviceMap } : {}),
        ...(dto.calibrated !== undefined ? { calibrated: dto.calibrated } : {}),
      },
    });
  }

  /* ---------- Дуртай / хадгалсан дуу ---------- */

  async getLibrary(userId: string) {
    const actions = await this.prisma.userTrackAction.findMany({ where: { userId } });
    return {
      likedIds: actions.filter((a) => a.action === 'LIKE').map((a) => a.songId),
      savedIds: actions.filter((a) => a.action === 'SAVE').map((a) => a.songId),
    };
  }

  async addAction(userId: string, dto: TrackActionDto) {
    await this.prisma.song.findUniqueOrThrow({ where: { id: dto.songId } }).catch(() => {
      throw new NotFoundException('Дуу олдсонгүй');
    });
    await this.prisma.userTrackAction.upsert({
      where: { userId_songId_action: { userId, songId: dto.songId, action: dto.action } },
      create: { userId, songId: dto.songId, action: dto.action },
      update: {},
    });
    return { ok: true };
  }

  async removeAction(userId: string, songId: string, action: 'LIKE' | 'SAVE') {
    await this.prisma.userTrackAction
      .delete({ where: { userId_songId_action: { userId, songId, action } } })
      .catch(() => {});
    return { ok: true };
  }

  /* ---------- Сонсолтын статистик ---------- */

  /* `total` · `byGenre` · `byTrack` · `days` нь бүгд СЕКУНД. Клиент тал үүнийг ингэж
     үздэг: StatsView/ListeningSummary нь `fmtDur(total)`-оор ("5 мин"), achievements.ts
     нь `stats.total / 3600`-оор цаг болгож, `useListeningStats` нь офлайн кэшдээ
     секунд тутам 1-ээр нэмдэг. Урьд нь энд мөрийн ТОО буцаадаг байсан тул 305 секунд
     сонссоныг дэлгэц дээр "3 сек" гэж харуулдаг байв.

     `vib` нь ганцаараа ТООЛУУР хэвээр — "Мэдэрсэн чичиргээ" гэсэн шошготой, хэдэн
     удаа чичиргээтэй сонссоныг заана (үргэлжлэх хугацаа биш). */
  async getStats(userId: string) {
    const [rows, vib] = await Promise.all([
      this.prisma.listenHistory.findMany({
        where: { userId },
        select: { song: { select: { genre: true } }, songId: true, playedAt: true, durationMs: true },
      }),
      this.prisma.listenHistory.count({ where: { userId, vibrations: true } }),
    ]);

    const byGenre: Record<string, number> = {};
    const byTrack: Record<string, number> = {};
    const days: Record<string, number> = {};
    let total = 0;

    for (const row of rows) {
      /* `durationMs` заавал биш талбар — бичигдээгүй мөр 0 секунд болно, гэхдээ
         `byTrack`-д түлхүүр нь үлдэнэ ("Сонссон дуу" тоолуур нь `Object.keys(...).length`
         тул сонссон дуу гэж зөв тоологдоно). */
      const sec = Math.round((row.durationMs ?? 0) / 1000);
      total += sec;

      const genre = row.song?.genre || 'Бусад';
      byGenre[genre] = (byGenre[genre] || 0) + sec;
      byTrack[row.songId] = (byTrack[row.songId] || 0) + sec;
      const day = row.playedAt.toISOString().slice(0, 10);
      days[day] = (days[day] || 0) + sec;
    }

    return { total, vib, byGenre, byTrack, days };
  }

  /* ---------- Playlist ---------- */

  async listPlaylists(userId: string) {
    return this.prisma.playlist.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: { tracks: { orderBy: { position: 'asc' } } },
    });
  }

  async createPlaylist(userId: string, dto: CreatePlaylistDto) {
    return this.prisma.playlist.create({ data: { userId, name: dto.name.trim() }, include: { tracks: true } });
  }

  async renamePlaylist(userId: string, id: string, dto: RenamePlaylistDto) {
    await this.assertOwnsPlaylist(userId, id);
    return this.prisma.playlist.update({ where: { id }, data: { name: dto.name.trim() }, include: { tracks: true } });
  }

  async deletePlaylist(userId: string, id: string) {
    await this.assertOwnsPlaylist(userId, id);
    await this.prisma.playlist.delete({ where: { id } });
    return { ok: true };
  }

  async addTrack(userId: string, playlistId: string, dto: AddPlaylistTrackDto) {
    await this.assertOwnsPlaylist(userId, playlistId);
    const last = await this.prisma.playlistTrack.findFirst({
      where: { playlistId },
      orderBy: { position: 'desc' },
    });
    return this.prisma.playlistTrack
      .create({ data: { playlistId, songId: dto.songId, position: (last?.position ?? -1) + 1 } })
      .catch(() => {
        throw new NotFoundException('Дуу аль хэдийн жагсаалтад бий, эсвэл олдсонгүй');
      });
  }

  async removeTrack(userId: string, playlistId: string, songId: string) {
    await this.assertOwnsPlaylist(userId, playlistId);
    await this.prisma.playlistTrack.deleteMany({ where: { playlistId, songId } });
    return { ok: true };
  }

  private async assertOwnsPlaylist(userId: string, playlistId: string) {
    const playlist = await this.prisma.playlist.findUnique({ where: { id: playlistId } });
    if (!playlist || playlist.userId !== userId) throw new NotFoundException('Жагсаалт олдсонгүй');
    return playlist;
  }

  /* ---------- Төлбөрийн түүх ---------- */

  async getPayments(userId: string) {
    return this.prisma.payment.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } });
  }
}

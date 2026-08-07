import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Role } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateHistoryDto } from './dto/create-history.dto';
import { ListHistoryDto } from './dto/list-history.dto';

@Injectable()
export class HistoryService {
  constructor(private prisma: PrismaService) {}

  async log(userId: string, dto: CreateHistoryDto) {
    const song = await this.prisma.song.findUnique({ where: { id: dto.songId } });
    if (!song) throw new NotFoundException('Дуу олдсонгүй');
    return this.prisma.listenHistory.create({
      data: {
        userId,
        songId: dto.songId,
        durationMs: dto.durationMs,
        bpm: dto.bpm,
        visualizerStyle: dto.visualizerStyle,
        vibrations: dto.vibrations,
      },
    });
  }

  async list(userId: string, q: ListHistoryDto) {
    const page = q.page ?? 1;
    const limit = q.limit ?? 20;
    const where: Prisma.ListenHistoryWhereInput = {
      userId,
      ...(q.q
        ? {
            song: {
              OR: [
                { title: { contains: q.q, mode: 'insensitive' } },
                { artist: { contains: q.q, mode: 'insensitive' } },
              ],
            },
          }
        : {}),
    };

    const [items, total] = await Promise.all([
      this.prisma.listenHistory.findMany({
        where,
        orderBy: { playedAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
        include: { song: { select: { id: true, title: true, artist: true, genre: true, fileUrl: true } } },
      }),
      this.prisma.listenHistory.count({ where }),
    ]);

    return { items, total };
  }

  async remove(id: string, requesterId: string, requesterRole: Role) {
    const row = await this.prisma.listenHistory.findUnique({ where: { id } });
    if (!row) throw new NotFoundException('Түүхийн бичлэг олдсонгүй');
    if (row.userId !== requesterId && requesterRole !== Role.ADMIN) {
      throw new ForbiddenException('Энэ бичлэгийг устгах эрхгүй');
    }
    await this.prisma.listenHistory.delete({ where: { id } });
    return { ok: true };
  }
}

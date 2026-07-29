import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateArtistDto } from './dto/create-artist.dto';

@Injectable()
export class ArtistsService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateArtistDto) {
    return this.prisma.artist.create({ data: dto });
  }

  list() {
    return this.prisma.artist.findMany({
      orderBy: { name: 'asc' },
      include: { _count: { select: { songs: true } } },
    });
  }

  async findOne(id: string) {
    const artist = await this.prisma.artist.findUnique({
      where: { id },
      include: { songs: { orderBy: { createdAt: 'desc' } } },
    });
    if (!artist) throw new NotFoundException('Дуучин олдсонгүй');
    return artist;
  }

  async songs(id: string) {
    const artist = await this.prisma.artist.findUnique({ where: { id } });
    if (!artist) throw new NotFoundException('Дуучин олдсонгүй');
    return this.prisma.song.findMany({ where: { artistId: id }, orderBy: { createdAt: 'desc' } });
  }
}

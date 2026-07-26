import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

const BCRYPT_ROUNDS = 10;

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  /* Admin-аар THERAPIST/ADMIN эрхтэй account үүсгэх — staff бүртгэл нь self-service биш. */
  async create(dto: CreateUserDto) {
    const email = dto.email.trim().toLowerCase();
    const existing = await this.prisma.user.findUnique({ where: { email } });
    if (existing) throw new ConflictException('Энэ имэйл бүртгэлтэй байна');

    const passwordHash = await bcrypt.hash(dto.password, BCRYPT_ROUNDS);
    const user = await this.prisma.user.create({
      data: { name: dto.name.trim(), email, passwordHash, role: dto.role },
    });
    return { id: user.id, name: user.name, email: user.email, role: user.role, createdAt: user.createdAt };
  }

  async list() {
    const users = await this.prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        subActive: true,
        subPlan: true,
      },
    });
    return users;
  }

  async remove(id: string, requesterId: string) {
    if (id === requesterId) {
      throw new BadRequestException('Та өөрийгөө устгах боломжгүй');
    }
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('Хэрэглэгч олдсонгүй');
    await this.prisma.user.delete({ where: { id } });
    return { ok: true };
  }
}

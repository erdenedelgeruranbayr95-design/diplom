import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

const FEED_LIMIT = 30;

/* Мэдэгдлийн feed — өмнө нь бүхэлдээ frontend-ийн localStorage (`medreh_feed`) дээр
   байсан. Тиймээс админы "Зарлал" нь зөвхөн зарлал илгээсэн админы өөрийнх нь
   browser-т хүрдэг байсан ч UI нь "бүх хэрэглэгчид илгээгдлээ" гэж бичдэг байв. */
@Injectable()
export class NotificationsService {
  constructor(private prisma: PrismaService) {}

  /** Хэрэглэгчид харагдах feed: түүний хувийн мэдэгдэл + бүх broadcast. */
  async listFor(userId: string) {
    const items = await this.prisma.notification.findMany({
      where: { OR: [{ userId }, { userId: null }] },
      orderBy: { createdAt: 'desc' },
      take: FEED_LIMIT,
    });
    const read = await this.prisma.notificationRead.findUnique({ where: { userId } });
    return { items, readAt: read?.readAt ?? null };
  }

  /** Хонхны цэс нээгдэх мөчид — "уншсан" мөчийг тэмдэглэнэ. */
  async markRead(userId: string) {
    const readAt = new Date();
    await this.prisma.notificationRead.upsert({
      where: { userId },
      create: { userId, readAt },
      update: { readAt },
    });
    return { readAt };
  }

  /** Админы зарлал — `userId = null` тул БҮХ хэрэглэгчид харагдана. */
  broadcast(text: string, icon = '📢') {
    return this.prisma.notification.create({ data: { userId: null, text, icon } });
  }

  /** Нэг хэрэглэгчид чиглэсэн мэдэгдэл (жишээ нь "дуу анализ дууслаа"). */
  notify(userId: string, text: string, icon = '🎵') {
    return this.prisma.notification.create({ data: { userId, text, icon } });
  }
}

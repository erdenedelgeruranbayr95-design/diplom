import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { Role } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { JamendoService } from './jamendo.service';

/** Системийг анх ажиллуулахад (production дээр эхний deploy, эсвэл шинэ DB-тэй dev)
 *  каталог бvрэн хоосон vлдэхээс сэргийлнэ — Jamendo-с 20-30 хамгийн сонсогддог
 *  Creative Commons трек автоматаар импортолж, Popular Artists хэсгийг зурагтай нь
 *  бөглөнө. `onApplicationBootstrap` бvх app бэлэн болсны ДАРАА нэг л удаа ажиллана,
 *  Song хvснэгтэд аль хэдийн ямар нэг мөр байвал юу ч хийхгvй (idempotent — Render
 *  restart болгонд дахин импорт хийхгvй). JAMENDO_CLIENT_ID тохируулаагvй эсвэл
 *  Jamendo API vед боломжгvй бол дэвсхэр лог vлдээгээд app-ийг унагаахгvй. */
@Injectable()
export class CatalogSeedService implements OnApplicationBootstrap {
  private readonly logger = new Logger(CatalogSeedService.name);

  constructor(
    private prisma: PrismaService,
    private jamendo: JamendoService,
  ) {}

  async onApplicationBootstrap() {
    if (!process.env.JAMENDO_CLIENT_ID) {
      this.logger.log('JAMENDO_CLIENT_ID тохируулагдаагvй — анхны каталог автомат импорт алгаслаа');
      return;
    }

    try {
      const songCount = await this.prisma.song.count();
      if (songCount > 0) return;

      const uploader = await this.prisma.user.findFirst({ where: { role: Role.ROOT } });
      if (!uploader) {
        this.logger.warn('ROOT хэрэглэгч олдсонгvй — анхны Jamendo каталог импортыг алгаслаа (эхлээд `npx prisma db seed` ажиллуулна уу)');
        return;
      }

      this.logger.log('Song хvснэгт хоосон байна — Jamendo-с анхны каталог (20-30 трек) импортолж эхэллээ...');
      const result = await this.jamendo.importPopularBatch(30, uploader.id);
      this.logger.log(
        `Анхны каталог импорт дууслаа: ${result.imported} нэмэгдсэн, ${result.skipped} алгассан, ${result.failed} амжилтгvй`,
      );

      const photoResult = await this.jamendo.backfillArtistPhotos();
      this.logger.log(
        `Popular Artists зураг бөглөлт дууслаа: ${photoResult.updated} шинэчлэгдсэн (${photoResult.usedFallbackCover} нь дууны coverUrl-аар орлуулсан)`,
      );
    } catch (err) {
      this.logger.warn(`Анхны Jamendo каталог импорт амжилтгvй (app хэвийн vргэлжилнэ): ${(err as Error).message}`);
    }
  }
}

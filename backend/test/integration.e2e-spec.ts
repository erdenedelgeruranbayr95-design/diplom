import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { HttpExceptionFilter } from '../src/common/filters/http-exception.filter';

/* Бүрэн урсгал: register → login → upload (sourceUrl-аар, S3 dependency-гүй) →
   client-side analyze хадгалах → тоглуулалтын түүх (history) бичих → уншиж авах.

   ЖИНХЭНЭ Postgres/Redis холболт ашиглана (`.env`-ийн DATABASE_URL/REDIS_URL) —
   энэ бол unit test биш, интеграцийн (олон модуль хамтдаа ажиллаж байгааг шалгах)
   тест тул mock ашиглахгүй. Тестийн эцэст өөрийн үүсгэсэн өгөгдлөө цэвэрлэнэ. */
describe('Integration: register → login → upload → analyze → history (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  const testEmail = `e2e-${Date.now()}@example.com`;
  let accessToken: string;
  let songId: string;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({ imports: [AppModule] }).compile();
    app = moduleRef.createNestApplication<NestExpressApplication>();
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));
    app.useGlobalFilters(new HttpExceptionFilter());
    await app.init();
    prisma = app.get(PrismaService);
  });

  afterAll(async () => {
    // Цэвэрлэгээ — foreign key дараалал баримтална (Song → ListenHistory эхлээд, дараа нь User).
    const user = await prisma.user.findUnique({ where: { email: testEmail } });
    if (user) {
      await prisma.listenHistory.deleteMany({ where: { userId: user.id } });
      await prisma.song.deleteMany({ where: { uploadedBy: user.id } });
      await prisma.refreshToken.deleteMany({ where: { userId: user.id } });
      await prisma.user.delete({ where: { id: user.id } });
    }
    await app.close();
  });

  it('registers a new user', async () => {
    const res = await request(app.getHttpServer())
      .post('/api/auth/register')
      .send({ name: 'E2E Tester', email: testEmail, password: 'TestPass123!', password2: 'TestPass123!' })
      .expect(201);
    expect(res.body.accessToken).toEqual(expect.any(String));
    accessToken = res.body.accessToken;
  });

  it('logs in with the freshly-registered credentials', async () => {
    const res = await request(app.getHttpServer())
      .post('/api/auth/login')
      .send({ email: testEmail, password: 'TestPass123!' })
      .expect(201);
    expect(res.body.accessToken).toEqual(expect.any(String));
    accessToken = res.body.accessToken; // use the freshest token for subsequent calls
  });

  it('uploads a song via sourceUrl (no S3 dependency for this test) with a required license', async () => {
    const res = await request(app.getHttpServer())
      .post('/api/songs')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        title: 'E2E Integration Song',
        artist: 'Test Artist',
        sourceUrl: 'https://example.com/e2e-test-song.mp3',
        license: 'ORIGINAL',
      })
      .expect(201);
    expect(res.body.id).toEqual(expect.any(String));
    expect(res.body.license).toBe('ORIGINAL');
    songId = res.body.id;
  });

  it('rejects an upload with no license (DoD: лицензгүй дуу upload хийгдэхгүй)', async () => {
    await request(app.getHttpServer())
      .post('/api/songs')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ title: 'No License Song', sourceUrl: 'https://example.com/x.mp3' })
      .expect(400);
  });

  it('saves client-side analysis results for the uploaded song', async () => {
    const res = await request(app.getHttpServer())
      .post(`/api/songs/${songId}/analyze`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ bpm: 120, beatCount: 240, rms: 0.5, peak: 0.9 })
      .expect(201);
    expect(res.body.analyzedBpm).toBe(120);
  });

  it('records a listen-history entry for the song', async () => {
    const res = await request(app.getHttpServer())
      .post('/api/history')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ songId, durationMs: 42000 })
      .expect(201);
    expect(res.body.songId).toBe(songId);
  });

  it('reads back the listen history and finds the recorded entry', async () => {
    const res = await request(app.getHttpServer())
      .get('/api/history')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);
    const items = Array.isArray(res.body) ? res.body : res.body.items;
    expect(items.some((h: { songId: string }) => h.songId === songId)).toBe(true);
  });
});

import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { readFileSync, statSync } from 'fs';
import { join } from 'path';

const prisma = new PrismaClient();

/* Демо mp3-ууд frontend/public/-д байрладаг тул seed тэднийг репо доторх замаар олно.
   Файл олдохгүй бол duration нь null үлдэнэ — seed унахгүй (UI нь "—" харуулна). */
const PUBLIC_DIR = join(__dirname, '..', '..', 'frontend', 'public');

const MPEG1_LAYER3_BITRATES = [0, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, 0];

/* Демо файлууд бүгд MPEG-1 Layer III, тогтмол битрэйт (CBR 192 kbps), Xing/VBR толгойгүй.
   Тийм тул урт нь (аудио байтын хэмжээ ÷ битрэйт) томьёогоор нарийн гарна — гуравдагч талын
   сан (music-metadata / ffprobe) шаардахгүй. Эхний frame-ийн толгойноос битрэйтийг уншина
   (192-г шууд бичихгүй), файл солигдвол тоо нь автоматаар мөрдөнө. */
function mp3DurationSec(publicPath: string): number | null {
  try {
    const abs = join(PUBLIC_DIR, publicPath.replace(/^\//, ''));
    const size = statSync(abs).size;
    const buf = readFileSync(abs);

    // ID3v2 толгойг алгасана (synchsafe 4×7-bit урт).
    let off = 0;
    if (buf.toString('latin1', 0, 3) === 'ID3') {
      off = 10 + (((buf[6] & 0x7f) << 21) | ((buf[7] & 0x7f) << 14) | ((buf[8] & 0x7f) << 7) | (buf[9] & 0x7f));
    }

    // Эхний хүчинтэй frame sync (11 бит 1) хайж, битрэйт/дээжлэх давтамжийг уншина.
    for (let i = off; i + 4 <= buf.length; i++) {
      if (buf[i] !== 0xff || (buf[i + 1] & 0xe0) !== 0xe0) continue;
      const version = (buf[i + 1] >> 3) & 0x03; // 3 = MPEG-1
      const layer = (buf[i + 1] >> 1) & 0x03; // 1 = Layer III
      const bitrateIdx = (buf[i + 2] >> 4) & 0x0f;
      const sampleRateIdx = (buf[i + 2] >> 2) & 0x03;
      if (version !== 3 || layer !== 1 || bitrateIdx === 0 || bitrateIdx === 15 || sampleRateIdx === 3) continue;

      const kbps = MPEG1_LAYER3_BITRATES[bitrateIdx];
      const seconds = ((size - off) * 8) / (kbps * 1000);
      return Math.round(seconds);
    }
    return null;
  } catch {
    return null;
  }
}

async function main() {
  /* ROOT — системийн эзэмшигч, ADMIN-аас дээр зэрэглэлтэй. Зөвхөн энэ дүр Root Panel-д
     нэвтэрнэ (`RolesGuard`-д ROOT бүх @Roles() шаардлагыг давна). */
  await prisma.user.upsert({
    where: { email: 'root@medreh.mn' },
    update: {},
    create: {
      name: 'Систем эзэмшигч',
      email: 'root@medreh.mn',
      passwordHash: await bcrypt.hash('root123', 10),
      role: Role.ROOT,
    },
  });
  console.log('Seeded root@medreh.mn / root123');

  await prisma.user.upsert({
    where: { email: 'admin@medreh.mn' },
    update: {},
    create: {
      name: 'Админ',
      email: 'admin@medreh.mn',
      passwordHash: await bcrypt.hash('admin123', 10),
      role: Role.ADMIN,
    },
  });
  console.log('Seeded admin@medreh.mn / admin123');

  const therapist = await prisma.user.upsert({
    where: { email: 'therapist@medreh.mn' },
    update: {},
    create: {
      name: 'Эмчилгээч',
      email: 'therapist@medreh.mn',
      passwordHash: await bcrypt.hash('therapist123', 10),
      role: Role.THERAPIST,
    },
  });
  console.log('Seeded therapist@medreh.mn / therapist123');

  const demoUser = await prisma.user.upsert({
    where: { email: 'user@medreh.mn' },
    update: {},
    create: {
      name: 'Жишээ хэрэглэгч',
      email: 'user@medreh.mn',
      passwordHash: await bcrypt.hash('user123', 10),
      role: Role.USER,
    },
  });
  console.log('Seeded user@medreh.mn / user123');

  const parent = await prisma.user.upsert({
    where: { email: 'parent@medreh.mn' },
    update: {},
    create: {
      name: 'Эцэг эх',
      email: 'parent@medreh.mn',
      passwordHash: await bcrypt.hash('parent123', 10),
      role: Role.PARENT,
    },
  });
  console.log('Seeded parent@medreh.mn / parent123');

  // ---- Монгол дуучид + дуу каталог (демо метадата) ----
  // Аудио файл БОДИТООР татаж/хадгалаагүй (зохиогчийн эрхийн эрсдэлтэй тул зориудаар
  // орхигдсон) — fileUrl нь frontend/public/tracks/-д байгаа 6 демо mp3-г round-robin
  // байдлаар ашигладаг placeholder. Cover-ууд ч мөн адил (frontend/public/gallery/).
  // Зорилго нь Artist/Song холбоос, "Хамгийн алдартай/Сүүлийн үеийн/Онцлох" секц, дуучны
  // хуудасны UI/API-г бодитоор ажиллуулах — жинхэнэ хөгжмийн эх сурвалж биш.
  const PLACEHOLDER_FILES = [
    '/tracks/song-1.mp3',
    '/tracks/song-2.mp3',
    '/tracks/song-3.mp3',
    '/tracks/song-4.mp3',
    '/tracks/song-8.mp3',
    '/tracks/song-9.mp3',
  ];
  const PLACEHOLDER_COVERS = [
    '/gallery/gal-01.jpg',
    '/gallery/gal-02.jpg',
    '/gallery/gal-03.jpg',
    '/gallery/gal-04.jpg',
    '/gallery/gal-05.jpg',
    '/gallery/gal-06.jpg',
  ];
  function placeholderFile(i: number) {
    return PLACEHOLDER_FILES[i % PLACEHOLDER_FILES.length];
  }
  function placeholderCover(i: number) {
    return PLACEHOLDER_COVERS[i % PLACEHOLDER_COVERS.length];
  }
  /* Файл бүрийг нэг л удаа уншиж, урт нь кэшлэгдэнэ (6 файл × 21 дуу давхар уншихаас сэргийлнэ). */
  const durationCache = new Map<string, number | null>();
  function placeholderDuration(i: number) {
    const file = placeholderFile(i);
    if (!durationCache.has(file)) durationCache.set(file, mp3DurationSec(file));
    return durationCache.get(file) ?? null;
  }

  const ARTISTS: { name: string; bio: string; careerInfo: string; songs: { title: string; genre: string; year: number; featured?: boolean }[] }[] = [
    {
      name: 'Ганганцоож (Gangaa)',
      bio: 'Монголын нэрт эстрада дуучин, олон жилийн турш тайзны амьдралтай.',
      careerInfo: 'Монгол Улсын Соёлын гавьяат зүтгэлтэн цол хүртсэн, 1990-ээд оноос идэвхтэй уран бүтээл хийж байна.',
      songs: [
        { title: 'Эхийн сэтгэл', genre: 'Поп', year: 2018, featured: true },
        { title: 'Алсын бараа', genre: 'Балад', year: 2020 },
      ],
    },
    {
      name: 'Rokit Bay',
      bio: 'Хип-хоп болон RnB төрлөөр ажилладаг залуу үеийн уран бүтээлч.',
      careerInfo: '2015 оноос хойш идэвхтэй уран бүтээл хийж, олон нэгл гаргасан.',
      songs: [
        { title: 'Шөнийн хот', genre: 'Хип-хоп', year: 2022, featured: true },
        { title: 'Урам зориг', genre: 'RnB', year: 2023 },
      ],
    },
    {
      name: 'The HU',
      bio: 'Дэлхийд алдаршсан "Hunnu Rock" төрлийн Монгол хамтлаг, морин хуур болон уртын дууг rock-той хослуулдаг.',
      careerInfo: '2016 онд байгуулагдсан, дэлхийн тайзнуудад тоглож, олон улсын шагнал хүртсэн.',
      songs: [
        { title: 'Ямаат хоос', genre: 'Rock', year: 2019, featured: true },
        { title: 'Ван донт кэй', genre: 'Rock', year: 2020, featured: true },
        { title: 'Тэнгэрийн хүслээр', genre: 'Rock', year: 2022 },
      ],
    },
    {
      name: 'Давайдша',
      bio: 'Орчин үеийн поп/данс төрлийн залуу уран бүтээлч.',
      careerInfo: '2020 оноос хойш цахим орчинд түргэн алдаршсан.',
      songs: [
        { title: 'Шөнийн клуб', genre: 'Данс', year: 2021 },
        { title: 'Хайрын дохио', genre: 'Поп', year: 2022 },
      ],
    },
    {
      name: 'Ginjin',
      bio: 'Хип-хоп болон трэп төрлөөр ажилладаг уран бүтээлч.',
      careerInfo: '2018 оноос хойш идэвхтэй.',
      songs: [
        { title: 'Гудамжны туульс', genre: 'Хип-хоп', year: 2021 },
        { title: 'Мөнгөн сар', genre: 'Трэп', year: 2023 },
      ],
    },
    {
      name: 'A Cool',
      bio: 'Монголын анхны хип-хоп бүлгүүдийн нэг гишүүнээс гаралтай зохиолч, продюсер.',
      careerInfo: '2000-аад оноос хойш Монголын хип-хоп индустрийг тэргүүлэгчдийн нэг.',
      songs: [
        { title: 'Тэнгэр өөд', genre: 'Хип-хоп', year: 2017 },
        { title: 'Замын түүх', genre: 'Хип-хоп', year: 2019 },
      ],
    },
    {
      name: 'Mrs M',
      bio: 'Хиймэл нэр дор ажилладаг, өвөрмөц дуу хоолойгоороо алдартай дуучин.',
      careerInfo: '2019 оноос хойш цахим платформ дээр алдаршсан.',
      songs: [
        { title: 'Нууц захидал', genre: 'Поп', year: 2021 },
        { title: 'Сэтгэлийн эмгэнэл', genre: 'Балад', year: 2022 },
      ],
    },
    {
      name: 'Seryoja',
      bio: 'Орчин үеийн поп/RnB дуучин, тайзны туршлагатай.',
      careerInfo: '2016 оноос хойш идэвхтэй уран бүтээл хийж байна.',
      songs: [
        { title: 'Гэрлийн доор', genre: 'RnB', year: 2020 },
      ],
    },
    {
      name: 'Дөлгөөн',
      bio: 'Акустик болон балад төрлөөр ажилладаг дуучин.',
      careerInfo: '2014 оноос хойш идэвхтэй.',
      songs: [
        { title: 'Уулын дуу', genre: 'Балад', year: 2018 },
        { title: 'Цасан жил', genre: 'Акустик', year: 2021 },
      ],
    },
    {
      name: 'Номин Талст',
      bio: 'Уламжлалт болон орчин үеийн хөгжмийг хослуулдаг дуучин.',
      careerInfo: '2017 оноос хойш идэвхтэй уран бүтээл хийж байна.',
      songs: [
        { title: 'Эх орон', genre: 'Уламжлалт', year: 2019 },
      ],
    },
    {
      name: 'Камертон',
      bio: 'Рок хамтлаг, Монголын орчин үеийн рок хөдөлгөөний тэргүүлэгчдийн нэг.',
      careerInfo: '2000-аад оноос хойш идэвхтэй тоглолт хийж байна.',
      songs: [
        { title: 'Галт тэрэг', genre: 'Rock', year: 2016 },
        { title: 'Мөрөөдлийн зам', genre: 'Rock', year: 2018 },
      ],
    },
  ];

  let songIndex = 0;
  let backfilled = 0;
  for (const a of ARTISTS) {
    const artist = await prisma.artist.upsert({
      where: { name: a.name },
      update: {},
      create: { name: a.name, bio: a.bio, careerInfo: a.careerInfo },
    });
    for (const s of a.songs) {
      const existing = await prisma.song.findFirst({ where: { title: s.title, artistId: artist.id } });
      if (existing) {
        /* Хуучин seed нь duration бичдэггүй байсан тул DB-д аль хэдийн байгаа мөрүүд
           duration = null-тай үлдсэн (UI-д "—" харагдана). Дахин seed хийхэд тэдгээрийг
           нөхөж бөглөнө — бусад талбарыг хөндөхгүй (гараар засварласан өгөгдөл хэвээр). */
        if (existing.duration === null) {
          const duration = placeholderDuration(songIndex);
          if (duration !== null) {
            await prisma.song.update({ where: { id: existing.id }, data: { duration } });
            backfilled++;
          }
        }
        songIndex++;
        continue;
      }
      await prisma.song.create({
        data: {
          title: s.title,
          artist: a.name,
          artistId: artist.id,
          genre: s.genre,
          releaseYear: s.year,
          featured: !!s.featured,
          coverUrl: placeholderCover(songIndex),
          fileUrl: placeholderFile(songIndex),
          duration: placeholderDuration(songIndex),
          uploadedBy: (await prisma.user.findUniqueOrThrow({ where: { email: 'admin@medreh.mn' } })).id,
        },
      });
      songIndex++;
    }
  }
  console.log(
    `Seeded ${ARTISTS.length} artists and ${songIndex} songs (placeholder audio/cover)` +
      (backfilled > 0 ? `, backfilled duration on ${backfilled} existing songs` : ''),
  );

  await prisma.therapistAssignment.upsert({
    where: { therapistId_userId: { therapistId: therapist.id, userId: demoUser.id } },
    update: {},
    create: { therapistId: therapist.id, userId: demoUser.id },
  });
  await prisma.parentLink.upsert({
    where: { parentId_childUserId: { parentId: parent.id, childUserId: demoUser.id } },
    update: {},
    create: { parentId: parent.id, childUserId: demoUser.id },
  });
  console.log('Seeded demo TherapistAssignment + ParentLink (all pointing to user@medreh.mn)');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
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
  for (const a of ARTISTS) {
    const artist = await prisma.artist.upsert({
      where: { name: a.name },
      update: {},
      create: { name: a.name, bio: a.bio, careerInfo: a.careerInfo },
    });
    for (const s of a.songs) {
      const existing = await prisma.song.findFirst({ where: { title: s.title, artistId: artist.id } });
      if (existing) {
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
          uploadedBy: (await prisma.user.findUniqueOrThrow({ where: { email: 'admin@medreh.mn' } })).id,
        },
      });
      songIndex++;
    }
  }
  console.log(`Seeded ${ARTISTS.length} artists and ${songIndex} songs (placeholder audio/cover)`);

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

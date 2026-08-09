/* Production-ийн Jamendo каталогийг ЛОКАЛ өгөгдлийн санд хуулна.
 *
 * ЯАГААД ЭНЭ СКРИПТ ХЭРЭГТЭЙ ВЭ
 * Deploy хийсэн сайт (Vercel + Render) нь ӨӨР өгөгдлийн сан ашигладаг тул
 * локал дээр огт өөр дуунууд харагддаг. Гар утасны апп нь локал backend руу
 * ханддаг учир deploy хийсэнтэй ижил агуулга үзүүлэхийн тулд каталогийг
 * локал руу буулгах хэрэгтэй.
 *
 * ЯАГААД PRODUCTION РУУ ШУУД ХОЛБОДОГГҮЙ ВЭ
 * Production-ийн 30 дуу бүгд `PENDING` — цохилтын өгөгдөл (beatTimestamps)
 * байхгүй. Тэнд холбовол дуу тоглох ч ЧИЧИРГЭЭ ОГТ ГАРАХГҮЙ. Локал руу
 * импортлочихвол worker-ээр шинжлүүлж чичиргээг нь ажиллуулж болно.
 *
 * ЯАГААД JAMENDO API ТҮЛХҮҮР ХЭРЭГГҮЙ ВЭ
 * `GET /api/songs` болон `/api/artists` нь НЭЭЛТТЭЙ (auth шаардахгүй), мөн
 * аудио/ковер нь Jamendo-гийн нээлттэй CDN дээр байдаг. Тиймээс каталогийг
 * шууд хуулж авахад хангалттай — `JAMENDO_CLIENT_ID` огт шаардлагагүй.
 *
 * ХЭРЭГЛЭЭ
 *   node scripts/import-prod-catalog.js
 *
 * Дахин ажиллуулж болно (idempotent): дуучныг нэрээр нь, дууг `jamendoId`-аар
 * нь тааруулж давхардуулахгүй. Одоо байгаа монгол дуунуудыг УСТГАХГҮЙ.
 */

const { PrismaClient } = require("@prisma/client");

const API = process.env.PROD_API_URL || "https://diplom-api-p785.onrender.com/api";

const prisma = new PrismaClient();

async function getJson(path) {
  const res = await fetch(`${API}${path}`, { signal: AbortSignal.timeout(120_000) });
  if (!res.ok) throw new Error(`${path} → HTTP ${res.status}`);
  return res.json();
}

/** Production-ий хариу нь массив эсвэл `{items:[...]}` байж болно. */
function toArray(payload) {
  if (Array.isArray(payload)) return payload;
  return payload?.items ?? payload?.data ?? [];
}

async function main() {
  console.log(`Эх сурвалж: ${API}`);

  const [songs, artists] = await Promise.all([
    getJson("/songs").then(toArray),
    getJson("/artists").then(toArray),
  ]);
  console.log(`Татсан: ${songs.length} дуу, ${artists.length} дуучин`);

  if (!songs.length) throw new Error("Production-оос дуу ирсэнгүй — импорт зогслоо");

  /* Дуунууд `uploadedBy` (User FK) шаарддаг. Production-ий ID нь локал дээр
     байхгүй тул локалын ROOT/ADMIN-г эзэн болгоно. */
  const owner = await prisma.user.findFirst({
    where: { role: { in: ["ROOT", "ADMIN"] } },
    orderBy: { role: "asc" },
    select: { id: true, email: true },
  });
  if (!owner) throw new Error("Локал дээр ROOT/ADMIN хэрэглэгч алга — эхлээд seed хийнэ үү");
  console.log(`Эзэмшигч: ${owner.email}`);

  // ---- 1. Дуучид ----
  // `name` нь unique тул түүгээр upsert хийнэ. Локал ID production-оос ЯЛГААТАЙ
  // байх тул дуунуудыг холбохдоо энэ map-ыг ашиглана.
  const artistIdByName = new Map();
  let artistsNew = 0;
  for (const a of artists) {
    if (!a?.name) continue;
    const row = await prisma.artist.upsert({
      where: { name: a.name },
      // Зөвхөн дутуу талбарыг нөхнө — локал дуучны гараар оруулсан bio-г дарахгүй.
      update: {
        photoUrl: a.photoUrl ?? undefined,
        bio: a.bio ?? undefined,
        careerInfo: a.careerInfo ?? undefined,
      },
      create: {
        name: a.name,
        photoUrl: a.photoUrl ?? null,
        bio: a.bio ?? null,
        careerInfo: a.careerInfo ?? null,
      },
      select: { id: true, createdAt: true },
    });
    artistIdByName.set(a.name, row.id);
    artistsNew++;
  }
  console.log(`Дуучид: ${artistsNew} мөр бичигдлээ`);

  // ---- 2. Дуунууд ----
  let created = 0;
  let updated = 0;
  let skipped = 0;

  for (const s of songs) {
    if (!s?.title || !s?.fileUrl) {
      skipped++;
      continue;
    }

    /* Дуучин `/artists`-д ороогүй байж болно (жишээ нь нийтлэгдээгүй). Тэр
       тохиолдолд дууны өөрийнх нь `artistRef`-ээс үүсгэнэ. */
    let artistId = s.artist ? artistIdByName.get(s.artist) : undefined;
    if (!artistId && s.artistRef?.name) {
      const row = await prisma.artist.upsert({
        where: { name: s.artistRef.name },
        update: { photoUrl: s.artistRef.photoUrl ?? undefined },
        create: { name: s.artistRef.name, photoUrl: s.artistRef.photoUrl ?? null },
        select: { id: true },
      });
      artistId = row.id;
      artistIdByName.set(s.artistRef.name, row.id);
    }

    /* Давхардлын түлхүүр: Jamendo track ID. Байхгүй бол гарчиг+дуучнаар.
       (schema дээр `jamendoId` unique БИШ тул findFirst ашиглана.) */
    const existing = await prisma.song.findFirst({
      where: s.jamendoId
        ? { jamendoId: s.jamendoId }
        : { title: s.title, artist: s.artist ?? null },
      select: { id: true, analysisStatus: true },
    });

    const data = {
      title: s.title,
      artist: s.artist ?? null,
      artistId: artistId ?? null,
      genre: s.genre ?? null,
      description: s.description ?? null,
      lyrics: s.lyrics ?? null,
      releaseYear: s.releaseYear ?? null,
      coverUrl: s.coverUrl ?? null,
      featured: s.featured ?? false,
      fileUrl: s.fileUrl,
      duration: s.duration ?? null,
      bpm: s.bpm ?? null,
      license: s.license ?? null,
      licenseSrc: s.licenseSrc ?? null,
      published: s.published ?? true,
      publishedAt: s.publishedAt ? new Date(s.publishedAt) : new Date(),
      jamendoId: s.jamendoId ?? null,
      fmaId: s.fmaId ?? null,
      uploadConfirmed: true,
    };

    if (existing) {
      /* Аль хэдийн шинжилсэн дууны `analysisStatus`-ыг PENDING болгож
         БУЦААХГҮЙ — эс тэгвэл ажиллаж байсан чичиргээ устана. */
      await prisma.song.update({ where: { id: existing.id }, data });
      updated++;
    } else {
      await prisma.song.create({
        data: { ...data, uploadedBy: owner.id, analysisStatus: "PENDING" },
      });
      created++;
    }
  }

  console.log(`Дуу: ${created} шинэ, ${updated} шинэчилсэн, ${skipped} алгассан`);

  const total = await prisma.song.count();
  const ready = await prisma.song.count({ where: { analysisStatus: "READY" } });
  const pending = await prisma.song.count({ where: { analysisStatus: "PENDING" } });
  console.log(`\nЛокал нийт: ${total} дуу (${ready} READY, ${pending} PENDING)`);
  console.log(`Дараагийн алхам: worker ажиллуулж ${pending} дууг шинжлүүлнэ.`);
}

main()
  .catch((e) => {
    console.error("Импорт амжилтгүй:", e.message);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());

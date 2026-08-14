/* Туршилтын (демо) дуу, дуучдыг өгөгдлийн сангаас устгана.
 *
 * ЮУГ ДЕМО ГЭЖ ҮЗЭХ ВЭ
 *   1. `prisma/seed.ts`-ийн placeholder дуунууд — fileUrl нь `/tracks/…mp3`
 *      (жинхэнэ аудио байршуулаагүй, frontend/public доторх 6 файлыг эргүүлж
 *      ашигладаг демо метадата).
 *   2. Jamendo / Free Music Archive импортын дуунууд — `jamendoId` эсвэл
 *      `fmaId` утгатай (гадаад каталогийн турших контент).
 *
 * БОДИТ КОНТЕНТЫГ ХӨНДӨХГҮЙ: уран бүтээлч өөрөө байршуулсан дуу (storageKey-тэй,
 * эдгээр аль ч тэмдэгт тохирохгүй) хэвээр үлдэнэ.
 *
 * Дуунуудыг устгасны дараа ДУУГҮЙ, ЦОМОГГҮЙ, ЭЗЭНГҮЙ (`ownerId = null`) үлдсэн
 * дуучны хуудсыг цэвэрлэнэ — эзэнтэй профайлыг хэзээ ч устгахгүй.
 *
 * ХЭРЭГЛЭЭ
 *   node scripts/purge-demo-catalog.js --dry-run   # зөвхөн харах
 *   node scripts/purge-demo-catalog.js             # бодитоор устгах
 */

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const dryRun = process.argv.includes("--dry-run");

/** Демо дууг таних нөхцөл — хоёулаа "OR" (аль нэг нь таарвал демо). */
const DEMO_SONG_FILTER = {
  OR: [{ fileUrl: { startsWith: "/tracks/" } }, { jamendoId: { not: null } }, { fmaId: { not: null } }],
};

async function main() {
  const songs = await prisma.song.findMany({
    where: DEMO_SONG_FILTER,
    select: { id: true, title: true, artist: true, fileUrl: true, jamendoId: true, fmaId: true },
  });

  const total = await prisma.song.count();
  console.log(`Нийт ${total} дуунаас ${songs.length} нь демо гэж тодорхойлогдлоо.`);
  for (const s of songs.slice(0, 20)) {
    const src = s.jamendoId ? "jamendo" : s.fmaId ? "fma" : "seed";
    console.log(`  · [${src}] ${s.artist} — ${s.title}`);
  }
  if (songs.length > 20) console.log(`  … бас ${songs.length - 20} мөр`);

  if (dryRun) {
    const orphans = await countOrphanArtists(songs.map((s) => s.id));
    console.log(`\n--dry-run: юу ч устгасангүй. Дуунуудыг устгавал ${orphans} эзэнгүй дуучин хоосон үлдэнэ.`);
    return;
  }

  if (!songs.length) {
    console.log("Устгах зүйл алга.");
    return;
  }

  /* ListenHistory · UserTrackAction · PlaylistTrack нь Song руу `onDelete: Cascade`
     тул тусад нь цэвэрлэх шаардлагагүй. */
  const removed = await prisma.song.deleteMany({ where: DEMO_SONG_FILTER });
  console.log(`\n${removed.count} дуу устгагдлаа.`);

  /* Дуу, цомоггүй үлдсэн ЭЗЭНГҮЙ дуучид — импортоор автоматаар үүссэн хоосон мөрүүд.
     Эзэнтэй профайл (хэрэглэгчийн уран бүтээлчийн хуудас) хэвээр үлдэнэ. */
  const orphanArtists = await prisma.artist.deleteMany({
    where: { ownerId: null, songs: { none: {} }, albums: { none: {} } },
  });
  console.log(`${orphanArtists.count} эзэнгүй дуучны хуудас устгагдлаа.`);

  /* Дуугүй үлдсэн цомгууд (демо дуунууд нь цомогт хамаарч байсан бол). */
  const emptyAlbums = await prisma.album.deleteMany({ where: { songs: { none: {} } } });
  console.log(`${emptyAlbums.count} хоосон цомог устгагдлаа.`);
}

async function countOrphanArtists(doomedSongIds) {
  const artists = await prisma.artist.findMany({
    where: { ownerId: null },
    select: { id: true, songs: { select: { id: true } }, albums: { select: { id: true } } },
  });
  const doomed = new Set(doomedSongIds);
  return artists.filter((a) => a.albums.length === 0 && a.songs.every((s) => doomed.has(s.id))).length;
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());

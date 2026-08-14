/* Чичиргээгүй (анализ хийгдээгүй) дуунуудыг каталогоос устгана.
 *
 * ЯАГААД ХЭРЭГТЭЙ ВЭ
 * `analysisStatus` нь `READY` биш дуунд цохилтын өгөгдөл (beatTimestamps,
 * beatIntensity) байхгүй. Тоглуулагч тэдгээрийг тоглуулж чадах ч ЧИЧИРГЭЭ
 * гаргахгүй — сонсголгүй хэрэглэгчийн хувьд энэ бол хоосон дуу. Платформын
 * гол утга нь чичиргээ тул ийм дууг каталогт үлдээх нь хэрэглэгчийг төөрөгдүүлнэ.
 *
 * ⚠️ БУЦААХ БОЛОМЖГҮЙ. Дуу болон түүний файл (аудио, ковер) хоёулаа устана.
 * Эхлээд ЗААВАЛ `--dry-run`-ээр юу устахыг хараарай.
 *
 * ХЭРЭГЛЭЭ — хоёр аргын аль нэгээр эрх авна
 *
 *   1. ТОКЕН (Google-ээр нэвтэрдэг бүртгэлд ЦОРЫН ГАНЦ арга — тийм бүртгэлд
 *      нууц үг байдаггүй тул `/auth/login` үргэлж 401 өгнө):
 *        $env:ADMIN_TOKEN = "eyJ..."
 *
 *      Токеныг хөтчөөс авна: сайт руугаа нэвтэрсэн байхдаа F12 → Network →
 *      аль нэг `/api/...` хүсэлт → Request Headers → `Authorization: Bearer ...`
 *      мөрийн `Bearer `-ийн дараах хэсгийг хуулна.
 *
 *   2. ИМЭЙЛ + НУУЦ ҮГ (нууц үгтэй бүртгэлд):
 *        $env:ADMIN_EMAIL = "..."
 *        $env:ADMIN_PASSWORD = "..."
 *
 *   $env:API_URL = "https://diplom-api-p785.onrender.com/api"
 *   node scripts/purge-unanalyzed-songs.js --dry-run
 *   node scripts/purge-unanalyzed-songs.js
 */

const API = process.env.API_URL || "http://localhost:3000/api";
const TOKEN = process.env.ADMIN_TOKEN;
const EMAIL = process.env.ADMIN_EMAIL;
const PASSWORD = process.env.ADMIN_PASSWORD;
const dryRun = process.argv.includes("--dry-run");

/** Чичиргээ гаргаж чадахгүй төлөвүүд. `PROCESSING` нь одоо шинжлэгдэж байгаа тул
 *  ХӨНДӨХГҮЙ — хэдхэн минутын дараа READY болж магадгүй. */
const DEAD_STATUSES = new Set(["PENDING", "FAILED"]);

async function api(path, opts = {}, token) {
  const res = await fetch(`${API}${path}`, {
    ...opts,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(opts.headers || {}),
    },
    signal: AbortSignal.timeout(120_000),
  });
  if (!res.ok) throw new Error(`${opts.method || "GET"} ${path} → HTTP ${res.status} ${await res.text().catch(() => "")}`);
  return res.status === 204 ? null : res.json().catch(() => null);
}

async function main() {
  if (!TOKEN && !(EMAIL && PASSWORD)) {
    throw new Error("ADMIN_TOKEN эсвэл (ADMIN_EMAIL + ADMIN_PASSWORD) орчны хувьсагчийг заана уу");
  }

  console.log(`Сервер: ${API}`);
  const songs = await api("/songs");
  const dead = songs.filter((s) => DEAD_STATUSES.has(s.analysisStatus));

  console.log(`Нийт ${songs.length} дуунаас ${dead.length} нь чичиргээгүй:\n`);
  for (const s of dead) {
    console.log(`  [${s.analysisStatus.padEnd(8)}] ${s.artist} — ${s.title}`);
  }

  if (!dead.length) return console.log("\nУстгах зүйл алга.");
  if (dryRun) return console.log(`\n--dry-run: юу ч устгасангүй. Бодитоор устгахын тулд --dry-run-гүй ажиллуулна уу.`);

  let accessToken = TOKEN;
  if (accessToken) {
    console.log("\nБэлэн токеноор ажиллаж байна.");
  } else {
    ({ accessToken } = await api("/auth/login", { method: "POST", body: JSON.stringify({ email: EMAIL, password: PASSWORD }) }));
    console.log(`\n${EMAIL} нэрээр нэвтэрлээ.`);
  }

  /* Токен зөв эрхтэй эсэхийг УРЬДЧИЛЖ шалгана — эс бөгөөс эхний устгалт дээр
     403 өгч, хэрэглэгч аль алхам дээр буруудсанаа мэдэхгүй. */
  const me = await api("/auth/me", {}, accessToken);
  console.log(`Эрх: ${me?.email ?? "?"} (${me?.role ?? "?"})\n`);

  let ok = 0;
  for (const s of dead) {
    try {
      await api(`/songs/${s.id}`, { method: "DELETE" }, accessToken);
      console.log(`  ✓ ${s.title}`);
      ok++;
    } catch (e) {
      console.log(`  ✗ ${s.title} — ${e.message}`);
    }
  }
  console.log(`\n${ok}/${dead.length} дуу устгагдлаа. Каталогт ${songs.length - ok} дуу үлдэв.`);
}

main().catch((e) => {
  console.error(e.message);
  process.exitCode = 1;
});

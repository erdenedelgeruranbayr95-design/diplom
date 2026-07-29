"use client";

/* Нүүр — "shelf" бүтэц: дээд талд шүүлтүүрийн чип, доор нь хэвтээ гүйдэг эгнээнүүд
   (Spotify/Apple Music-ийн Home загвар).

   Түүхэн тэмдэглэл: анхны хувилбар нь "Тренд дуунууд" (grid) ба "Бүх дуунууд" (жагсаалт)
   гэж ИЖИЛ өгөгдлийг хоёр удаа буулгаж, бүх каталогийг нүүр рүү шахдаг байсан. Каталог
   одоо BrowseView ("Судлах") дээр амьдарна; нүүр нь зөвхөн "юунаас эхлэх вэ"-г хариулна. */
import { useMemo, useState } from "react";
import type { Track as BaseTrack, ListeningStats, Playlist } from "@/types/track";
import type { ViewName } from "@/components/providers/PlayerProvider";
import { fmtDur } from "@/lib/player/format";
import CarouselRow from "./CarouselRow";
import TrackCard from "./TrackCard";

type Track = BaseTrack & { custom?: boolean };

function greeting() {
  const h = new Date().getHours();
  if (h < 6) return "Сайхан шөнө";
  if (h < 12) return "Өглөөний мэнд";
  if (h < 18) return "Өдрийн мэнд";
  return "Оройн мэнд";
}

/* Төрөл бүрийн "мэдрэхүйн" өнгө — давтамж→өнгө зарчмаас (бас=дулаан, өндөр=хүйтэн) */
const GENRE_TINT: Record<string, string> = {
  Электрон: "from-[rgba(56,232,206,.24)] to-[rgba(56,232,206,.03)]",
  Чилл: "from-[rgba(120,160,255,.22)] to-[rgba(120,160,255,.03)]",
  "Синт поп": "from-[rgba(180,156,255,.24)] to-[rgba(180,156,255,.03)]",
  Данс: "from-[rgba(240,140,165,.24)] to-[rgba(240,140,165,.03)]",
  Эмбиент: "from-[rgba(120,220,200,.2)] to-[rgba(120,220,200,.03)]",
  "Электрон рок": "from-[rgba(217,165,76,.24)] to-[rgba(217,165,76,.03)]",
};
const TINT_FALLBACK = "from-white/[.1] to-white/[.01]";

/* Эгнээн доторх карт: доод хязгаар 178px, зай байвал сунаж эгнээг дүүргэнэ (flex-grow),
   багтахгүй бол 178px дээрээ зогсоод хэвтээ гүйлгэлт идэвхжинэ. Ингэснээр дуу цөөн үед
   баруун тал хоосон үлдэхгүй, олон үед carousel хэвээр ажиллана. */
const CELL = "snap-start flex-[1_0_178px] max-w-[250px] max-nav:flex-[1_0_144px]";

function StatPill({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col gap-0.5 py-3 px-4 rounded-xl bg-white/[.035] min-w-0">
      <b className="text-[17px] leading-tight whitespace-nowrap overflow-hidden text-ellipsis">{value}</b>
      <span className="mono !text-[9px] !tracking-[.16em]">{label}</span>
    </div>
  );
}

function Shortcut({ icon, label, onClick }: { icon: string; label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group flex items-center gap-3 p-2.5 pr-4 rounded-xl bg-white/[.04] hover:bg-white/[.075] transition-colors duration-150 text-left focus-visible:outline-none focus-visible:shadow-glow-aqua"
    >
      <span className="w-9 h-9 flex-none rounded-lg bg-white/[.06] flex items-center justify-center text-[15px]" aria-hidden="true">
        {icon}
      </span>
      <b className="text-[13.5px] font-medium">{label}</b>
      <span className="ml-auto text-dim text-xs opacity-0 -translate-x-1 transition-[opacity,transform] duration-150 group-hover:opacity-100 group-hover:translate-x-0" aria-hidden="true">
        →
      </span>
    </button>
  );
}

export default function HomeView({
  genres,
  allTracks,
  curId,
  playing,
  onPlay,
  likes,
  saves,
  onToggleLike,
  onToggleSave,
  onInfo,
  userName,
  recentTracks,
  stats,
  playlists,
  setView,
  onOpenGenre,
  isAdmin,
  isTherapist,
  isParent,
}: {
  genres: string[];
  allTracks: Track[];
  curId: number | string | null;
  playing: boolean;
  onPlay: (t: Track) => void;
  likes: (number | string)[];
  saves: (number | string)[];
  onToggleLike: (id: number | string) => void;
  onToggleSave: (id: number | string) => void;
  onInfo: (t: Track) => void;
  userName?: string;
  recentTracks: Track[];
  stats: ListeningStats | null | undefined;
  playlists: Playlist[];
  setView: (v: ViewName) => void;
  onOpenGenre: (g: string) => void;
  isAdmin: boolean;
  isTherapist: boolean;
  isParent: boolean;
}) {
  /* Дээд талын чип — сонгосон төрлөөр нүүрний эгнээнүүдийг ШУУД ЭНД шүүнэ
     (Судлах руу шилждэггүй; Spotify-ийн All/Music/Podcasts чиптэй ижил зарчим) */
  const [chip, setChip] = useState("Бүгд");

  const firstName = (userName || "").trim().split(/\s+/)[0] || "";
  const topGenre = stats ? Object.entries(stats.byGenre).sort((a, b) => b[1] - a[1])[0]?.[0] : undefined;
  const listenGenres = useMemo(() => genres.filter((g) => g !== "Бүгд"), [genres]);

  const inChip = (t: Track) => chip === "Бүгд" || t.genre === chip;
  const recent = recentTracks.filter(inChip);

  /* Санал болгох: чип → дуртай төрөл → бүх сан. Саяхан сонссоныг давхардуулахгүй. */
  const recentIds = new Set(recent.slice(0, 8).map((t) => t.id));
  const base = chip !== "Бүгд" ? allTracks.filter((t) => t.genre === chip) : topGenre ? allTracks.filter((t) => t.genre === topGenre) : allTracks;
  const picks = (base.length ? base : allTracks).filter((t) => !recentIds.has(t.id));

  const cards = (arr: Track[]) =>
    arr.map((t) => (
      <div className={CELL} key={t.id}>
        <TrackCard
          track={t}
          isCurrent={curId === t.id}
          playing={playing}
          liked={likes.includes(t.id)}
          saved={saves.includes(t.id)}
          onPlay={() => onPlay(t)}
          onToggleLike={() => onToggleLike(t.id)}
          onToggleSave={() => onToggleSave(t.id)}
          onInfo={() => onInfo(t)}
        />
      </div>
    ));

  return (
    <>
      {/* Мэндчилгээ */}
      <div className="relative overflow-hidden rounded-2xl p-6 max-nav:p-5 mb-5 bg-[linear-gradient(135deg,rgba(56,232,206,.11),rgba(56,232,206,.02)_55%,transparent)]">
        <h1 className="font-display font-bold text-[25px] max-nav:text-[20px] tracking-[-.035em] leading-tight text-ink">
          {greeting()}
          {firstName ? `, ${firstName}` : ""}
        </h1>
        <p className="mt-1.5 text-dim text-[13.5px] max-w-[52ch]">
          {recentTracks.length > 0 ? "Сүүлд сонссоноо үргэлжлүүлэх үү, эсвэл шинэ дуу нээх үү?" : "Дуу сонгоод чичиргээ, гэрэл, хөдөлгөөнөөр мэдэрч эхлээрэй."}
        </p>
        <div className="flex gap-2.5 flex-wrap mt-4">
          <button
            onClick={() => setView("browse")}
            className="rounded-full text-[13px] font-semibold bg-aqua text-[#04100E] py-2.5 px-5 transition-[background,transform,box-shadow] duration-250 hover:bg-[#6FF3DE] hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(56,232,206,.35)] focus-visible:outline-none focus-visible:shadow-glow-aqua"
          >
            Дуу судлах →
          </button>
          {recentTracks[0] && (
            <button
              onClick={() => onPlay(recentTracks[0])}
              className="rounded-full text-[13px] font-medium bg-white/[.06] text-ink py-2.5 px-5 transition-colors duration-250 hover:bg-white/[.1] focus-visible:outline-none focus-visible:shadow-glow-aqua"
            >
              ▶ Үргэлжлүүлэх
            </button>
          )}
        </div>
      </div>

      {/* Шүүлтүүрийн чип */}
      <div className="flex gap-2 flex-wrap mb-6" role="group" aria-label="Нүүрний шүүлтүүр">
        {["Бүгд", ...listenGenres].map((g) => (
          <button
            key={g}
            onClick={() => setChip(g)}
            aria-pressed={chip === g}
            className={
              "text-[13px] rounded-full py-1.5 px-3.5 transition-[background,color] duration-200 focus-visible:outline-none focus-visible:shadow-glow-aqua " +
              (chip === g ? "bg-aqua text-[#04100E] font-semibold" : "bg-white/[.06] text-ink hover:bg-white/[.11]")
            }
          >
            {g}
          </button>
        ))}
      </div>

      {/* Үргэлжлүүлэн сонсох */}
      {recent.length > 0 && (
        <CarouselRow title="Үргэлжлүүлэн сонсох" onShowAll={() => setView("recent")}>
          {cards(recent.slice(0, 12))}
        </CarouselRow>
      )}

      {/* Санал болгох */}
      {picks.length > 0 && (
        <CarouselRow
          title={chip !== "Бүгд" ? chip : topGenre ? `${topGenre} — таны дуртай` : "Танд зориулав"}
          description={chip === "Бүгд" && topGenre ? "Хамгийн их сонссон төрлөөс чинь сонгов" : undefined}
          onShowAll={() => setView("browse")}
        >
          {cards(picks.slice(0, 12))}
        </CarouselRow>
      )}

      {/* Дуртай дуунууд */}
      {likes.length > 0 && (
        <CarouselRow title="Дуртай дуунууд" onShowAll={() => setView("liked")}>
          {cards(allTracks.filter((t) => likes.includes(t.id) && inChip(t)).slice(0, 12))}
        </CarouselRow>
      )}

      {/* Төрлөөр нээх */}
      <CarouselRow title="Төрлөөр нээх" description="Төрөл бүр өөр хэмнэл, өөр мэдрэмж">
        {listenGenres.map((g) => (
          <button
            key={g}
            onClick={() => onOpenGenre(g)}
            className={
              "snap-start flex-[1_0_186px] max-w-[280px] max-nav:flex-[1_0_150px] h-[92px] relative overflow-hidden rounded-xl p-4 text-left transition-transform duration-300 ease-[cubic-bezier(.16,.8,.24,1)] hover:-translate-y-1 focus-visible:outline-none focus-visible:shadow-glow-aqua bg-gradient-to-br " +
              (GENRE_TINT[g] || TINT_FALLBACK)
            }
          >
            <b className="font-display font-semibold text-[15px] tracking-[-.02em]">{g}</b>
            <span className="block mt-1 text-[11.5px] text-dim">{allTracks.filter((t) => t.genre === g).length} дуу</span>
          </button>
        ))}
      </CarouselRow>

      {/* Товч дүр зураг */}
      {stats && stats.total > 0 && (
        <section className="mb-8">
          <div className="flex items-end justify-between gap-4 mb-3.5">
            <h2 className="font-display font-semibold text-[19px] max-nav:text-[16px] tracking-[-.025em] text-ink">Товч дүр зураг</h2>
            <button onClick={() => setView("stats")} className="text-[12px] font-medium text-dim hover:text-ink transition-colors duration-150 focus-visible:outline-none focus-visible:text-aqua rounded-sm">
              Дэлгэрэнгүй
            </button>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-2">
            <StatPill value={fmtDur(stats.total)} label="Нийт сонссон" />
            <StatPill value={String(Object.keys(stats.byTrack).length)} label="Сонссон дуу" />
            <StatPill value={topGenre || "—"} label="Топ төрөл" />
            <StatPill value={String(playlists.length)} label="Жагсаалт" />
          </div>
        </section>
      )}

      {/* Товчлол */}
      <section className="mb-4">
        <h2 className="font-display font-semibold text-[19px] max-nav:text-[16px] tracking-[-.025em] text-ink mb-3.5">Товчлол</h2>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-2">
          <Shortcut icon="🎧" label="Миний жагсаалт" onClick={() => setView("playlists")} />
          <Shortcut icon="🕐" label="Сонссон түүх" onClick={() => setView("history")} />
          <Shortcut icon="📈" label="Миний ахиц" onClick={() => setView("progress")} />
          <Shortcut icon="🏆" label="Амжилтууд" onClick={() => setView("achievements")} />
          <Shortcut icon="📱" label="Төхөөрөмж холбох" onClick={() => setView("devices")} />
          {isAdmin && <Shortcut icon="🛠" label="Хяналтын самбар" onClick={() => setView("admin")} />}
          {isTherapist && <Shortcut icon="🧑‍⚕️" label="Эмчийн самбар" onClick={() => setView("therapist")} />}
          {isParent && <Shortcut icon="👨‍👩‍👧" label="Эцэг эхийн самбар" onClick={() => setView("parent")} />}
        </div>
      </section>
    </>
  );
}

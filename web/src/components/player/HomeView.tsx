"use client";

/* Нүүр — Player.tsx-аас тусад нь гаргасан. Премиум "welcoming dashboard" болгож шинэчлэв
   (Spotify/Apple Music-ийн Home pattern): мэндчилгээ, үргэлжлүүлэн сонсох, статистикийн
   хураангуй, дуртай жагсаалт, дүрд тохирсон товчлол — БҮГД одоо байгаа өгөгдлөөс гаргасан
   (шинэ backend/state үүсгээгүй, зөвхөн Player.tsx-ийн аль хэдийн байгаа props-ыг доош
   дамжуулав). Тоглуулах/дуртай/хадгалах/мэдээлэл харах гэх мэт бүх click handler хэвээр.
   LikeBtn/SaveBtn/InfoBtn-г шууд импортлов (Player-ийн closure-оор биш).
   Props: genres, genre, onGenre, list, query, curId, playing, onPlay,
          likes, saves, onToggleLike, onToggleSave, onInfo,
          userName, recentTracks, stats, playlists, setView, isAdmin, isTherapist, isParent */
import type { Track as BaseTrack } from "@/types/track";
import type { ListeningStats, Playlist } from "@/types/track";
import { LikeBtn, SaveBtn, InfoBtn } from "./TrackButtons";
import { SectionTitle } from "@/components/ui/PageHeader";
import { Empty } from "@/components/ui/States";
import { fmtDur } from "@/lib/player/format";
import type { ViewName } from "@/components/player/Player";

type Track = BaseTrack & { custom?: boolean };

function greeting() {
  const h = new Date().getHours();
  if (h < 6) return "Сайхан шөнө";
  if (h < 12) return "Өглөөний мэнд";
  if (h < 18) return "Өдрийн мэнд";
  return "Оройн мэнд";
}

function QuickAction({ icon, label, onClick }: { icon: string; label: string; onClick: () => void }) {
  return (
    <button
      className="flex items-center gap-2.5 py-2.5 px-4 rounded-full border border-white/[.08] bg-white/[.04] text-[13.5px] font-medium text-ink transition-colors duration-150 hover:bg-white/[.08] focus-visible:outline-none focus-visible:shadow-glow-aqua whitespace-nowrap"
      onClick={onClick}
    >
      <span aria-hidden="true">{icon}</span>
      {label}
    </button>
  );
}

export default function HomeView({
  genres, genre, onGenre, list, query, curId, playing, onPlay,
  likes, saves, onToggleLike, onToggleSave, onInfo,
  userName, recentTracks, stats, playlists, setView, isAdmin, isTherapist, isParent,
}: {
  genres: string[];
  genre: string;
  onGenre: (g: string) => void;
  list: Track[];
  query: string;
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
  isAdmin: boolean;
  isTherapist: boolean;
  isParent: boolean;
}) {
  const firstName = (userName || "").trim().split(/\s+/)[0] || "";
  const topGenre = stats ? Object.entries(stats.byGenre).sort((a, b) => b[1] - a[1])[0] : undefined;

  return (
    <>
      {/* Мэндчилгээ + шуурхай товчлол */}
      <div className="mb-8">
        <h1 className="font-display font-bold text-[26px] max-nav:text-[21px] tracking-[-.03em] leading-tight text-ink">
          {greeting()}
          {firstName ? `, ${firstName}` : ""} 👋
        </h1>
        <p className="mt-1.5 text-dim text-[14px]">Өнөөдөр юу сонсох вэ?</p>

        <div className="flex gap-2.5 flex-wrap mt-5">
          <QuickAction icon="🎧" label="Жагсаалтууд" onClick={() => setView("playlists")} />
          <QuickAction icon="🕐" label="Сонссон түүх" onClick={() => setView("history")} />
          <QuickAction icon="📈" label="Миний ахиц" onClick={() => setView("progress")} />
          <QuickAction icon="🏆" label="Амжилтууд" onClick={() => setView("achievements")} />
          {isAdmin && <QuickAction icon="🛠" label="Хяналтын самбар" onClick={() => setView("admin")} />}
          {isTherapist && <QuickAction icon="🧑‍⚕️" label="Эмчийн самбар" onClick={() => setView("therapist")} />}
          {isParent && <QuickAction icon="👨‍👩‍👧" label="Эцэг эхийн самбар" onClick={() => setView("parent")} />}
        </div>
      </div>

      {/* Үргэлжлүүлэн сонсох */}
      {recentTracks.length > 0 && (
        <div className="mb-9">
          <SectionTitle title="Үргэлжлүүлэн сонсох" />
          <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-3">
            {recentTracks.slice(0, 4).map((t) => {
              const isCur = curId === t.id;
              return (
                <button
                  key={t.id}
                  className={
                    "group flex items-center gap-3 p-2.5 rounded-xl border text-left transition-colors duration-200 focus-visible:outline-none focus-visible:shadow-glow-aqua " +
                    (isCur ? "bg-aqua/[.07] border-aqua/35" : "bg-white/[.03] border-white/[.06] hover:bg-white/[.06]")
                  }
                  onClick={() => onPlay(t)}
                >
                  <span className="relative w-12 h-12 rounded-lg overflow-hidden flex-none bg-[#0B1211]">
                    <img src={t.cover} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
                    <span
                      className={
                        "absolute inset-0 flex items-center justify-center bg-black/40 text-white text-base transition-opacity duration-150 " +
                        (isCur && playing ? "opacity-100" : "opacity-0 group-hover:opacity-100")
                      }
                      aria-hidden="true"
                    >
                      {isCur && playing ? "⏸" : "▶"}
                    </span>
                  </span>
                  <span className="min-w-0">
                    <b className="block font-semibold text-[13.5px] whitespace-nowrap overflow-hidden text-ellipsis">{t.title}</b>
                    <i className="not-italic text-xs text-dim whitespace-nowrap overflow-hidden text-ellipsis">{t.artist}</i>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Статистикийн хураангуй */}
      {stats && stats.total > 0 && (
        <div className="mb-9">
          <SectionTitle title="Миний статистик" actions={<QuickAction icon="📊" label="Дэлгэрэнгүй" onClick={() => setView("stats")} />} />
          <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3.5">
            <div className="flex flex-row items-center gap-4 p-[18px_20px] rounded-md bg-[linear-gradient(180deg,rgba(255,255,255,.035),rgba(255,255,255,.01))] border border-white/[.09]">
              <span className="flex flex-col gap-0.5 min-w-0">
                <b className="text-[clamp(17px,1.8vw,22px)] leading-[1.15]">{fmtDur(stats.total)}</b>
                <span className="mono !text-[9px] !tracking-[.18em]">Нийт сонссон</span>
              </span>
            </div>
            <div className="flex flex-row items-center gap-4 p-[18px_20px] rounded-md bg-[linear-gradient(180deg,rgba(255,255,255,.035),rgba(255,255,255,.01))] border border-white/[.09]">
              <span className="flex flex-col gap-0.5 min-w-0">
                <b className="text-[clamp(17px,1.8vw,22px)] leading-[1.15]">{Object.keys(stats.byTrack).length}</b>
                <span className="mono !text-[9px] !tracking-[.18em]">Сонссон дуу</span>
              </span>
            </div>
            <div className="flex flex-row items-center gap-4 p-[18px_20px] rounded-md bg-[linear-gradient(180deg,rgba(255,255,255,.035),rgba(255,255,255,.01))] border border-white/[.09]">
              <span className="flex flex-col gap-0.5 min-w-0">
                <b className="text-[clamp(17px,1.8vw,22px)] leading-[1.15] whitespace-nowrap overflow-hidden text-ellipsis">{topGenre ? topGenre[0] : "—"}</b>
                <span className="mono !text-[9px] !tracking-[.18em]">Топ төрөл</span>
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Дуртай жагсаалт */}
      {playlists.length > 0 && (
        <div className="mb-9">
          <SectionTitle title="Миний жагсаалт" actions={<QuickAction icon="🎧" label="Бүгдийг харах" onClick={() => setView("playlists")} />} />
          <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-3.5">
            {playlists.slice(0, 4).map((p) => (
              <button
                key={p.id}
                className="flex flex-col gap-2.5 text-left p-4 rounded-xl border border-white/[.06] bg-white/[.03] transition-colors duration-150 hover:bg-white/[.06] focus-visible:outline-none focus-visible:shadow-glow-aqua"
                onClick={() => setView("playlists")}
              >
                <span className="w-full aspect-square rounded-lg bg-[linear-gradient(135deg,rgba(56,232,206,.18),rgba(56,232,206,.03))] flex items-center justify-center text-2xl" aria-hidden="true">
                  🎧
                </span>
                <span className="min-w-0">
                  <b className="block font-semibold text-[14px] whitespace-nowrap overflow-hidden text-ellipsis">{p.name}</b>
                  <i className="not-italic text-xs text-dim">{p.tracks.length} дуу</i>
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Төрлөөр шүүх */}
      <div className="flex gap-2 flex-wrap mb-8" role="group" aria-label="Төрлөөр шүүх">
        {genres.map((g) => (
          <button
            key={g}
            className={
              "text-[13px] rounded-full py-2.5 px-[18px] border transition-[background,border-color,color,box-shadow] duration-250 focus-visible:outline-none focus-visible:shadow-glow-aqua " +
              (genre === g
                ? "bg-aqua border-aqua text-[#04100E] font-semibold shadow-[0_4px_18px_rgba(56,232,206,.32)]"
                : "bg-white/[.05] border-white/[.06] text-ink hover:bg-white/10")
            }
            onClick={() => onGenre(g)}
            aria-pressed={genre === g}
          >
            {g}
          </button>
        ))}
      </div>

      <SectionTitle title="Тренд дуунууд" />
      {list.length === 0 && <Empty title={`"${query}" — олдсонгүй`} hint="Өөр түлхүүр үгээр хайж үзнэ үү" />}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(182px,1fr))] gap-5 max-nav:grid-cols-[repeat(auto-fill,minmax(140px,1fr))] max-nav:gap-3.5">
        {list.map((t) => {
          const isCur = curId === t.id
          return (
            <button
              key={t.id}
              className={
                "group flex flex-col gap-1 text-left p-3.5 rounded-xl border transition-[transform,background,border-color,box-shadow] duration-[320ms] ease-[cubic-bezier(.16,.8,.24,1)] text-ink hover:-translate-y-[5px] hover:shadow-lg focus-visible:outline-none focus-visible:shadow-glow-aqua " +
                (isCur
                  ? "bg-aqua/[.06] border-aqua/40 shadow-md"
                  : "bg-white/[.03] border-white/[.06] hover:bg-white/[.055] hover:border-white/[.1]")
              }
              onClick={() => onPlay(t)}
            >
              <span className="relative rounded-lg overflow-hidden aspect-square mb-3 bg-[#0B1211] block shadow-[0_8px_22px_rgba(0,0,0,.35)]">
                <img
                  src={t.cover}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover block transition-transform duration-[600ms] ease-[cubic-bezier(.16,.8,.24,1)] group-hover:scale-[1.08]"
                />
                <LikeBtn id={t.id} active={likes.includes(t.id)} onToggle={() => onToggleLike(t.id)} />
                <SaveBtn id={t.id} active={saves.includes(t.id)} onToggle={() => onToggleSave(t.id)} />
                <InfoBtn t={t} onInfo={() => onInfo(t)} />
                <span
                  className={
                    "absolute right-[9px] bottom-[9px] w-[46px] h-[46px] rounded-full bg-aqua text-[#04100E] flex items-center justify-center text-[15px] transition-[opacity,transform,box-shadow] duration-300 shadow-[0_8px_22px_rgba(0,0,0,.55)] group-hover:shadow-[0_10px_28px_rgba(56,232,206,.4)] " +
                    (isCur && playing ? "opacity-100" : "opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0")
                  }
                  aria-hidden="true"
                >
                  {isCur && playing ? "⏸" : "▶"}
                </span>
                {isCur && playing && (
                  <span className="pl-eq absolute left-2.5 bottom-2.5" aria-hidden="true">
                    <u></u>
                    <u></u>
                    <u></u>
                  </span>
                )}
              </span>
              <b className="font-semibold text-[14.5px] tracking-[-.01em] whitespace-nowrap overflow-hidden text-ellipsis">
                {t.title}
                {t.custom && <em className="not-italic text-[9px] text-aqua border border-aqua/40 rounded-full py-px px-1.5 ml-1.5 align-[1px]">шинэ</em>}
              </b>
              <i className="not-italic text-xs text-dim whitespace-nowrap overflow-hidden text-ellipsis">
                {t.artist} · {t.genre}
              </i>
            </button>
          )
        })}
      </div>

      {list.length > 0 && (
        <>
          <div className="mt-10">
            <SectionTitle title="Бүх дуунууд" />
          </div>
          <div className="flex flex-col gap-0.5">
            {list.map((t, i) => {
              const isCur = curId === t.id
              return (
                <button
                  key={t.id}
                  className={
                    "grid grid-cols-[34px_44px_1fr_auto_34px_34px_30px] gap-3 items-center py-2.5 px-3 rounded-lg text-ink text-left transition-colors duration-250 focus-visible:outline-none focus-visible:shadow-glow-aqua " +
                    (isCur ? "bg-aqua/[.08]" : "hover:bg-white/[.04]")
                  }
                  onClick={() => onPlay(t)}
                >
                  <span className="mono !text-[10px]">{String(i + 1).padStart(2, "0")}</span>
                  <img className="w-11 h-11 rounded-md object-cover shadow-[0_4px_12px_rgba(0,0,0,.3)]" src={t.cover} alt="" loading="lazy" />
                  <span className="flex flex-col min-w-0">
                    <b className="font-semibold text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                      {t.title}
                      {t.custom && <em className="not-italic text-[9px] text-aqua border border-aqua/40 rounded-full py-px px-1.5 ml-1.5 align-[1px]">шинэ</em>}
                    </b>
                    <i className="not-italic text-xs text-dim">{t.artist}</i>
                  </span>
                  <span className="mono !text-[9.5px] max-nav:hidden">{t.genre}</span>
                  <LikeBtn id={t.id} row active={likes.includes(t.id)} onToggle={() => onToggleLike(t.id)} />
                  <SaveBtn id={t.id} row active={saves.includes(t.id)} onToggle={() => onToggleSave(t.id)} />
                  <InfoBtn t={t} row onInfo={() => onInfo(t)} />
                  <span className="text-dim text-xs flex justify-center" aria-hidden="true">
                    {isCur && playing ? (
                      <span className="pl-eq" style={{ height: 14 }}>
                        <u></u>
                        <u></u>
                        <u></u>
                      </span>
                    ) : (
                      "▶"
                    )}
                  </span>
                </button>
              )
            })}
          </div>
        </>
      )}
    </>
  )
}

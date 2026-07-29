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
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeadphones,
  faClockRotateLeft,
  faChartLine,
  faTrophy,
  faGear,
  faUserNurse,
  faPeopleRoof,
  faWandMagicSparkles,
  faFire,
  faCirclePlus,
  faMicrophone,
  faStar,
  faHeart,
  faPlay,
  faPause,
} from "@fortawesome/free-solid-svg-icons";
import type { Track as BaseTrack } from "@/types/track";
import type { ListeningStats, Playlist } from "@/types/track";
import { LikeBtn, SaveBtn, InfoBtn } from "./TrackButtons";
import { SectionTitle } from "@/components/ui/PageHeader";
import { Empty } from "@/components/ui/States";
import { fmtDur } from "@/lib/player/format";
import { scoreRecommendations } from "@/lib/player/recommendations";
import * as songsApi from "@/lib/api/client";
import type { ViewName } from "@/components/player/Player";

type Track = BaseTrack & { custom?: boolean };

function greeting() {
  const h = new Date().getHours();
  if (h < 6) return "Сайхан шөнө";
  if (h < 12) return "Өглөөний мэнд";
  if (h < 18) return "Өдрийн мэнд";
  return "Оройн мэнд";
}

function QuickAction({ icon, label, onClick }: { icon: ReactNode; label: string; onClick: () => void }) {
  return (
    <button
      className="flex items-center gap-2.5 py-2.5 px-4 rounded-full border border-white/[.08] bg-white/[.04] text-[13.5px] font-medium text-ink transition-colors duration-150 hover:bg-white/[.08] focus-visible:outline-none focus-visible:shadow-glow-aqua whitespace-nowrap"
      onClick={onClick}
    >
      <span className="text-aqua w-[15px] text-center" aria-hidden="true">{icon}</span>
      {label}
    </button>
  );
}

/* Horizontally-scrollable dashboard row — Continue Listening / Recently Played /
   Favorites / Trending бүгд ижил rail загвараар. */
function TrackRail({
  tracks,
  curId,
  playing,
  onPlay,
  likes,
  saves,
  onToggleLike,
  onToggleSave,
  onInfo,
  ariaLabel,
}: {
  tracks: Track[];
  curId: number | string | null;
  playing: boolean;
  onPlay: (t: Track) => void;
  likes: (number | string)[];
  saves: (number | string)[];
  onToggleLike: (id: number | string) => void;
  onToggleSave: (id: number | string) => void;
  onInfo: (t: Track) => void;
  ariaLabel: string;
}) {
  return (
    <div className="relative isolate flex gap-3.5 overflow-x-auto pt-2 pb-2 -mx-1 px-1 [scrollbar-width:thin] [scrollbar-color:var(--faint)_transparent]" role="list" aria-label={ariaLabel}>
      {tracks.map((t) => {
        const isCur = curId === t.id;
        return (
          <motion.button
            key={t.id}
            role="listitem"
            className={
              "group relative flex-none w-[168px] text-left p-3 rounded-[16px] border transition-colors duration-200 hover:z-10 focus-visible:z-10 focus-visible:outline-none focus-visible:shadow-glow-aqua " +
              (isCur ? "bg-aqua/[.07] border-aqua/35" : "bg-white/[.03] border-white/[.06] hover:bg-white/[.055] hover:border-white/[.1]")
            }
            onClick={() => onPlay(t)}
            whileHover={{ y: -4 }}
          >
            <span className="relative rounded-xl overflow-hidden aspect-square mb-2.5 bg-[#0B1211] block">
              <img src={t.cover} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.06]" />
              <LikeBtn id={t.id} active={likes.includes(t.id)} onToggle={() => onToggleLike(t.id)} />
              <SaveBtn id={t.id} active={saves.includes(t.id)} onToggle={() => onToggleSave(t.id)} />
              <InfoBtn t={t} onInfo={() => onInfo(t)} />
              <span
                className={
                  "absolute right-2 bottom-2 w-9 h-9 rounded-full bg-aqua text-[#04100E] flex items-center justify-center text-[13px] transition-[opacity,transform] duration-250 shadow-[0_6px_18px_rgba(0,0,0,.5)] " +
                  (isCur && playing ? "opacity-100" : "opacity-0 translate-y-1.5 group-hover:opacity-100 group-hover:translate-y-0")
                }
                aria-hidden="true"
              >
                <FontAwesomeIcon icon={isCur && playing ? faPause : faPlay} />
              </span>
            </span>
            <b className="block font-semibold text-[13px] whitespace-nowrap overflow-hidden text-ellipsis">{t.title}</b>
            <i className="not-italic text-[11.5px] text-dim whitespace-nowrap overflow-hidden text-ellipsis block">{t.artist}</i>
          </motion.button>
        );
      })}
    </div>
  );
}

export default function HomeView({
  genres, genre, onGenre, list, allTracks, query, curId, playing, onPlay,
  likes, saves, onToggleLike, onToggleSave, onInfo, onOpenArtist,
  userName, recentTracks, likedTracks, stats, playlists, setView, isAdmin, isTherapist, isParent,
}: {
  genres: string[];
  genre: string;
  onGenre: (g: string) => void;
  list: Track[];
  allTracks: Track[];
  query: string;
  curId: number | string | null;
  playing: boolean;
  onPlay: (t: Track) => void;
  likes: (number | string)[];
  saves: (number | string)[];
  onToggleLike: (id: number | string) => void;
  onToggleSave: (id: number | string) => void;
  onInfo: (t: Track) => void;
  onOpenArtist: (artistId: string) => void;
  userName?: string;
  recentTracks: Track[];
  likedTracks: Track[];
  stats: ListeningStats | null | undefined;
  playlists: Playlist[];
  setView: (v: ViewName) => void;
  isAdmin: boolean;
  isTherapist: boolean;
  isParent: boolean;
}) {
  const firstName = (userName || "").trim().split(/\s+/)[0] || "";
  const topGenre = stats ? Object.entries(stats.byGenre).sort((a, b) => b[1] - a[1])[0] : undefined;

  /* Хамгийн алдартай (ListenHistory тоолуураар), Сүүлийн үеийн (createdAt), Онцлох
     (админ гараар тэмдэглэсэн featured=true) — гурав нь backend/songs.service.ts-ийн
     бодит query, зохиомол/хуурамч эрэмбэ биш. allTracks (static+backend+custom)-аас
     тусад нь, зөвхөн backend Song каталогийг ашиглана (id-үүд тааралдвал ALL-аас
     тохирох PlayerTrack-ыг ашиглаж, play/like/save handler-ууд зөв ажиллана). */
  const [popularIds, setPopularIds] = useState<(number | string)[]>([]);
  const [recentIds, setRecentIds] = useState<(number | string)[]>([]);
  const [featuredIds, setFeaturedIds] = useState<(number | string)[]>([]);

  useEffect(() => {
    songsApi.getPopularSongs().then((rows) => setPopularIds(rows.map((s) => s.id))).catch(() => {});
    songsApi.getRecentSongs().then((rows) => setRecentIds(rows.map((s) => s.id))).catch(() => {});
    songsApi.getFeaturedSongs().then((rows) => setFeaturedIds(rows.map((s) => s.id))).catch(() => {});
  }, []);

  /* Алдартай дуучид — GET /artists (бодит backend, artists.controller.ts). Дугуй
     зурагтай карт, дарахад ArtistView (onOpenArtist) руу шилжинэ. */
  const [artists, setArtists] = useState<Awaited<ReturnType<typeof songsApi.listArtists>>>([]);
  useEffect(() => {
    songsApi.listArtists().then(setArtists).catch(() => {});
  }, []);

  /* backend-ээс ирсэн id-үүдийг allTracks (Player.tsx-ийн ALL, songId/play/history-той
     бүрэн PlayerTrack)-аас олж тохируулна — ингэснээр onPlay/onInfo/like/save бүгд
     одоо байгаа playTrack()/logHistory() урсгалаар яг адилхан ажиллана, шинэ playback
     логик үүсгэхгүй. */
  const byBackendId = useMemo(() => new Map(allTracks.map((t) => [String(t.id), t])), [allTracks]);
  const popularSongs = useMemo(() => popularIds.map((id) => byBackendId.get(String(id))).filter((t): t is Track => !!t), [popularIds, byBackendId]);
  const recentSongs = useMemo(() => recentIds.map((id) => byBackendId.get(String(id))).filter((t): t is Track => !!t), [recentIds, byBackendId]);
  const featuredSongs = useMemo(() => featuredIds.map((id) => byBackendId.get(String(id))).filter((t): t is Track => !!t), [featuredIds, byBackendId]);

  /* AI-санал болгол — зөвхөн бодит дата (stats.byGenre/byTrack, likes, saves, recentTracks)
     дээр тооцоологдоно, backend дуудлагагүй. curId-г хасаж одоо тоглож буй дууг санал
     болгохгүй. */
  const recommendations = useMemo(
    () =>
      scoreRecommendations(allTracks, {
        stats,
        likedIds: likes,
        savedIds: saves,
        recentTracks,
        excludeIds: curId != null ? [curId] : [],
        limit: 10,
      }),
    [allTracks, stats, likes, saves, recentTracks, curId],
  );

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
          <QuickAction icon={<FontAwesomeIcon icon={faHeadphones} />} label="Жагсаалтууд" onClick={() => setView("playlists")} />
          <QuickAction icon={<FontAwesomeIcon icon={faClockRotateLeft} />} label="Сонссон түүх" onClick={() => setView("history")} />
          <QuickAction icon={<FontAwesomeIcon icon={faChartLine} />} label="Миний ахиц" onClick={() => setView("progress")} />
          <QuickAction icon={<FontAwesomeIcon icon={faTrophy} />} label="Амжилтууд" onClick={() => setView("achievements")} />
          {isAdmin && <QuickAction icon={<FontAwesomeIcon icon={faGear} />} label="Хяналтын самбар" onClick={() => setView("admin")} />}
          {isTherapist && <QuickAction icon={<FontAwesomeIcon icon={faUserNurse} />} label="Эмчийн самбар" onClick={() => setView("therapist")} />}
          {isParent && <QuickAction icon={<FontAwesomeIcon icon={faPeopleRoof} />} label="Эцэг эхийн самбар" onClick={() => setView("parent")} />}
        </div>
      </div>

      {/* Алдартай дуучид — дугуй зурагтай rail, дарахад ArtistView (GET /artists/:id) руу
          шилжинэ. Home хуудасны хамгийн дээд хэсэгт, мэндчилгээний доор шууд харагдана. */}
      {artists.length > 0 && (
        <div className="mb-9">
          <SectionTitle title="Алдартай дуучид" />
          <div className="relative isolate flex gap-4 overflow-x-auto pt-4 pb-2 -mx-1 px-1 [scrollbar-width:thin] [scrollbar-color:var(--faint)_transparent]" role="list" aria-label="Алдартай дуучид">
            {artists.map((a) => (
              <motion.button
                key={a.id}
                role="listitem"
                className="group relative flex-none w-[120px] flex flex-col items-center gap-2.5 text-center focus-visible:outline-none rounded-2xl hover:z-10 focus-visible:z-10"
                onClick={() => onOpenArtist(a.id)}
                whileHover={{ y: -4 }}
              >
                <span className="relative w-[104px] h-[104px] rounded-full overflow-hidden bg-[linear-gradient(135deg,rgba(56,232,206,.2),rgba(56,232,206,.03))] flex items-center justify-center shadow-[0_10px_28px_rgba(0,0,0,.4)] transition-shadow duration-250 group-hover:shadow-[0_12px_32px_rgba(56,232,206,.25)] group-focus-visible:shadow-glow-aqua">
                  {a.photoUrl ? (
                    <img src={a.photoUrl} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
                  ) : (
                    <FontAwesomeIcon icon={faMicrophone} className="text-2xl text-aqua/70" aria-hidden="true" />
                  )}
                </span>
                <span className="min-w-0 w-full">
                  <b className="block font-semibold text-[13px] whitespace-nowrap overflow-hidden text-ellipsis">{a.name}</b>
                  {a._count && <i className="not-italic text-[11px] text-dim">{a._count.songs} дуу</i>}
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* Үргэлжлүүлэн сонсох — horizontal rail */}
      {recentTracks.length > 0 && (
        <div className="mb-9">
          <SectionTitle title="Үргэлжлүүлэн сонсох" />
          <TrackRail
            tracks={recentTracks}
            curId={curId}
            playing={playing}
            onPlay={onPlay}
            likes={likes}
            saves={saves}
            onToggleLike={onToggleLike}
            onToggleSave={onToggleSave}
            onInfo={onInfo}
            ariaLabel="Үргэлжлүүлэн сонсох"
          />
        </div>
      )}

      {/* AI-санал болгол — зөвхөн бодит stats/likes/saves/recent дата дээр тооцоологдоно. */}
      {recommendations.length > 0 ? (
        <div className="mb-9">
          <SectionTitle title={<><FontAwesomeIcon icon={faWandMagicSparkles} className="text-aqua mr-2" />Танд санал болгож байна</>} />
          <div className="relative isolate flex gap-3.5 overflow-x-auto pt-2 pb-2 -mx-1 px-1 [scrollbar-width:thin] [scrollbar-color:var(--faint)_transparent]" role="list" aria-label="Санал болгож буй дуунууд">
            {recommendations.map((rec, i) => {
              const t = rec.track;
              const isCur = curId === t.id;
              return (
                <motion.button
                  key={t.id}
                  role="listitem"
                  className="group relative flex-none w-[168px] text-left rounded-[18px] p-[1.5px] hover:z-10 focus-visible:z-10 [background:linear-gradient(140deg,rgba(56,232,206,.5),rgba(56,232,206,.06)_50%,rgba(56,232,206,.35))] focus-visible:outline-none focus-visible:shadow-glow-aqua"
                  onClick={() => onPlay(t)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(i, 7) * 0.04, duration: 0.28 }}
                  whileHover={{ y: -4 }}
                  aria-label={`${t.title} — ${t.artist}. ${rec.reasons[0] || "Санал болгож байна"}`}
                >
                  <div className="rounded-[16.5px] p-3 bg-[rgba(13,19,18,.85)] backdrop-blur-xl h-full">
                    <span className="relative rounded-xl overflow-hidden aspect-square mb-2.5 bg-[#0B1211] block">
                      <img src={t.cover} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.06]" />
                      <span
                        className="absolute top-2 left-2 inline-flex items-center gap-1 rounded-full bg-black/55 backdrop-blur-sm text-aqua text-[10px] font-mono py-1 px-2"
                        aria-hidden="true"
                      >
                        <FontAwesomeIcon icon={faWandMagicSparkles} /> AI
                      </span>
                      <span
                        className={
                          "absolute right-2 bottom-2 w-9 h-9 rounded-full bg-aqua text-[#04100E] flex items-center justify-center text-[13px] transition-[opacity,transform] duration-250 shadow-[0_6px_18px_rgba(0,0,0,.5)] " +
                          (isCur && playing ? "opacity-100" : "opacity-0 translate-y-1.5 group-hover:opacity-100 group-hover:translate-y-0")
                        }
                        aria-hidden="true"
                      >
                        <FontAwesomeIcon icon={isCur && playing ? faPause : faPlay} />
                      </span>
                    </span>
                    <b className="block font-semibold text-[13px] whitespace-nowrap overflow-hidden text-ellipsis">{t.title}</b>
                    <i className="not-italic text-[11.5px] text-dim whitespace-nowrap overflow-hidden text-ellipsis block mb-1.5">{t.artist}</i>
                    <span className="inline-flex text-[9.5px] font-mono uppercase tracking-[.04em] rounded-full py-1 px-2 border border-white/[.1] text-faint mb-1.5">
                      {t.genre}
                    </span>
                    {rec.reasons[0] && (
                      <span className="block text-[10.5px] text-aqua/85 leading-[1.35] line-clamp-2">{rec.reasons[0]}</span>
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="mb-9">
          <SectionTitle title={<><FontAwesomeIcon icon={faWandMagicSparkles} className="text-aqua mr-2" />Танд санал болгож байна</>} />
          <Empty icon="✨" title="Санал болгох хангалттай мэдээлэл алга." hint="Дуу сонсож, дуртай/хадгалах дээр дарж эхэлбэл энд танд тохирсон дуу санал болгоно" />
        </div>
      )}

      {/* Дуртай дуунууд — horizontal rail */}
      {likedTracks.length > 0 && (
        <div className="mb-9">
          <SectionTitle title="Дуртай дуунууд" actions={<QuickAction icon={<FontAwesomeIcon icon={faHeart} />} label="Бүгдийг харах" onClick={() => setView("liked")} />} />
          <TrackRail
            tracks={likedTracks}
            curId={curId}
            playing={playing}
            onPlay={onPlay}
            likes={likes}
            saves={saves}
            onToggleLike={onToggleLike}
            onToggleSave={onToggleSave}
            onInfo={onInfo}
            ariaLabel="Дуртай дуунууд"
          />
        </div>
      )}

      {/* Статистикийн хураангуй */}
      {stats && stats.total > 0 && (
        <div className="mb-9">
          <SectionTitle title="Миний статистик" actions={<QuickAction icon={<FontAwesomeIcon icon={faChartLine} />} label="Дэлгэрэнгүй" onClick={() => setView("stats")} />} />
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
          <SectionTitle title="Миний жагсаалт" actions={<QuickAction icon={<FontAwesomeIcon icon={faHeadphones} />} label="Бүгдийг харах" onClick={() => setView("playlists")} />} />
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

      {/* Онцлох — админ гараар тэмдэглэсэн (Song.featured), бодит backend query */}
      {featuredSongs.length > 0 && (
        <div className="mb-9">
          <SectionTitle title={<><FontAwesomeIcon icon={faStar} className="text-aqua mr-2" />Онцлох</>} />
          <TrackRail
            tracks={featuredSongs}
            curId={curId}
            playing={playing}
            onPlay={onPlay}
            likes={likes}
            saves={saves}
            onToggleLike={onToggleLike}
            onToggleSave={onToggleSave}
            onInfo={onInfo}
            ariaLabel="Онцлох дуунууд"
          />
        </div>
      )}

      {/* Хамгийн алдартай — ListenHistory тоолуураар (бодит тоглуулалтын давтамж) */}
      {popularSongs.length > 0 && (
        <div className="mb-9">
          <SectionTitle title={<><FontAwesomeIcon icon={faFire} className="text-aqua mr-2" />Хамгийн алдартай</>} />
          <TrackRail
            tracks={popularSongs}
            curId={curId}
            playing={playing}
            onPlay={onPlay}
            likes={likes}
            saves={saves}
            onToggleLike={onToggleLike}
            onToggleSave={onToggleSave}
            onInfo={onInfo}
            ariaLabel="Хамгийн алдартай дуунууд"
          />
        </div>
      )}

      {/* Сүүлийн үеийн — createdAt-аар эрэмбэлсэн шинэ дуунууд */}
      {recentSongs.length > 0 && (
        <div className="mb-9">
          <SectionTitle title={<><FontAwesomeIcon icon={faCirclePlus} className="text-aqua mr-2" />Сүүлийн үеийн</>} />
          <TrackRail
            tracks={recentSongs}
            curId={curId}
            playing={playing}
            onPlay={onPlay}
            likes={likes}
            saves={saves}
            onToggleLike={onToggleLike}
            onToggleSave={onToggleSave}
            onInfo={onInfo}
            ariaLabel="Сүүлийн үеийн дуунууд"
          />
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

      <SectionTitle title="Бүх дуунуудаас хайх" />
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
                  <FontAwesomeIcon icon={isCur && playing ? faPause : faPlay} />
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
                      <FontAwesomeIcon icon={faPlay} />
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

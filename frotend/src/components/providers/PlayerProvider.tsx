"use client";

/* Тоглуулагчийн бүх төлөв (аудио, дуртай/хадгалсан, тохиргоо, статистик) энд амьдарна.

   Яагаад provider вэ: Next.js App Router-т layout нь route солигдоход ДАХИН
   ачаалагддаггүй. Тиймээс <audio> элемент болон тоглуулалтын төлөв layout дотор
   байрлавал хэрэглэгч /home → /browse → /stats гэж явахад дуу тасрахгүй.
   (Өмнө нь энэ бүхэн Player.tsx дотор `view` state-ээр удирдагддаг SPA байсан.) */
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { TRACKS } from "@/lib/data/tracks";
import { idbGet } from "@/lib/data/idb";
import { loadCustomMeta, loadFeed, getReadTs, markFeedRead, loadStats, saveStats, todayKey, loadPlaylists } from "@/lib/data/library";
import Calibrate from "@/components/player/Calibrate";
import TopBar from "@/components/layout/TopBar";
import Sidebar from "@/components/layout/Sidebar";
import PageContainer from "@/components/layout/PageContainer";
import { ActionButton } from "@/components/ui/ActionGroup";
import { PREVIEW_SEC, VIB_LEVELS, LIGHT_LEVELS, DEFAULT_PREFS, FEEL, FEEL_DEFAULT } from "@/lib/player/constants";
import ImmersiveMode from "@/components/player/ImmersiveMode";
import type { VizMode, BeatFlash } from "@/lib/player/visualizer-modes";
import NowPlayingPanel from "@/components/player/NowPlayingPanel";
import PlayerHeader from "@/components/player/PlayerHeader";
import PlaybackControls from "@/components/player/PlaybackControls";
import ActionToolbar from "@/components/player/ActionToolbar";
import * as songsApi from "@/lib/api/client";
import { useDeviceSync } from "@/lib/socket/useDeviceSync";
import { BeatScheduler } from "@/lib/audio/beat-scheduler";
import type { SessionUser } from "@/types/auth";
import type { ListeningStats, Track } from "@/types/track";

export type PlayerTrack = Track & { custom?: boolean; songId?: string };

/* Дэлгэц бүр одоо БОДИТ route болсон. ViewName-ийг Sidebar/TopBar-ын идэвхтэй
   төлвийг тэмдэглэхэд л ашиглана — навигаци нь router.push-аар явна. */
export type ViewName =
  | "home"
  | "browse"
  | "stats"
  | "billing"
  | "help"
  | "detail"
  | "admin"
  | "profile"
  | "devices"
  | "playlists"
  | "liked"
  | "saved"
  | "recent"
  | "analysis"
  | "history"
  | "therapist"
  | "progress"
  | "achievements"
  | "parent"
  | "upload";

/* ViewName ↔ URL зураглал — нэг эх сурвалж, Sidebar/TopBar/провайдер бүгд үүнийг ашиглана */
export const VIEW_PATH: Record<ViewName, string> = {
  home: "/home",
  browse: "/browse",
  stats: "/stats",
  billing: "/billing",
  help: "/help",
  detail: "/home",
  admin: "/admin",
  profile: "/profile",
  devices: "/devices",
  playlists: "/playlists",
  liked: "/liked",
  saved: "/saved",
  recent: "/recent",
  analysis: "/history",
  history: "/history",
  therapist: "/therapist",
  progress: "/progress",
  achievements: "/achievements",
  parent: "/parent",
  upload: "/upload",
};

export interface Prefs {
  vib: number;
  light: number;
  bands: Record<string, boolean>;
  calibrated: boolean;
  deviceMap?: Record<string, string>;
  viz?: { mode: VizMode; particles: boolean; glow: number };
  theme?: "dark" | "light";
  language?: "mn" | "en";
  notifyFeed?: boolean;
  reducedMotion?: boolean;
  largeText?: boolean;
}

const DEFAULT_VIZ: { mode: VizMode; particles: boolean; glow: number } = { mode: "bars", particles: true, glow: 0.6 };

/* Route page-үүд энэ context-оос өгөгдөл/үйлдлээ авна */
export interface PlayerContextValue {
  ALL: PlayerTrack[];
  GENRES: string[];
  list: PlayerTrack[];
  byId: (id: number | string) => PlayerTrack | undefined;
  genre: string;
  setGenre: (g: string) => void;
  query: string;
  setQuery: (q: string) => void;
  cur: PlayerTrack | null;
  playing: boolean;
  playTrack: (t: PlayerTrack) => void;
  likes: (number | string)[];
  saves: (number | string)[];
  toggleLike: (id: number | string) => void;
  toggleSave: (id: number | string) => void;
  recentTracks: PlayerTrack[];
  likedTracks: PlayerTrack[];
  savedTracks: PlayerTrack[];
  stats: ListeningStats | null;
  playlists: ReturnType<typeof loadPlaylists>;
  prefs: Prefs;
  updatePrefs: (patch: Partial<Prefs>) => void;
  openDetail: (t: PlayerTrack) => void;
  openAnalysis: (songId: string) => void;
  goTo: (v: ViewName) => void;
  feelTest: (t: PlayerTrack) => void;
  canVibrate: boolean;
  email: string;
  user: SessionUser | null;
  subscribed: boolean;
  isAdmin: boolean;
  isTherapist: boolean;
  isParent: boolean;
  onSubscribe: () => void;
  onCancelSub: () => void;
  onAdmin: () => void;
  setCalibOpen: (v: boolean) => void;
  deviceSync: ReturnType<typeof useDeviceSync>;
}

const PlayerCtx = createContext<PlayerContextValue | null>(null);

export function usePlayer() {
  const ctx = useContext(PlayerCtx);
  if (!ctx) throw new Error("usePlayer-ийг PlayerProvider дотор л дуудна");
  return ctx;
}

export default function PlayerProvider({
  children,
  view,
  user,
  subscribed,
  onSubscribe,
  isAdmin,
  isTherapist,
  isParent,
  onAdmin,
  onLogout,
  onCancelSub,
}: {
  children: ReactNode;
  /* Идэвхтэй дэлгэц — layout нь pathname-аас тооцож дамжуулна */
  view: ViewName;
  user: SessionUser | null;
  subscribed: boolean;
  onSubscribe: () => void;
  isAdmin: boolean;
  isTherapist: boolean;
  isParent: boolean;
  onAdmin: () => void;
  onLogout: () => void;
  onCancelSub: () => void;
}) {
  const router = useRouter();
  const goTo = (v: ViewName) => router.push(VIEW_PATH[v]);
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("Бүгд");
  const [recent, setRecent] = useState<(number | string)[]>([]);
  const [likes, setLikes] = useState<(number | string)[]>([]);
  const [saves, setSaves] = useState<(number | string)[]>([]);
  const [custom, setCustom] = useState<PlayerTrack[]>([]); // админы нэмсэн дуунууд (IndexedDB)
  const [cur, setCur] = useState<PlayerTrack | null>(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [dur, setDur] = useState(0);
  const [vibro, setVibro] = useState(true);
  const [limitHit, setLimitHit] = useState(false);
  const [prefs, setPrefs] = useState<Prefs>(DEFAULT_PREFS);
  const [prefsReady, setPrefsReady] = useState(false);
  const [feed, setFeed] = useState<ReturnType<typeof loadFeed>>([]);
  const [playlists, setPlaylists] = useState<ReturnType<typeof loadPlaylists>>([]); // Нүүр хуудасны "Миний жагсаалт" хэсэгт
  const [readTs, setReadTs] = useState(0);
  const [immersive, setImmersive] = useState(false);
  const [immersiveClosing, setImmersiveClosing] = useState(false);
  const [npOpen, setNpOpen] = useState(false); // дэлгэгддэг Мэдрэх самбар (Now-Playing)
  const [calibOpen, setCalibOpen] = useState(false);
  const [, setUsersTick] = useState(0); // хэрэглэгч өөрчлөгдөхөд дахин зурна
  const historyLoggedRef = useRef(false);
  const deviceSync = useDeviceSync();

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const ctxRef = useRef<{ ctx: AudioContext; an: AnalyserNode; data: Uint8Array<ArrayBuffer> } | null>(null);
  const toneCtxRef = useRef<AudioContext | null>(null);
  const pulseRef = useRef<HTMLDivElement | null>(null);
  const levelRef = useRef({ lo: 0, mi: 0, hi: 0 });
  const beatSchedulerRef = useRef(new BeatScheduler());
  const beatFlashRef = useRef<BeatFlash | null>(null);
  const prefsRef = useRef(prefs);
  const curRef = useRef<PlayerTrack | null>(null);
  const statsRef = useRef<ListeningStats | null>(null);
  const vizRef = useRef<(HTMLElement | null)[]>([]);
  const immBarsRef = useRef<(HTMLElement | null)[]>([]);
  const immPulseRef = useRef<HTMLSpanElement | null>(null);
  const immFlashRef = useRef<HTMLSpanElement | null>(null);
  const feelBarsRef = useRef<(HTMLSpanElement | null)[]>([]); // Мэдрэх самбарын амьд 8 багана
  const autoCalRef = useRef(false);
  prefsRef.current = prefs;

  const canVibrate = typeof navigator !== "undefined" && !!navigator.vibrate;

  /* ---------- хэрэглэгчийн өгөгдөл ---------- */
  const email = user?.email || "";
  const likesKey = "medreh_likes:" + email;
  const savesKey = "medreh_saves:" + email;
  const prefsKey = "medreh_prefs:" + email;
  useEffect(() => {
    if (!email) return;
    try {
      setLikes(JSON.parse(localStorage.getItem(likesKey) || "[]") || []);
    } catch {
      setLikes([]);
    }
    try {
      setSaves(JSON.parse(localStorage.getItem(savesKey) || "[]") || []);
    } catch {
      setSaves([]);
    }
    try {
      const p = JSON.parse(localStorage.getItem(prefsKey) || "null");
      setPrefs(p ? { ...DEFAULT_PREFS, ...p, bands: { ...DEFAULT_PREFS.bands, ...p.bands } } : DEFAULT_PREFS);
    } catch {
      setPrefs(DEFAULT_PREFS);
    }
    statsRef.current = loadStats(email);
    setReadTs(getReadTs(email));
    setPrefsReady(true);
  }, [likesKey, savesKey, prefsKey, email]);

  /* анх удаа орж ирсэн хэрэглэгчид калибровк санал болгоно (админд хэрэггүй) */
  useEffect(() => {
    if (prefsReady && !prefs.calibrated && !autoCalRef.current && !isAdmin && !isTherapist && !isParent) {
      autoCalRef.current = true;
      setCalibOpen(true);
    }
  }, [prefsReady, prefs.calibrated, isAdmin, isTherapist, isParent]);

  /* админ самбараас хэрэглэгч устгагдахад тоог шинэчилнэ */
  useEffect(() => {
    const onUsers = () => setUsersTick((t) => t + 1);
    addEventListener("medreh:users-changed", onUsers);
    return () => removeEventListener("medreh:users-changed", onUsers);
  }, []);

  /* ---------- админы нэмсэн дуунуудыг IndexedDB-ээс ачаална ---------- */
  useEffect(() => {

    let alive = true;
    const urls: string[] = [];
    async function load() {
      const metas = loadCustomMeta();
      const out: PlayerTrack[] = [];
      for (const m of metas) {
        const audio = await idbGet("audio-" + m.id).catch(() => null);
        if (!audio) continue;
        const aUrl = URL.createObjectURL(audio);
        urls.push(aUrl);
        let cover: string | null = null;
        if (m.hasCover) {
          const cBlob = await idbGet("cover-" + m.id).catch(() => null);
          if (cBlob) {
            cover = URL.createObjectURL(cBlob);
            urls.push(cover);
          }
        }
        out.push({
          id: m.id,
          title: m.title,
          artist: m.singer || m.artist || "Тодорхойгүй",
          composer: m.composer || "",
          genre: m.genre,
          file: aUrl,
          /* обложка: файл → линк → fallback дарааллаар */
          cover: cover || m.coverUrl || TRACKS[Math.abs(m.title.length) % TRACKS.length].cover,
          custom: true,
        });
      }
      if (alive) setCustom(out);
    }
    load();
    const onLib = () => load();
    addEventListener("medreh:library-changed", onLib);
    return () => {
      alive = false;
      removeEventListener("medreh:library-changed", onLib);
      urls.forEach((u) => URL.revokeObjectURL(u));
    };
  }, []);

  /* ---------- мэдэгдлийн feed ---------- */
  useEffect(() => {

    setFeed(loadFeed());
    const onFeed = () => setFeed(loadFeed());
    addEventListener("medreh:feed-changed", onFeed);
    addEventListener("storage", onFeed);
    return () => {
      removeEventListener("medreh:feed-changed", onFeed);
      removeEventListener("storage", onFeed);
    };
  }, []);
  /* ---------- жагсаалтууд (Нүүр хуудасны "Миний жагсаалт" хэсэгт) ---------- */
  useEffect(() => {
    if (!email) return;
    setPlaylists(loadPlaylists(email));
    const onPl = () => setPlaylists(loadPlaylists(email));
    addEventListener("medreh:playlists-changed", onPl);
    return () => removeEventListener("medreh:playlists-changed", onPl);
  }, [email]);

  /* TopBar өөрөө notifOpen төлвийг удирддаг тул энд зөвхөн "нээгдэх мөч"-ийн side effect
     (feed read tracking) л үлдэнэ — TopBar dropdown нээгдэхдээ л дуудна. */
  function onOpenNotifs() {
    if (!email) return;
    markFeedRead(email);
    setTimeout(() => setReadTs(Date.now()), 600);
  }

  function toggleLike(id: number | string) {
    setLikes((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [id, ...prev];
      localStorage.setItem(likesKey, JSON.stringify(next));
      return next;
    });
  }
  function toggleSave(id: number | string) {
    setSaves((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [id, ...prev];
      localStorage.setItem(savesKey, JSON.stringify(next));
      return next;
    });
  }
  function updatePrefs(patch: Partial<Prefs>) {
    setPrefs((prev) => {
      const next = { ...prev, ...patch, bands: { ...prev.bands, ...(patch.bands || {}) } };
      if (!next.bands.bass && !next.bands.mid && !next.bands.high) return prev;
      localStorage.setItem(prefsKey, JSON.stringify(next));
      return next;
    });
  }

  /* ---------- аудио ---------- */
  function ensureCtx() {
    if (ctxRef.current) {
      ctxRef.current.ctx.resume();
      return;
    }
    const ctx = new AudioContext();
    const src = ctx.createMediaElementSource(audioRef.current!);
    const an = ctx.createAnalyser();
    an.fftSize = 256;
    an.smoothingTimeConstant = 0.7;
    src.connect(an);
    an.connect(ctx.destination);
    ctxRef.current = { ctx, an, data: new Uint8Array(an.frequencyBinCount) };
  }
  function playTone(freq: number, d: number, type: OscillatorType) {
    if (!toneCtxRef.current) toneCtxRef.current = new AudioContext();
    const ctx = toneCtxRef.current;
    if (ctx.state === "suspended") ctx.resume();
    const o = ctx.createOscillator(),
      g = ctx.createGain();
    o.type = type;
    o.frequency.value = freq;
    g.gain.setValueAtTime(0, ctx.currentTime);
    g.gain.linearRampToValueAtTime(0.45, ctx.currentTime + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + d);
    o.connect(g);
    g.connect(ctx.destination);
    o.start();
    o.stop(ctx.currentTime + d + 0.05);
  }

  /* RAF: түвшин + пульс + visualizer-ууд; interval: чичиргээ */
  useEffect(() => {

    let raf: number;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      const a = ctxRef.current;
      const p = prefsRef.current;
      const lightMult = LIGHT_LEVELS[p.light].mult;
      if (a && playing) {
        a.an.getByteFrequencyData(a.data);
        const n = a.data.length,
          ai = Math.floor(n * 0.08),
          bi = Math.floor(n * 0.38);
        let lo = 0,
          mi = 0,
          hi = 0,
          i;
        for (i = 0; i < ai; i++) lo += a.data[i];
        for (i = ai; i < bi; i++) mi += a.data[i];
        for (i = bi; i < n; i++) hi += a.data[i];
        lo /= ai * 255;
        mi /= (bi - ai) * 255;
        hi /= (n - bi) * 255;
        levelRef.current = { lo, mi, hi };
        const lvl = Math.max(p.bands.bass ? lo : 0, p.bands.mid ? mi : 0, p.bands.high ? hi : 0);
        if (pulseRef.current) {
          pulseRef.current.style.opacity = Math.min(1, (0.1 + lvl * 0.7) * lightMult).toFixed(3);
          pulseRef.current.style.transform = "translate(-50%,-50%) scale(" + (1 + lvl * 0.5 * lightMult).toFixed(3) + ")";
        }
        vizRef.current.forEach((el, idx) => {
          if (!el) return;
          const v = a.data[Math.floor((idx / vizRef.current.length) * n * 0.7)] / 255;
          el.style.height = Math.max(3, v * 22) + "px";
        });
        immBarsRef.current.forEach((el, idx) => {
          if (!el) return;
          const v = a.data[Math.floor((idx / immBarsRef.current.length) * n * 0.72)] / 255;
          el.style.height = Math.max(2, v * 100 * Math.min(1.2, lightMult)) + "%";
        });
        if (immPulseRef.current) {
          immPulseRef.current.style.transform = "scale(" + (1 + lvl * 0.9 * lightMult).toFixed(3) + ")";
          immPulseRef.current.style.opacity = Math.min(1, 0.25 + lvl * 0.85 * lightMult).toFixed(3);
        }
        if (immFlashRef.current) {
          /* цохилт (хүчтэй бас) дээр богино flash */
          immFlashRef.current.style.opacity = lo > 0.5 ? Math.min(0.55, (lo - 0.5) * 1.8 * lightMult).toFixed(3) : "0";
        }
        /* Мэдрэх самбарын амьд 8 бүсийн meter — спектрийг 8 бүлэгт хувааж дунджилна */
        feelBarsRef.current.forEach((el, idx) => {
          if (!el) return;
          const lenB = feelBarsRef.current.length;
          const start = Math.floor((idx / lenB) * n * 0.72);
          const end = Math.max(start + 1, Math.floor(((idx + 1) / lenB) * n * 0.72));
          let s = 0;
          for (let k = start; k < end; k++) s += a.data[k];
          el.style.height = Math.max(5, (s / (end - start) / 255) * 100) + "%";
        });
      } else {
        vizRef.current.forEach((el) => {
          if (el) el.style.height = "3px";
        });
        if (immFlashRef.current) immFlashRef.current.style.opacity = "0";
        feelBarsRef.current.forEach((el) => {
          if (el) el.style.height = "5px";
        });
      }
    };
    loop();
    /* Локал чичиргээ (canVibrate) болон QR-аар холбогдсон утас руу beat event илгээх (deviceSync)
       хоёулаа энэ ижил 170мс интервалд явна — тусдаа шинэ interval үүсгэхгүй. */
    const vibTimer = setInterval(() => {
      if (!playing || !vibro) return;
      const p = prefsRef.current;
      const m = VIB_LEVELS[p.vib].mult;
      const qrConnected = deviceSync.isConnected;

      /* songId-тэй (backend Song, beatTimestamps-тай) дуу бол timestamp-driven scheduler,
         эс бол одоогийн level-threshold логик — аль ч тохиолдолд {band, level} ижил payload. */
      const scheduler = beatSchedulerRef.current;
      if (scheduler.hasTimestamps && audioRef.current) {
        const crossed = scheduler.poll(audioRef.current.currentTime);
        if (crossed) {
          const { lo, mi, hi } = levelRef.current;
          const band = lo >= mi && lo >= hi ? "bass" : mi >= hi ? "mid" : "high";
          const level = band === "bass" ? lo : band === "mid" ? mi : hi;
          beatFlashRef.current = { band, level, at: performance.now() };
          if (canVibrate) {
            if (band === "bass") navigator.vibrate(Math.round((60 + level * 80) * m));
            else if (band === "mid") navigator.vibrate([Math.round(30 * m), 30, Math.round(30 * m)]);
            else navigator.vibrate(Math.max(8, Math.round(12 * m)));
          }
          if (qrConnected) deviceSync.emitBeat({ band, level });
          if (statsRef.current) statsRef.current.vib++;
        }
        return;
      }

      const { lo, mi, hi } = levelRef.current;
      let fired = false;
      if (p.bands.bass && lo > 0.45) {
        beatFlashRef.current = { band: "bass", level: lo, at: performance.now() };
        if (canVibrate) navigator.vibrate(Math.round((60 + lo * 80) * m));
        if (qrConnected) deviceSync.emitBeat({ band: "bass", level: lo });
        fired = true;
      } else if (p.bands.mid && mi > 0.35) {
        beatFlashRef.current = { band: "mid", level: mi, at: performance.now() };
        if (canVibrate) navigator.vibrate([Math.round(30 * m), 30, Math.round(30 * m)]);
        if (qrConnected) deviceSync.emitBeat({ band: "mid", level: mi });
        fired = true;
      } else if (p.bands.high && hi > 0.3) {
        beatFlashRef.current = { band: "high", level: hi, at: performance.now() };
        if (canVibrate) navigator.vibrate(Math.max(8, Math.round(12 * m)));
        if (qrConnected) deviceSync.emitBeat({ band: "high", level: hi });
        fired = true;
      }
      if (fired && statsRef.current) statsRef.current.vib++;
    }, 170);
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(vibTimer);
      if (canVibrate) navigator.vibrate(0);
    };
  }, [playing, vibro, canVibrate, deviceSync]);

  /* сонсолтын статистик — секунд тутам хуримтлуулж, 5 сек тутам хадгална */
  useEffect(() => {
    if (!playing || !email) return;
    let n = 0;
    const iv = setInterval(() => {
      const s = statsRef.current,
        c = curRef.current;
      if (!s || !c) return;
      s.total++;
      s.byGenre[c.genre] = (s.byGenre[c.genre] || 0) + 1;
      s.byTrack[c.id] = (s.byTrack[c.id] || 0) + 1;
      const dk = todayKey();
      s.days[dk] = (s.days[dk] || 0) + 1;
      if (++n % 5 === 0) saveStats(email, s);
    }, 1000);
    return () => {
      clearInterval(iv);
      if (statsRef.current) saveStats(email, statsRef.current);
    };
  }, [playing, email]);

  /* audio events */
  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    const onTime = () => {
      setTime(el.currentTime);
      if (!subscribed && el.currentTime >= PREVIEW_SEC) {
        el.pause();
        setLimitHit(true);
      }
    };
    const onMeta = () => setDur(el.duration);
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onEnd = () => {
      logCurrentToHistory();
      next();
    };
    el.addEventListener("timeupdate", onTime);
    el.addEventListener("loadedmetadata", onMeta);
    el.addEventListener("play", onPlay);
    el.addEventListener("pause", onPause);
    el.addEventListener("ended", onEnd);
    return () => {
      el.removeEventListener("timeupdate", onTime);
      el.removeEventListener("loadedmetadata", onMeta);
      el.removeEventListener("play", onPlay);
      el.removeEventListener("pause", onPause);
      el.removeEventListener("ended", onEnd);
    };
  });

  /* cursor + Escape шатлал. Escape нь давхарга бүрийг дарааллаар нь хаана:
     мэдрэх горим → Now-Playing самбар → дэд дэлгэцээс нүүр рүү. */
  useEffect(() => {
    document.body.classList.add("native-cursor");

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (immersive) {
        closeImmersive();
        return;
      }
      if (npOpen) {
        setNpOpen(false);
        return;
      }
      if (calibOpen) return; // калибровк өөрөө удирдана
      if (view !== "home") router.push("/home");
    };
    addEventListener("keydown", onKey);
    return () => {
      removeEventListener("keydown", onKey);
      document.body.classList.remove("native-cursor");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [immersive, npOpen, view, calibOpen]);

  /* Апп-аас бүрэн гарахад (provider unmount) дуу зогсоож, түүхэнд бичнэ */
  useEffect(
    () => () => {
      if (audioRef.current) audioRef.current.pause();
      logCurrentToHistory();
      deviceSync.disconnect();
      if (toneCtxRef.current) toneCtxRef.current.close().catch(() => {});
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const ALL: PlayerTrack[] = [...TRACKS, ...custom];
  const GENRES = ["Бүгд", ...new Set(ALL.map((t) => t.genre))];
  const list = ALL.filter((t) => {
    if (genre !== "Бүгд" && t.genre !== genre) return false;
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (t.title + " " + t.artist + " " + t.genre).toLowerCase().includes(q);
  });
  const byId = (id: number | string) => ALL.find((t) => t.id === id);
  const recentTracks = recent.map(byId).filter((t): t is PlayerTrack => !!t);
  const likedTracks = likes.map(byId).filter((t): t is PlayerTrack => !!t);
  const savedTracks = saves.map(byId).filter((t): t is PlayerTrack => !!t);

  /* backend Song-той холбогдсон дуу (songId-той) тоглуулж дуусах/солигдох үед History-д лог хийнэ. */
  function logCurrentToHistory() {
    const c = curRef.current;
    if (!c?.songId || historyLoggedRef.current) return;
    historyLoggedRef.current = true;
    songsApi
      .logHistory({ songId: c.songId, durationMs: Math.round((audioRef.current?.currentTime || 0) * 1000), bpm: undefined })
      .catch(() => {});
  }

  function playTrack(t: PlayerTrack) {
    const el = audioRef.current!;
    ensureCtx();
    setLimitHit(false);
    if (cur?.id === t.id) {
      if (playing) el.pause();
      else el.play();
      return;
    }
    logCurrentToHistory();
    historyLoggedRef.current = false;
    setCur(t);
    curRef.current = t;
    setRecent((r) => [t.id, ...r.filter((id) => id !== t.id)].slice(0, 6));
    el.src = t.file || "";
    el.play();

    /* songId-тэй (backend Song, аналайз хийгдсэн) бол beatTimestamps-ийг татаж scheduler-т тохируулна;
       эс бол scheduler хоосорч, level-threshold fallback идэвхжинэ (§5). */
    beatSchedulerRef.current.setTrack(null);
    if (t.songId) {
      songsApi
        .getSong(t.songId)
        .then((song) => beatSchedulerRef.current.setTrack(song.beatTimestamps))
        .catch(() => {});
    }
    if (deviceSync.isConnected) {
      deviceSync.emitTrackChanged({ title: t.title, artist: t.artist });
    }
  }
  /* Мэдрэх горимоос гарахад instant unmount хийхийн оронд богино fade-out animation
     харуулаад дараа нь бодитоор unmount хийнэ (aov-out keyframe, ui.css). */
  function closeImmersive() {
    setImmersiveClosing(true);
    setTimeout(() => {
      setImmersive(false);
      setImmersiveClosing(false);
    }, 220);
  }
  function togglePlay() {
    if (!cur) {
      if (list[0]) playTrack(list[0]);
      return;
    }
    ensureCtx();
    const el = audioRef.current!;
    if (playing) el.pause();
    else {
      if (limitHit) return;
      el.play();
    }
  }
  function seek(dt: number) {
    const el = audioRef.current;
    if (!el || !cur) return;
    let t = Math.max(0, el.currentTime + dt);
    if (!subscribed) t = Math.min(t, PREVIEW_SEC - 1);
    el.currentTime = Math.min(t, (el.duration || 1) - 0.5);
  }
  function seekTo(e: React.MouseEvent<HTMLDivElement>) {
    const el = audioRef.current;
    if (!el || !cur || !dur) return;
    const r = e.currentTarget.getBoundingClientRect();
    let t = ((e.clientX - r.left) / r.width) * dur;
    if (!subscribed) t = Math.min(t, PREVIEW_SEC - 1);
    el.currentTime = t;
  }
  function step(dir: number) {
    if (!cur) return;
    const i = ALL.findIndex((t) => t.id === cur.id);
    const nt = ALL[(i + dir + ALL.length) % ALL.length];
    playTrack(nt);
  }
  function next() {
    step(1);
  }
  /* Дэлгэрэнгүй/анализ нь одоо өөрийн хаягтай — линк хуваалцах, буцах товч ажиллана */
  function openDetail(t: PlayerTrack) {
    router.push(`/track/${encodeURIComponent(String(t.id))}`);
  }
  function openAnalysis(songId: string) {
    router.push(`/analysis/${encodeURIComponent(songId)}`);
  }
  function feelTest(t: PlayerTrack) {
    const f = FEEL[t.genre] || FEEL_DEFAULT;
    if (canVibrate) {
      try {
        navigator.vibrate(f.pattern);
      } catch {
        /* noop */
      }
    }
    const dom: [number, number, OscillatorType] =
      f.bass >= f.mid && f.bass >= f.high ? [55, 0.7, "sine"] : f.mid >= f.high ? [330, 0.45, "triangle"] : [1500, 0.3, "square"];
    playTone(dom[0], dom[1], dom[2]);
  }

  const pct = dur ? (time / dur) * 100 : 0;
  const previewPct = dur && !subscribed ? Math.min(100, (PREVIEW_SEC / dur) * 100) : 100;
  const renewDate = user?.sub?.renews ? new Date(user.sub.renews).toLocaleDateString("mn-MN") : "";

  const ctxValue: PlayerContextValue = {
    ALL,
    GENRES,
    list,
    byId,
    genre,
    setGenre,
    query,
    setQuery,
    cur,
    playing,
    playTrack,
    likes,
    saves,
    toggleLike,
    toggleSave,
    recentTracks,
    likedTracks,
    savedTracks,
    stats: statsRef.current,
    playlists,
    prefs,
    updatePrefs,
    openDetail,
    openAnalysis,
    goTo,
    feelTest,
    canVibrate,
    email,
    user,
    subscribed,
    isAdmin,
    isTherapist,
    isParent,
    onSubscribe,
    onCancelSub,
    onAdmin,
    setCalibOpen,
    deviceSync,
  };

  return (
    <PlayerCtx.Provider value={ctxValue}>
    <div
      className="fixed inset-0 z-[9000] flex flex-col p-0 overflow-hidden [animation:aov_.35s_ease] [backdrop-filter:blur(24px)] [background:radial-gradient(1100px_560px_at_80%_-10%,rgba(56,232,206,.06),transparent_58%),linear-gradient(180deg,#0b0e0e,#070909_62%)]"
    >
      <audio ref={audioRef} crossOrigin="anonymous" />
      <div
        className="fixed left-1/2 top-[58%] w-[860px] h-[860px] rounded-full pointer-events-none [background:radial-gradient(circle,rgba(56,232,206,.3),transparent_62%)] -translate-x-1/2 -translate-y-1/2 opacity-10 transition-[opacity,transform] duration-[130ms] ease-linear z-0"
        ref={pulseRef}
        aria-hidden="true"
      ></div>

      <TopBar
        view={view}
        setView={goTo}
        query={query}
        setQuery={setQuery}
        vizRef={vizRef}
        user={user}
        isAdmin={isAdmin}
        isTherapist={isTherapist}
        isParent={isParent}
        subscribed={subscribed}
        onSubscribe={onSubscribe}
        onLogout={onLogout}
        /* ✕ товч — апп-аас гарч landing руу буцна (сесс хэвээр) */
        onClose={() => router.push("/")}
        feed={feed}
        readTs={readTs}
        onOpenNotifs={onOpenNotifs}
        prefs={prefs}
        updatePrefs={updatePrefs}
        setCalibOpen={setCalibOpen}
        renewDate={renewDate}
      />

      {/* их бие — сайдбар/агуулга нь тусдаа "арал" карт, хооронд нь зайтай */}
      <div className="relative z-[2] flex flex-1 min-h-0 w-full gap-2 px-2 pb-2 max-nav:flex-col max-nav:gap-1.5 max-nav:px-1.5 max-nav:pb-1.5">
        <Sidebar
          view={view}
          setView={goTo}
          likedTracks={likedTracks}
          savedTracks={savedTracks}
          recentTracks={recentTracks}
          curId={cur?.id ?? null}
          playing={playing}
          onPlay={playTrack}
        />

        <PageContainer>
          {children}
        </PageContainer>
      </div>

      {limitHit && !subscribed && (
        <div className="absolute left-1/2 bottom-[108px] -translate-x-1/2 z-[5] flex items-center gap-4 flex-wrap justify-center border border-[rgba(217,165,76,.45)] bg-[rgba(20,16,7,.95)] rounded-xl p-[14px_20px] text-[13.5px] max-w-[min(92vw,560px)] [animation:abx_.4s_cubic-bezier(.16,.8,.24,1)]">
          <p>Урьдчилан сонсголт дууслаа — бүтэн дуу сонсохын тулд PRO захиалга аваарай.</p>
          <ActionButton variant="primary" onClick={onSubscribe}>
            Захиалга авах →
          </ActionButton>
        </div>
      )}

      {/* дэлгэгддэг Мэдрэх самбар (Now-Playing) */}
      <NowPlayingPanel
        open={npOpen && !!cur}
        track={cur}
        prefs={prefs}
        onToggleBand={(k) => updatePrefs({ bands: { [k]: !prefs.bands[k] } })}
        vibro={vibro}
        onToggleVibro={() => setVibro(!vibro)}
        onImmersive={() => {
          setNpOpen(false);
          setImmersive(true);
        }}
        onClose={() => setNpOpen(false)}
        barsRef={feelBarsRef}
      />

      {/* доод баар */}
      <footer
        className="relative z-[3] grid grid-cols-[1fr_auto_1fr] max-nav:grid-cols-[auto_1fr] items-center gap-[18px] p-[10px_24px_14px] min-h-[86px] bg-transparent"
      >
        <PlayerHeader track={cur} npOpen={npOpen} onToggleNowPlaying={() => setNpOpen((o) => !o)} />

        <PlaybackControls
          playing={playing}
          time={time}
          dur={dur}
          pct={pct}
          previewPct={previewPct}
          subscribed={subscribed}
          onTogglePlay={togglePlay}
          onStep={step}
          onSeek={seek}
          onSeekTo={seekTo}
        />

        <ActionToolbar
          vibro={vibro}
          onToggleVibro={() => setVibro(!vibro)}
          canVibrate={canVibrate}
          hasTrack={!!cur}
          onImmersive={() => setImmersive(true)}
        />
      </footer>

      {/* мэдрэх горим */}
      {immersive && cur && (
        <ImmersiveMode
          track={cur}
          onClose={closeImmersive}
          closing={immersiveClosing}
          barsRef={immBarsRef}
          pulseRef={immPulseRef}
          flashRef={immFlashRef}
          analyser={ctxRef.current?.an ?? null}
          levelRef={levelRef}
          beatFlashRef={beatFlashRef}
          playing={playing}
          viz={prefs.viz || DEFAULT_VIZ}
          onUpdateViz={(patch) => updatePrefs({ viz: { ...(prefs.viz || DEFAULT_VIZ), ...patch } })}
        />
      )}

      {/* калибровк */}
      <Calibrate open={calibOpen} onClose={() => setCalibOpen(false)} onDone={(patch) => updatePrefs(patch)} />
    </div>
    </PlayerCtx.Provider>
  );
}

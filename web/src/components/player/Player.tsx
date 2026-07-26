"use client";

import { useEffect, useRef, useState } from "react";
import { TRACKS } from "@/lib/data/tracks";
import { idbGet } from "@/lib/data/idb";
import { loadCustomMeta, loadFeed, getReadTs, markFeedRead, loadStats, saveStats, todayKey } from "@/lib/data/library";
import Calibrate from "./Calibrate";
import { PREVIEW_SEC, VIB_LEVELS, LIGHT_LEVELS, DEFAULT_PREFS, FEEL, FEEL_DEFAULT } from "@/lib/player/constants";
import { fmt, relTime } from "@/lib/player/format";
import BackBar from "./BackBar";
import SideList from "./SideList";
import ProfileView from "./ProfileView";
import DevicesView from "./DevicesView";
import PlaylistsView from "./PlaylistsView";
import HelpView from "./HelpView";
import DetailView from "./DetailView";
import StatsView from "./StatsView";
import AdminView from "./AdminView";
import ImmersiveMode from "./ImmersiveMode";
import TherapistView from "./TherapistView";
import ParentView from "./ParentView";
import UploadSongView from "./UploadSongView";
import ProgressView from "./ProgressView";
import AchievementsView from "./AchievementsView";
import type { VizMode, BeatFlash } from "@/lib/player/visualizer-modes";
import BillingView from "./BillingView";
import HomeView from "./HomeView";
import LibraryView from "./LibraryView";
import NowPlayingPanel from "./NowPlayingPanel";
import AnalysisView from "./AnalysisView";
import HistoryView from "./HistoryView";
import * as songsApi from "@/lib/api/client";
import { useDeviceSync } from "@/lib/socket/useDeviceSync";
import { BeatScheduler } from "@/lib/audio/beat-scheduler";
import type { SessionUser } from "@/types/auth";
import type { ListeningStats, Track } from "@/types/track";

type PlayerTrack = Track & { custom?: boolean; songId?: string };
type ViewName =
  | "home"
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

interface Prefs {
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

export default function Player({
  open,
  onClose,
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
  open: boolean;
  onClose: () => void;
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
  const [view, setView] = useState<ViewName>("home");
  const [detail, setDetail] = useState<PlayerTrack | null>(null);
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
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [feed, setFeed] = useState<ReturnType<typeof loadFeed>>([]);
  const [readTs, setReadTs] = useState(0);
  const [immersive, setImmersive] = useState(false);
  const [immersiveClosing, setImmersiveClosing] = useState(false);
  const [npOpen, setNpOpen] = useState(false); // дэлгэгддэг Мэдрэх самбар (Now-Playing)
  const [calibOpen, setCalibOpen] = useState(false);
  const [, setUsersTick] = useState(0); // хэрэглэгч өөрчлөгдөхөд дахин зурна
  const [analysisSongId, setAnalysisSongId] = useState<string | null>(null);
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
    if (open && prefsReady && !prefs.calibrated && !autoCalRef.current && !isAdmin && !isTherapist && !isParent) {
      autoCalRef.current = true;
      setCalibOpen(true);
    }
  }, [open, prefsReady, prefs.calibrated, isAdmin, isTherapist, isParent]);

  /* нээгдэхэд: админ/эмч бол өөрийн самбараас, энгийн хэрэглэгч нүүрээс эхэлнэ */
  useEffect(() => {
    if (open) setView(isAdmin ? "admin" : isTherapist ? "therapist" : isParent ? "parent" : "home");
  }, [open, isAdmin, isTherapist, isParent]);

  /* админ самбараас хэрэглэгч устгагдахад тоог шинэчилнэ */
  useEffect(() => {
    const onUsers = () => setUsersTick((t) => t + 1);
    addEventListener("medreh:users-changed", onUsers);
    return () => removeEventListener("medreh:users-changed", onUsers);
  }, []);

  /* ---------- админы нэмсэн дуунуудыг IndexedDB-ээс ачаална ---------- */
  useEffect(() => {
    if (!open) return;
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
  }, [open]);

  /* ---------- мэдэгдлийн feed ---------- */
  useEffect(() => {
    if (!open) return;
    setFeed(loadFeed());
    const onFeed = () => setFeed(loadFeed());
    addEventListener("medreh:feed-changed", onFeed);
    addEventListener("storage", onFeed);
    return () => {
      removeEventListener("medreh:feed-changed", onFeed);
      removeEventListener("storage", onFeed);
    };
  }, [open]);
  const unread = feed.filter((f) => f.date > readTs).length;
  function openNotifs() {
    const next = !notifOpen;
    setNotifOpen(next);
    setSettingsOpen(false);
    setProfileOpen(false);
    if (next && email) {
      markFeedRead(email);
      setTimeout(() => setReadTs(Date.now()), 600);
    }
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
    if (!open) return;
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
  }, [open, playing, vibro, canVibrate, deviceSync]);

  /* сонсолтын статистик — секунд тутам хуримтлуулж, 5 сек тутам хадгална */
  useEffect(() => {
    if (!open || !playing || !email) return;
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
  }, [open, playing, email]);

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

  /* хаагдах + cursor + Escape шатлал */
  useEffect(() => {
    if (!open && audioRef.current) {
      audioRef.current.pause();
      logCurrentToHistory();
      deviceSync.disconnect();
    }
    document.body.classList.toggle("native-cursor", open);
    if (!open) return;
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
      if (settingsOpen || profileOpen || notifOpen) {
        setSettingsOpen(false);
        setProfileOpen(false);
        setNotifOpen(false);
        return;
      }
      if (calibOpen) return; // калибровк өөрөө удирдана
      if (view !== "home") {
        setView("home");
        return;
      }
      onClose();
    };
    addEventListener("keydown", onKey);
    return () => {
      removeEventListener("keydown", onKey);
      document.body.classList.remove("native-cursor");
    };
  }, [open, onClose, immersive, npOpen, settingsOpen, profileOpen, notifOpen, view, calibOpen]);

  useEffect(
    () => () => {
      if (toneCtxRef.current) toneCtxRef.current.close().catch(() => {});
    },
    [],
  );

  if (!open) return null;

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
      playing ? el.pause() : el.play();
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
  function openDetail(t: PlayerTrack) {
    setDetail(t);
    setView("detail");
  }
  function openAnalysis(songId: string) {
    setAnalysisSongId(songId);
    setView("analysis");
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
  const initial = (user?.name || "?").trim().charAt(0).toUpperCase();
  const renewDate = user?.sub?.renews ? new Date(user.sub.renews).toLocaleDateString("mn-MN") : "";

  return (
    <div className="pl-ov sp">
      <audio ref={audioRef} crossOrigin="anonymous" />
      <div className="pl-glow" ref={pulseRef} aria-hidden="true"></div>

      {/* дээд баар */}
      <header className="sp-top">
        <span className="sp-logo">
          МЭДРЭХ<sup>®</sup>
          {isAdmin && <em className="sp-admchip">АДМИН</em>}
        </span>

        <div className="sp-center">
          <button className={"sp-icbtn" + (view === "home" ? " on" : "")} onClick={() => setView("home")} aria-label="Нүүр" title="Нүүр">
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 10.5 12 3l9 7.5" />
              <path d="M5 9.5V21h14V9.5" />
            </svg>
          </button>
          <div className="sp-search">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.5" y2="16.5" />
            </svg>
            <input
              type="search"
              placeholder="Юу сонсмоор байна?"
              value={query}
              onFocus={() => setView("home")}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Дуу хайх"
            />
          </div>
          <div className="sp-viz" aria-hidden="true">
            {[0, 1, 2, 3, 4].map((i) => (
              <i
                key={i}
                ref={(el) => {
                  vizRef.current[i] = el;
                }}
              ></i>
            ))}
          </div>
        </div>

        <div className="sp-right">
          {!subscribed && (
            <button className="bt bt-a sp-subbtn" onClick={onSubscribe}>
              Захиалга авах
            </button>
          )}

          {/* админы хяналтын самбар руу */}
          {isAdmin && (
            <button
              className={"sp-icbtn sp-admbtn" + (view === "admin" ? " on" : "")}
              onClick={() => setView("admin")}
              aria-label="Хяналтын самбар"
              title="Хяналтын самбар"
            >
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="9" rx="1.5" />
                <rect x="14" y="3" width="7" height="5" rx="1.5" />
                <rect x="14" y="12" width="7" height="9" rx="1.5" />
                <rect x="3" y="16" width="7" height="5" rx="1.5" />
              </svg>
            </button>
          )}

          {/* эмчийн самбар руу */}
          {isTherapist && (
            <button
              className={"sp-icbtn sp-admbtn" + (view === "therapist" ? " on" : "")}
              onClick={() => setView("therapist")}
              aria-label="Эмчийн самбар"
              title="Эмчийн самбар"
            >
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </button>
          )}

          {/* эцэг эхийн самбар руу */}
          {isParent && (
            <button
              className={"sp-icbtn sp-admbtn" + (view === "parent" ? " on" : "")}
              onClick={() => setView("parent")}
              aria-label="Эцэг эхийн самбар"
              title="Эцэг эхийн самбар"
            >
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20.5s-7-4.35-9.5-8.5C.5 8.5 2.5 5 6 5c2 0 3.5 1 4 2 .5-1 2-2 4-2 3.5 0 5.5 3.5 3.5 7-2.5 4.15-9.5 8.5-9.5 8.5z" />
              </svg>
            </button>
          )}

          {/* мэдэгдэл */}
          <div className="sp-dd-wrap">
            <button
              className={"sp-icbtn sp-bell" + (notifOpen ? " on" : "")}
              onClick={openNotifs}
              aria-label={"Мэдэгдэл" + (unread ? " — " + unread + " шинэ" : "")}
              aria-expanded={notifOpen}
              title="Мэдэгдэл"
            >
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.7 21a2 2 0 0 1-3.4 0" />
              </svg>
              {unread > 0 && <span className="sp-bell-n">{unread > 9 ? "9+" : unread}</span>}
            </button>
            {notifOpen && (
              <div className="sp-dd sp-notifs" role="dialog" aria-label="Мэдэгдлүүд">
                <span className="mono">Мэдэгдэл</span>
                {feed.length === 0 && <p className="sp-side-empty">Мэдэгдэл алга</p>}
                {feed.map((f) => (
                  <div className={"sp-notif" + (f.date > readTs ? " new" : "")} key={f.id}>
                    <span className="sp-notif-ic" aria-hidden="true">
                      {f.icon}
                    </span>
                    <div>
                      <p>{f.text}</p>
                      <span className="mono">{relTime(f.date)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* мэдрэхүйн тохиргоо */}
          <div className="sp-dd-wrap">
            <button
              className={"sp-icbtn" + (settingsOpen ? " on" : "")}
              onClick={() => {
                setSettingsOpen(!settingsOpen);
                setProfileOpen(false);
                setNotifOpen(false);
              }}
              aria-label="Мэдрэхүйн тохиргоо"
              aria-expanded={settingsOpen}
              title="Мэдрэхүйн тохиргоо"
            >
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1 1.55V21a2 2 0 1 1-4 0v-.09a1.7 1.7 0 0 0-1.11-1.55 1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.7 1.7 0 0 0 .34-1.87 1.7 1.7 0 0 0-1.55-1H3a2 2 0 1 1 0-4h.09a1.7 1.7 0 0 0 1.55-1.11 1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.7 1.7 0 0 0 1.87.34h.09a1.7 1.7 0 0 0 1-1.55V3a2 2 0 1 1 4 0v.09a1.7 1.7 0 0 0 1 1.55 1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.7 1.7 0 0 0-.34 1.87v.09a1.7 1.7 0 0 0 1.55 1H21a2 2 0 1 1 0 4h-.09a1.7 1.7 0 0 0-1.55 1z" />
              </svg>
            </button>
            {settingsOpen && (
              <div className="sp-dd sp-settings" role="dialog" aria-label="Мэдрэхүйн тохиргоо">
                <span className="mono">Мэдрэхүйн тохиргоо</span>

                <label className="sp-set-l">📳 Чичиргээний хүч</label>
                <div className="sp-seg">
                  {VIB_LEVELS.map((v, i) => (
                    <button key={v.label} className={prefs.vib === i ? "on" : ""} onClick={() => updatePrefs({ vib: i })}>
                      {v.label}
                    </button>
                  ))}
                </div>

                <label className="sp-set-l">💡 Гэрлийн эрчим</label>
                <div className="sp-seg">
                  {LIGHT_LEVELS.map((v, i) => (
                    <button key={v.label} className={prefs.light === i ? "on" : ""} onClick={() => updatePrefs({ light: i })}>
                      {v.label}
                    </button>
                  ))}
                </div>

                <label className="sp-set-l">🎚 Мэдрэх давтамжийн бүс</label>
                <div className="sp-bands">
                  {(
                    [
                      ["bass", "Бас"],
                      ["mid", "Дунд"],
                      ["high", "Өндөр"],
                    ] as [string, string][]
                  ).map(([k, lbl]) => (
                    <button
                      key={k}
                      className={prefs.bands[k] ? "on" : ""}
                      onClick={() => updatePrefs({ bands: { [k]: !prefs.bands[k] } })}
                      aria-pressed={prefs.bands[k]}
                    >
                      {prefs.bands[k] ? "✓ " : ""}
                      {lbl}
                    </button>
                  ))}
                </div>

                <button
                  className="sp-prof-btn"
                  onClick={() => {
                    setSettingsOpen(false);
                    setCalibOpen(true);
                  }}
                >
                  🎛 Калибровк дахин хийх
                </button>
                <p className="sp-set-note">Сонсголын мэдрэмж хүн бүрд өөр — тохиргоо автоматаар хадгалагдана.</p>
              </div>
            )}
          </div>

          {/* профайл */}
          <div className="sp-dd-wrap">
            <button
              className={"sp-avatar" + (isAdmin ? " adm" : "") + (profileOpen ? " on" : "")}
              onClick={() => {
                setProfileOpen(!profileOpen);
                setSettingsOpen(false);
                setNotifOpen(false);
              }}
              aria-label="Профайл цэс"
              aria-expanded={profileOpen}
              title={user?.name}
            >
              {initial}
            </button>
            {profileOpen && (
              <div className="sp-dd sp-profile" role="dialog" aria-label="Профайл">
                <div className="sp-prof-top">
                  <span className="sp-avatar sp-avatar-lg" aria-hidden="true">
                    {initial}
                  </span>
                  <div>
                    <b>{user?.name}</b>
                    <i>{user?.email}</i>
                  </div>
                </div>
                <div className={"sp-prof-sub" + (subscribed ? " pro" : "")}>
                  {isAdmin ? (
                    <>
                      <b>Админ эрх</b>
                      <span>Бүх боломж нээлттэй</span>
                    </>
                  ) : subscribed ? (
                    <>
                      <b>PRO идэвхтэй</b>
                      <span>Дараагийн төлбөр: {renewDate}</span>
                    </>
                  ) : (
                    <>
                      <b>Үнэгүй горим</b>
                      <span>Дуу тус бүрээс {PREVIEW_SEC} сек</span>
                    </>
                  )}
                </div>
                <button
                  className="sp-prof-btn"
                  onClick={() => {
                    setProfileOpen(false);
                    setView("profile");
                  }}
                >
                  👤 Профайл засах
                </button>
                <button
                  className="sp-prof-btn"
                  onClick={() => {
                    setProfileOpen(false);
                    setView("playlists");
                  }}
                >
                  🎧 Миний жагсаалт
                </button>
                {subscribed && !isAdmin && (
                  <button
                    className="sp-prof-btn"
                    onClick={() => {
                      setProfileOpen(false);
                      setView("upload");
                    }}
                  >
                    ⬆️ Дуу нэмэх
                  </button>
                )}
                <button
                  className="sp-prof-btn"
                  onClick={() => {
                    setProfileOpen(false);
                    setView("devices");
                  }}
                >
                  📱 Төхөөрөмж холбох
                </button>
                <button
                  className="sp-prof-btn"
                  onClick={() => {
                    setProfileOpen(false);
                    setView("stats");
                  }}
                >
                  📊 Миний статистик
                </button>
                <button
                  className="sp-prof-btn"
                  onClick={() => {
                    setProfileOpen(false);
                    setView("history");
                  }}
                >
                  🕐 Сонссон түүх
                </button>
                <button
                  className="sp-prof-btn"
                  onClick={() => {
                    setProfileOpen(false);
                    setView("progress");
                  }}
                >
                  📈 Миний ахиц
                </button>
                <button
                  className="sp-prof-btn"
                  onClick={() => {
                    setProfileOpen(false);
                    setView("achievements");
                  }}
                >
                  🏆 Амжилтууд
                </button>
                <button
                  className="sp-prof-btn"
                  onClick={() => {
                    setProfileOpen(false);
                    setView("billing");
                  }}
                >
                  💳 Захиалга удирдах
                </button>
                <button
                  className="sp-prof-btn"
                  onClick={() => {
                    setProfileOpen(false);
                    setView("help");
                  }}
                >
                  ❓ Тусламж
                </button>
                {isAdmin && (
                  <button
                    className="sp-prof-btn"
                    onClick={() => {
                      setProfileOpen(false);
                      setView("admin");
                    }}
                  >
                    🛠 Хяналтын самбар
                  </button>
                )}
                {isTherapist && (
                  <button
                    className="sp-prof-btn"
                    onClick={() => {
                      setProfileOpen(false);
                      setView("therapist");
                    }}
                  >
                    🧑‍⚕️ Эмчийн самбар
                  </button>
                )}
                {isParent && (
                  <button
                    className="sp-prof-btn"
                    onClick={() => {
                      setProfileOpen(false);
                      setView("parent");
                    }}
                  >
                    👨‍👩‍👧 Эцэг эхийн самбар
                  </button>
                )}
                <button className="sp-prof-btn danger" onClick={onLogout}>
                  Гарах
                </button>
              </div>
            )}
          </div>

          <button className="auth-x pl-x" onClick={onClose} aria-label="Хаах">
            ✕
          </button>
        </div>
      </header>

      {(settingsOpen || profileOpen || notifOpen) && (
        <div
          className="sp-dd-veil"
          onClick={() => {
            setSettingsOpen(false);
            setProfileOpen(false);
            setNotifOpen(false);
          }}
        ></div>
      )}

      {/* их бие */}
      <div className="sp-shell">
        <aside className="sp-side">
          <nav className="sp-navcol" aria-label="Үндсэн цэс">
            <button className={"sp-navitem" + (view === "home" ? " on" : "")} onClick={() => setView("home")}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 10.5 12 3l9 7.5" />
                <path d="M5 9.5V21h14V9.5" />
              </svg>
              Нүүр
            </button>
            <button className={"sp-navitem" + (view === "playlists" ? " on" : "")} onClick={() => setView("playlists")}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 14v-2a9 9 0 0 1 18 0v2" />
                <rect x="3" y="14" width="4" height="6" rx="2" />
                <rect x="17" y="14" width="4" height="6" rx="2" />
              </svg>
              Жагсаалт
            </button>
            <button className={"sp-navitem" + (view === "stats" ? " on" : "")} onClick={() => setView("stats")}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 3v18h18" />
                <path d="M8 17v-5M13 17V9M18 17v-8" />
              </svg>
              Статистик
            </button>
            <button className={"sp-navitem" + (view === "billing" ? " on" : "")} onClick={() => setView("billing")}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="5" width="20" height="14" rx="2" />
                <path d="M2 10h20" />
              </svg>
              Захиалга
            </button>
          </nav>
          <div className="sp-navdiv" aria-hidden="true"></div>

          <button className="mono sp-side-h sp-side-hbtn" onClick={() => setView("liked")}>
            <svg className="sp-side-ic ic-love" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 21s-7.5-4.9-10-9.2C.3 8.6 2 5 5.5 5c2 0 3.4 1.1 4.2 2.3L12 9.6l2.3-2.3C15.1 6.1 16.5 5 18.5 5 22 5 23.7 8.6 22 11.8 19.5 16.1 12 21 12 21z" />
            </svg>
            Дуртай дуунууд
            <span className="sp-side-more" aria-hidden="true">
              →
            </span>
          </button>
          {likedTracks.length === 0 ? (
            <div className="sp-empty-tile">
              <span className="sp-empty-ic" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 21s-7.5-4.9-10-9.2C.3 8.6 2 5 5.5 5c2 0 3.4 1.1 4.2 2.3L12 9.6l2.3-2.3C15.1 6.1 16.5 5 18.5 5 22 5 23.7 8.6 22 11.8 19.5 16.1 12 21 12 21z" />
                </svg>
              </span>
              <p>
                Дууны{" "}
                <b>
                  <svg className="sp-inl-ic ic-love" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 21s-7.5-4.9-10-9.2C.3 8.6 2 5 5.5 5c2 0 3.4 1.1 4.2 2.3L12 9.6l2.3-2.3C15.1 6.1 16.5 5 18.5 5 22 5 23.7 8.6 22 11.8 19.5 16.1 12 21 12 21z" />
                  </svg>{" "}
                  зүрхэн
                </b>{" "}
                дээр дарахад дуртай дуу чинь энд цуглана
              </p>
            </div>
          ) : (
            <SideList tracks={likedTracks} curId={cur?.id ?? null} playing={playing} onPlay={playTrack} />
          )}

          <button className="mono sp-side-h sp-side-hbtn" onClick={() => setView("saved")}>
            <svg className="sp-side-ic ic-save" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M6 3h12v18l-6-3.6L6 21V3z" />
            </svg>
            Хадгалсан
            <span className="sp-side-more" aria-hidden="true">
              →
            </span>
          </button>
          {savedTracks.length === 0 ? (
            <div className="sp-empty-tile">
              <span className="sp-empty-ic sp-empty-warm" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 2h12a1 1 0 0 1 1 1v19l-7-4.2L5 22V3a1 1 0 0 1 1-1z" />
                </svg>
              </span>
              <p>
                Дууг{" "}
                <b>
                  <svg className="sp-inl-ic ic-save" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M6 3h12v18l-6-3.6L6 21V3z" />
                  </svg>{" "}
                  хадгалах
                </b>{" "}
                товчоор тэмдэглээд дараа нь сонсоорой
              </p>
            </div>
          ) : (
            <SideList tracks={savedTracks} curId={cur?.id ?? null} playing={playing} onPlay={playTrack} />
          )}

          {recentTracks.length > 0 && (
            <>
              <button className="mono sp-side-h sp-side-hbtn" onClick={() => setView("recent")}>
                <svg className="sp-side-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7.5V12l3 1.8" />
                </svg>
                Саяхан сонссон
                <span className="sp-side-more" aria-hidden="true">
                  →
                </span>
              </button>
              <SideList tracks={recentTracks} curId={cur?.id ?? null} playing={playing} onPlay={playTrack} />
            </>
          )}
        </aside>

        <main className="sp-main">
          {view === "home" && (
            <HomeView
              genres={GENRES}
              genre={genre}
              onGenre={setGenre}
              list={list}
              query={query}
              curId={cur?.id ?? null}
              playing={playing}
              onPlay={playTrack}
              likes={likes}
              saves={saves}
              onToggleLike={toggleLike}
              onToggleSave={toggleSave}
              onInfo={openDetail}
              subscribed={subscribed}
              onSubscribe={onSubscribe}
            />
          )}
          {view === "stats" && statsRef.current && <StatsView stats={statsRef.current} byId={byId} onPlay={playTrack} onBack={() => setView("home")} />}
          {view === "billing" && (
            <BillingView
              email={email}
              user={user}
              isAdmin={isAdmin}
              subscribed={subscribed}
              renewDate={renewDate}
              onSubscribe={onSubscribe}
              onCancelSub={onCancelSub}
              onBack={() => setView("home")}
            />
          )}
          {view === "help" && <HelpView onOpenCalibrate={() => setCalibOpen(true)} onBack={() => setView("home")} />}
          {view === "detail" && detail && (
            <DetailView
              track={detail}
              songId={detail?.songId}
              isCurrent={cur?.id === detail?.id}
              playing={playing}
              onPlay={() => playTrack(detail)}
              onFeelTest={() => feelTest(detail)}
              onBack={() => setView("home")}
              liked={likes.includes(detail?.id)}
              saved={saves.includes(detail?.id)}
              onToggleLike={() => toggleLike(detail.id)}
              onToggleSave={() => toggleSave(detail.id)}
            />
          )}
          {view === "admin" && isAdmin && <AdminView allTracksCount={ALL.length} onOpenAdmin={onAdmin} onGoHome={() => setView("home")} />}
          {view === "therapist" && isTherapist && <TherapistView onGoHome={() => setView("home")} />}
          {view === "parent" && isParent && <ParentView onGoHome={() => setView("home")} />}
          {view === "upload" && subscribed && !isAdmin && <UploadSongView onBack={() => setView("home")} />}
          {view === "progress" && <ProgressView onBack={() => setView("home")} />}
          {view === "achievements" && <AchievementsView stats={statsRef.current} onBack={() => setView("home")} />}
          {view === "profile" && <ProfileView onBack={() => setView("home")} prefs={prefs} onUpdatePrefs={updatePrefs} />}
          {view === "devices" && (
            <DevicesView prefs={prefs} onUpdatePrefs={updatePrefs} canVibrate={canVibrate} onBack={() => setView("home")} deviceSync={deviceSync} />
          )}
          {view === "playlists" && <PlaylistsView email={email} tracks={ALL} onPlay={playTrack} curId={cur?.id ?? null} playing={playing} onBack={() => setView("home")} />}
          {view === "liked" && (
            <LibraryView
              title="Дуртай дуунууд"
              tracks={likedTracks}
              curId={cur?.id ?? null}
              playing={playing}
              onPlay={playTrack}
              likes={likes}
              saves={saves}
              onToggleLike={toggleLike}
              onToggleSave={toggleSave}
              onInfo={openDetail}
              onBack={() => setView("home")}
              emptyIcon="♥"
              emptyTitle="Дуртай дуу алга"
              emptyHint="Дуу дээрх зүрхэн товчийг дарж дуртай дуугаа энд цуглуулаарай"
            />
          )}
          {view === "saved" && (
            <LibraryView
              title="Хадгалсан"
              tracks={savedTracks}
              curId={cur?.id ?? null}
              playing={playing}
              onPlay={playTrack}
              likes={likes}
              saves={saves}
              onToggleLike={toggleLike}
              onToggleSave={toggleSave}
              onInfo={openDetail}
              onBack={() => setView("home")}
              emptyIcon="🔖"
              emptyTitle="Хадгалсан дуу алга"
              emptyHint="Дуу дээрх хавчуургыг дарж дараа сонсох дуугаа хадгалаарай"
            />
          )}
          {view === "recent" && (
            <LibraryView
              title="Саяхан сонссон"
              tracks={recentTracks}
              curId={cur?.id ?? null}
              playing={playing}
              onPlay={playTrack}
              likes={likes}
              saves={saves}
              onToggleLike={toggleLike}
              onToggleSave={toggleSave}
              onInfo={openDetail}
              onBack={() => setView("home")}
              emptyIcon="🕐"
              emptyTitle="Түүх хоосон"
              emptyHint="Дуу сонсоход энд сонссон түүх чинь үлдэнэ"
            />
          )}
          {view === "history" && <HistoryView onBack={() => setView("home")} onOpenAnalysis={openAnalysis} />}
          {view === "analysis" && <AnalysisView songId={analysisSongId} onBack={() => setView("history")} />}
        </main>
      </div>

      {limitHit && !subscribed && (
        <div className="sp-limit">
          <p>Урьдчилан сонсголт дууслаа — бүтэн дуу сонсохын тулд PRO захиалга аваарай.</p>
          <button className="bt bt-a" onClick={onSubscribe}>
            Захиалга авах →
          </button>
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
      <footer className="sp-bar">
        <div className="sp-bar-l">
          {cur ? (
            <>
              <button
                className={"sp-np-toggle" + (npOpen ? " on" : "")}
                onClick={() => setNpOpen((o) => !o)}
                aria-expanded={npOpen}
                aria-label="Мэдрэх самбар"
                title="Мэдрэх самбар"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 15l6-6 6 6" />
                </svg>
              </button>
              <img className="sp-thumb" src={cur.cover} alt="" />
              <button className="sp-bar-meta sp-bar-metabtn" onClick={() => setNpOpen((o) => !o)}>
                <b>{cur.title}</b>
                <i>{cur.artist}</i>
              </button>
            </>
          ) : (
            <span className="sp-bar-hint">Дуу сонгоогүй байна</span>
          )}
        </div>

        <div className="sp-bar-c">
          <div className="sp-ctl">
            <button onClick={() => step(-1)} aria-label="Өмнөх дуу">
              ⏮
            </button>
            <button onClick={() => seek(-10)} aria-label="10 секунд ухраах" className="sp-skip">
              −10с
            </button>
            <button className="sp-play" onClick={togglePlay} aria-label={playing ? "Зогсоох" : "Тоглуулах"}>
              {playing ? "⏸" : "▶"}
            </button>
            <button onClick={() => seek(10)} aria-label="10 секунд урагшлуулах" className="sp-skip">
              +10с
            </button>
            <button onClick={() => step(1)} aria-label="Дараагийн дуу">
              ⏭
            </button>
          </div>
          <div className="sp-seek">
            <span className="mono">{fmt(time)}</span>
            <div
              className="pl-bar"
              onClick={seekTo}
              onKeyDown={(e) => {
                if (e.key === "ArrowRight") seek(5);
                else if (e.key === "ArrowLeft") seek(-5);
                else return;
                e.preventDefault();
              }}
              role="slider"
              tabIndex={0}
              aria-label="Гүйлгэх"
              aria-valuemin={0}
              aria-valuemax={Math.round(dur)}
              aria-valuenow={Math.round(time)}
            >
              {!subscribed && <i className="pl-lock" style={{ left: previewPct + "%" }}></i>}
              <i className="pl-fill" style={{ width: pct + "%" }}></i>
            </div>
            <span className="mono">{fmt(dur)}</span>
          </div>
        </div>

        <div className="sp-bar-r">
          <button
            className={"sp-vibro" + (vibro ? " on" : "")}
            onClick={() => setVibro(!vibro)}
            aria-pressed={vibro}
            title={canVibrate ? "Чичиргээ горим" : "Утсан дээр чичиргээ ажиллана — энд гэрлийн пульс"}
          >
            📳 {vibro ? "Асаалттай" : "Унтраалттай"}
          </button>
          <button
            className="sp-icbtn sp-immbtn"
            onClick={() => setImmersive(true)}
            disabled={!cur}
            aria-label="Мэдрэх горим — бүтэн дэлгэц"
            title={cur ? "Мэдрэх горим" : "Эхлээд дуу сонгоорой"}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M8 3H3v5M16 3h5v5M8 21H3v-5M16 21h5v-5" />
            </svg>
          </button>
        </div>
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
  );
}

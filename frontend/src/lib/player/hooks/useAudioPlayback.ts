"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import * as songsApi from "@/lib/api/client";
import { PREVIEW_SEC } from "@/lib/player/constants";
import type { PlayerTrack } from "@/types/player";

/* Аудио тоглуулалтын бүх механик — HTMLAudioElement, WebAudio граф, төлөв, seek.

   Player.tsx-д энэ бүхэн 7 useState, 3 useRef, 2 useEffect, 7 функц болж тарсан байв.
   Энд "ЯАЖ тоглуулах вэ" гэдэг л хаагдана; "ЯМАР дууг тоглуулах вэ" гэдэг сонголт
   (дараагийн дуу, AI-санал) нь `usePlayerQueue`-д, чичиргээ нь `useHapticEngine`-д. */

export interface AudioAnalyserBundle {
  ctx: AudioContext;
  an: AnalyserNode;
  data: Uint8Array<ArrayBuffer>;
}

export interface AudioPlayback {
  audioRef: React.MutableRefObject<HTMLAudioElement | null>;
  /** `<audio ref={attachAudio} />` — элемент DOM-д гарах агшинд listener холбоно. */
  attachAudio: (el: HTMLAudioElement | null) => void;
  /** RAF loop болон ImmersiveMode-д хэрэгтэй спектрийн эх сурвалж. */
  analyserRef: React.MutableRefObject<AudioAnalyserBundle | null>;
  current: PlayerTrack | null;
  /** Interval/RAF доторх шинэхэн утга (re-render хүлээхгүй). */
  currentRef: React.MutableRefObject<PlayerTrack | null>;
  playing: boolean;
  time: number;
  duration: number;
  /** Үнэгүй горимын урьдчилан сонсох хязгаарт хүрсэн эсэх. */
  limitHit: boolean;
  /** Саяхан сонссон дууны id-үүд (хамгийн сүүлийнх нь эхэнд, дээд тал нь 6). */
  recentIds: (number | string)[];
  /** Гүйлгэх мөрний дүүргэлт, % */
  progressPct: number;
  /** Үнэгүй горимын түгжээний байрлал, % */
  previewPct: number;
  play: (track: PlayerTrack) => void;
  togglePlay: (fallbackTrack?: PlayerTrack) => void;
  seekBy: (deltaSec: number) => void;
  seekToPointer: (e: React.MouseEvent<HTMLDivElement>) => void;
  /** Тоглуулагч хаагдахад — зогсоож, түүхэнд бичнэ. */
  stopAndFlush: () => void;
}

export interface AudioPlaybackOptions {
  subscribed: boolean;
  /** ШИНЭ дуу эхлэхэд (ижил дууг дахин дарахад дуудагдахгүй). */
  onTrackStart?: (track: PlayerTrack) => void;
  /** Дуу дуустал тоглосны дараа — дараагийн дууг сонгох. */
  onEnded?: () => void;
}

export function useAudioPlayback({ subscribed, onTrackStart, onEnded }: AudioPlaybackOptions): AudioPlayback {
  const [current, setCurrent] = useState<PlayerTrack | null>(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [limitHit, setLimitHit] = useState(false);
  const [recentIds, setRecentIds] = useState<(number | string)[]>([]);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const analyserRef = useRef<AudioAnalyserBundle | null>(null);
  const currentRef = useRef<PlayerTrack | null>(null);
  const historyLoggedRef = useRef(false);

  /* backend Song-той холбогдсон дуу (songId-той) тоглуулж дуусах/солигдох үед History-д лог хийнэ. */
  const logCurrentToHistory = useCallback(() => {
    const track = currentRef.current;
    if (!track?.songId || historyLoggedRef.current) return;
    historyLoggedRef.current = true;
    songsApi
      .logHistory({
        songId: track.songId,
        durationMs: Math.round((audioRef.current?.currentTime || 0) * 1000),
        bpm: undefined,
      })
      .catch(() => {});
  }, []);

  /* WebAudio граф — эхний тоглуулалт дээр нэг л удаа үүснэ (MediaElementSource нь
     нэг audio элемент дээр давтагдаж үүсэхийг браузер зөвшөөрдөггүй). */
  const ensureAnalyser = useCallback(() => {
    if (analyserRef.current) {
      void analyserRef.current.ctx.resume();
      return;
    }
    const ctx = new AudioContext();
    const source = ctx.createMediaElementSource(audioRef.current!);
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 256;
    analyser.smoothingTimeConstant = 0.7;
    source.connect(analyser);
    analyser.connect(ctx.destination);
    analyserRef.current = { ctx, an: analyser, data: new Uint8Array(analyser.frequencyBinCount) };
  }, []);

  /* ⚠️ Энэ useEffect нь өмнө нь dependency array-ГҮЙ байсан: render БҮРД 5 listener
     салгаж, дахин холбодог. `timeupdate` нь секундэд ~4 удаа setTime() дуудаж
     render үүсгэдэг тул энэ нь секундэд хэдэн арван addEventListener/
     removeEventListener болж, GC-д дарамт өгч байв.

     Одоо listener НЭГ УДАА бүртгэгдэнэ. Хувьсаж байдаг утгууд (subscribed болон
     callback-ууд) ref-ээр дамжина — зан төлөв яг хэвээр, зөвхөн дахин бүртгэл алга. */
  const handlersRef = useRef({ subscribed, onEnded, logCurrentToHistory });
  handlersRef.current = { subscribed, onEnded, logCurrentToHistory };

  /* ⚠️ Энэ listener-үүдийг `useEffect(..., [])`-ээр бүртгэж БОЛОХГҮЙ.
     `Player` нь `open=false`-оор mount болдог (app/page.tsx) тул тэр агшинд `<audio>`
     элемент DOM-д БАЙХГҮЙ — effect ажиллаад `audioRef.current === null` дээр буцна.
     `open` үнэн болоод элемент үүсэхэд effect дахин ажиллахгүй тул listener хэзээ ч
     холбогдохгүй байв: гүйлгэх мөрний цаг, үнэгүй горимын PREVIEW_SEC таслалт, дуу
     дуусахад дараагийнх руу шилжих гурав чимээгүй ажиллахаа больдог.

     Шийдэл: callback ref — элемент DOM-д гарч ирэх/алга болох ЯГ тэр агшинд
     listener-үүдийг холбож/салгана. `open` эргэж хаагдаад дахин нээгдсэн ч зөв ажиллана. */
  const detachRef = useRef<(() => void) | null>(null);

  const attachAudio = useCallback((el: HTMLAudioElement | null) => {
    detachRef.current?.();
    detachRef.current = null;
    audioRef.current = el;
    if (!el) return;

    const onTime = () => {
      setTime(el.currentTime);
      if (!handlersRef.current.subscribed && el.currentTime >= PREVIEW_SEC) {
        el.pause();
        setLimitHit(true);
      }
    };
    const onMeta = () => setDuration(el.duration);
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onEnd = () => {
      handlersRef.current.logCurrentToHistory();
      handlersRef.current.onEnded?.();
    };

    el.addEventListener("timeupdate", onTime);
    el.addEventListener("loadedmetadata", onMeta);
    el.addEventListener("play", onPlay);
    el.addEventListener("pause", onPause);
    el.addEventListener("ended", onEnd);

    detachRef.current = () => {
      el.removeEventListener("timeupdate", onTime);
      el.removeEventListener("loadedmetadata", onMeta);
      el.removeEventListener("play", onPlay);
      el.removeEventListener("pause", onPause);
      el.removeEventListener("ended", onEnd);
    };
  }, []);

  /* Компонент бүрмөсөн алга болоход (жиш. Player-ийн `key` солигдож дахин mount
     хийгдэхэд, см. app/page.tsx) listener-үүд vлдэхгvй, WebAudio граф ч чөлөөлнө —
     эс бол AudioContext хуучин хэрэглэгчийнхээ audio холболттойгоор санах ойд
     vлдэж (browser нь нэг таб дотор AudioContext-ийн тоог хязгаарладаг),
     дараагийн хэрэглэгчийн `ensureAnalyser()` шинэ ctx vvсгэхэд хуучин нь орхигдоно. */
  useEffect(
    () => () => {
      handlersRef.current.logCurrentToHistory();
      detachRef.current?.();
      if (analyserRef.current) {
        void analyserRef.current.ctx.close().catch(() => {});
        analyserRef.current = null;
      }
    },
    [],
  );

  const onTrackStartRef = useRef(onTrackStart);
  onTrackStartRef.current = onTrackStart;

  const play = useCallback(
    (track: PlayerTrack) => {
      const el = audioRef.current;
      if (!el) return;
      ensureAnalyser();
      setLimitHit(false);

      /* Ижил дууг дахин дарах = тоглуулах/зогсоох шилжүүлэгч. */
      if (currentRef.current?.id === track.id) {
        if (!el.paused) {
          el.pause();
          setPlaying(false);
        } else {
          void el
            .play()
            .then(() => setPlaying(true))
            .catch(() => setPlaying(false));
        }
        return;
      }

      logCurrentToHistory();
      historyLoggedRef.current = false;
      setCurrent(track);
      currentRef.current = track;
      setRecentIds((prev) => [track.id, ...prev.filter((id) => id !== track.id)].slice(0, 6));
      el.src = track.file || "";
      void el
        .play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));

      onTrackStartRef.current?.(track);
    },
    [ensureAnalyser, logCurrentToHistory],
  );

  const togglePlay = useCallback(
    (fallbackTrack?: PlayerTrack) => {
      if (!currentRef.current) {
        if (fallbackTrack) play(fallbackTrack);
        return;
      }
      ensureAnalyser();
      const el = audioRef.current;
      if (!el) return;
      if (!el.paused) {
        el.pause();
        setPlaying(false);
        return;
      }
      if (limitHit) return;
      void el
        .play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    },
    [ensureAnalyser, limitHit, play],
  );

  const seekBy = useCallback(
    (deltaSec: number) => {
      const el = audioRef.current;
      if (!el || !currentRef.current) return;
      let next = Math.max(0, el.currentTime + deltaSec);
      if (!subscribed) next = Math.min(next, PREVIEW_SEC - 1);
      el.currentTime = Math.min(next, (el.duration || 1) - 0.5);
    },
    [subscribed],
  );

  const seekToPointer = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = audioRef.current;
      if (!el || !currentRef.current || !duration) return;
      const rect = e.currentTarget.getBoundingClientRect();
      let next = ((e.clientX - rect.left) / rect.width) * duration;
      if (!subscribed) next = Math.min(next, PREVIEW_SEC - 1);
      el.currentTime = next;
    },
    [duration, subscribed],
  );

  const stopAndFlush = useCallback(() => {
    audioRef.current?.pause();
    logCurrentToHistory();
  }, [logCurrentToHistory]);

  const progressPct = duration ? (time / duration) * 100 : 0;
  const previewPct = duration && !subscribed ? Math.min(100, (PREVIEW_SEC / duration) * 100) : 100;

  return {
    audioRef,
    attachAudio,
    analyserRef,
    current,
    currentRef,
    playing,
    time,
    duration,
    limitHit,
    recentIds,
    progressPct,
    previewPct,
    play,
    togglePlay,
    seekBy,
    seekToPointer,
    stopAndFlush,
  };
}

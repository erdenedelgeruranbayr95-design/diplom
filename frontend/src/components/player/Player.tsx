"use client";

/* Тоглуулагчийн бүрхүүл (shell).

   Урьд нь энэ файл 1069 мөр байсан: localStorage сан, backend каталог, IndexedDB,
   мэдэгдэл, playlist, WebAudio граф, RAF loop, чичиргээний interval, статистик,
   Escape шатлал, 20 дэлгэцийн чиглүүлэлт БҮГД нэг компонент дотор байв.

   Одоо энэ файл ЗӨВХӨН найруулга (composition) хийнэ:
     · бизнес логик  → lib/player/hooks/*  (useUserLibrary, useTrackCatalog,
                        useAudioPlayback, useHapticEngine, usePlayerQueue, …)
     · дэлгэц сонголт → PlayerViewRouter
     · доод баар      → PlayerFooter
     · дууны үйлдлүүд → TrackActionsProvider (prop drilling байхгүй) */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import TopBar from "@/components/layout/TopBar";
import Sidebar from "@/components/layout/Sidebar";
import PageContainer from "@/components/layout/PageContainer";
import { ActionButton } from "@/components/ui/ActionGroup";
import Icon from "@/components/ui/Icon";
import NowPlayingSidebar from "./NowPlayingSidebar";
import PlayerFooter from "./PlayerFooter";
import PlayerOverlays from "./PlayerOverlays";
import PlayerStatusRegion from "./PlayerStatusRegion";
import PlayerViewRouter from "./PlayerViewRouter";
import { TrackActionsProvider, type TrackActions } from "./PlayerContext";
import { useAppPreferences } from "@/hooks/useAppPreferences";
import { useBodyClass } from "@/hooks/useBodyClass";
import { useEscapeStack } from "@/hooks/useEscapeStack";
import { useClosingTransition } from "@/hooks/useClosingTransition";
import { useWindowEvent } from "@/hooks/useWindowEvent";
import { APP_EVENTS } from "@/lib/data/events";
import { feelProfileFor } from "@/lib/player/constants";
import { ToneGenerator, vibrate } from "@/lib/audio/tone";
import { loadHapticScore } from "@/lib/audio/haptic-score";
import { ALL_GENRES, filterTracks, indexTracksById, resolveTracks } from "@/lib/player/track-index";
import { scoreRecommendations } from "@/lib/player/recommendations";
import * as songsApi from "@/lib/api/client";
import { useAudioPlayback } from "@/lib/player/hooks/useAudioPlayback";
import { useHapticEngine } from "@/lib/player/hooks/useHapticEngine";
import { useListeningStats } from "@/lib/player/hooks/useListeningStats";
import { useNotificationFeed } from "@/lib/player/hooks/useNotificationFeed";
import { usePlayerQueue } from "@/lib/player/hooks/usePlayerQueue";
import { usePlaylistLibrary } from "@/lib/player/hooks/usePlaylistLibrary";
import { useTrackCatalog } from "@/lib/player/hooks/useTrackCatalog";
import { useUserLibrary } from "@/lib/player/hooks/useUserLibrary";
import { useDeviceSync } from "@/lib/socket/useDeviceSync";
import type { SessionUser } from "@/types/auth";
import type { PlayerTrack, ViewName } from "@/types/player";

const IMMERSIVE_EXIT_MS = 220;

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
  /* ---------- навигаци ба сонголтууд ---------- */
  const [view, setView] = useState<ViewName>("home");
  const [detailTrack, setDetailTrack] = useState<PlayerTrack | null>(null);
  const [artistId, setArtistId] = useState<string | null>(null);
  const [analysisSongId, setAnalysisSongId] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  /* ---------- overlay-ууд ---------- */
  const [immersive, setImmersive] = useState(false);
  const [nowPlayingOpen, setNowPlayingOpen] = useState(false);
  const [calibrateOpen, setCalibrateOpen] = useState(false);
  const [pairingOpen, setPairingOpen] = useState(false);
  const [vibrationOn, setVibrationOn] = useState(true);

  /* ---------- домэйн hook-ууд ---------- */
  const email = user?.email || "";
  const library = useUserLibrary(email);
  const catalog = useTrackCatalog(open);
  const { playlists } = usePlaylistLibrary(email, open);
  const notifications = useNotificationFeed({ enabled: open, email, notifyEnabled: library.prefs.notifyFeed ?? true });

  const deviceSync = useDeviceSync(() => {
    /* Шинэ (эсвэл дахин холбогдсон) утас руу одоогийн тоглож буй дууны мэдээллийг
       шууд илгээнэ — track солигдоогүй байхад ч утас "юу ч тоглохгүй байна" гэж
       үзэхээс сэргийлнэ (§ reconnect gap). */
    const track = playback.currentRef.current;
    if (track) deviceSync.emitTrackChanged({ title: track.title, artist: track.artist });
  });

  /* `next()` нь playback-аас хамаардаг, playback нь `onEnded`-д `next()`-ийг шаарддаг —
     энэ мөчлөгийг ref-ээр таслана (өмнө нь `audioHandlersRef` ижил үүрэг гүйцэтгэдэг байв). */
  const nextRef = useRef<() => void>(() => {});

  const playback = useAudioPlayback({
    subscribed,
    onEnded: () => nextRef.current(),
    onTrackStart: (track) => {
      /* songId-тэй (analyze хийгдсэн) бол beatTimestamps-ийг татаж scheduler-т тохируулна;
         эс бол scheduler хоосорч, level-threshold fallback идэвхжинэ. */
      haptics.setBeatTimestamps(null);
      haptics.setHapticScore(null);
      if (track.songId) {
        songsApi
          .getSong(track.songId)
          .then((song) => haptics.setBeatTimestamps(song.beatTimestamps))
          .catch(() => {});
        /* Haptic Score (8-бүс, worker бэлдсэн) — READY бол л татна, эс бол дуудлага
           дэмий үрэхгүй (score.getAnalysisStatus 1 удаагийн хямд GET). */
        songsApi
          .getAnalysisStatus(track.songId)
          .then((status) => {
            if (status.analysisStatus === "READY" && status.scoreUrl) {
              return loadHapticScore(status.scoreUrl).then((score) => haptics.setHapticScore(score));
            }
          })
          .catch(() => {});
      }
      if (deviceSync.isConnected) deviceSync.emitTrackChanged({ title: track.title, artist: track.artist });
    },
  });

  const haptics = useHapticEngine({
    enabled: open,
    playing: playback.playing,
    vibrationOn,
    prefs: library.prefs,
    analyserRef: playback.analyserRef,
    audioRef: playback.audioRef,
    statsRef: library.statsRef,
    deviceSync,
  });

  useListeningStats({
    enabled: open,
    playing: playback.playing,
    email,
    statsRef: library.statsRef,
    currentRef: playback.currentRef,
  });

  /* ---------- дериватив жагсаалтууд ---------- */
  const trackIndex = useMemo(() => indexTracksById(catalog.allTracks), [catalog.allTracks]);
  /* Төрлөөр шүүх UI (GenreFilter) устсан тул `genre` нь үргэлж «Бүгд». Хайлтын
     талбар үлдсэн учир `query` хэвээр — доорх «тоглуулах» товч хайлтад тохирсон
     эхний дууг эхлүүлнэ. */
  const filteredTracks = useMemo(() => filterTracks(catalog.allTracks, { genre: ALL_GENRES, query }), [catalog.allTracks, query]);
  const recentTracks = useMemo(() => resolveTracks(playback.recentIds, trackIndex), [playback.recentIds, trackIndex]);
  const likedTracks = useMemo(() => resolveTracks(library.likedIds, trackIndex), [library.likedIds, trackIndex]);
  const savedTracks = useMemo(() => resolveTracks(library.savedIds, trackIndex), [library.savedIds, trackIndex]);

  const queue = usePlayerQueue({
    allTracks: catalog.allTracks,
    currentRef: playback.currentRef,
    play: playback.play,
    stats: library.statsRef.current,
    likedIds: library.likedIds,
    savedIds: library.savedIds,
    recentTracks,
  });
  nextRef.current = queue.next;

  /* ---------- тохиргоог бодит нөлөө болгох ---------- */
  useAppPreferences({ largeText: library.prefs.largeText, reducedMotion: library.prefs.reducedMotion });
  useBodyClass("native-cursor", open);

  /* Калибровкийг нэвтрэх үед АВТОМАТААР санал болгохоо больсон — нэвтэрмэгц шууд нүүр
     хуудас нээгдэнэ. Калибровк өөрөө хэвээр: Тохиргоо цэс (SettingsDropdown) болон
     Тусламж хуудсаас (HelpView) хүссэн үедээ нээж болно. */

  /* нээгдэхэд: админ/эмч бол өөрийн самбараас, энгийн хэрэглэгч нүүрээс эхэлнэ */
  useEffect(() => {
    if (open) setView(isAdmin ? "admin" : isTherapist ? "therapist" : isParent ? "parent" : "home");
  }, [open, isAdmin, isTherapist, isParent]);

  /* хаагдахад: тоглуулалтыг зогсоож, түүхэнд бичээд, утасны холболтыг таслана */
  useEffect(() => {
    if (open) return;
    playback.stopAndFlush();
    deviceSync.disconnect();
    /* deviceSync нь render бүрд шинэ объект буцаадаг тул dependency болгохгүй —
       эс бол энэ effect тоглуулагч хаалттай үед render бүрд дахин ажиллана. */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, playback.stopAndFlush]);

  /* Мэдрэмжийн туршилтын AudioContext-ийг гарахад чөлөөлнө. */
  const toneRef = useRef(new ToneGenerator());
  const tone = toneRef.current;
  useEffect(() => () => tone.close(), [tone]);

  /* админ самбараас хэрэглэгч устгагдахад тоог шинэчилнэ */
  const [, setUsersTick] = useState(0);
  useWindowEvent(APP_EVENTS.usersChanged, () => setUsersTick((t) => t + 1));

  /* ---------- үйлдлүүд ---------- */
  const goHome = useCallback(() => setView("home"), []);
  const toggleVibration = useCallback(() => setVibrationOn((v) => !v), []);

  const openDetail = useCallback((track: PlayerTrack) => {
    setDetailTrack(track);
    setView("detail");
  }, []);

  const openArtist = useCallback((id: string) => {
    setArtistId(id);
    setView("artist");
  }, []);

  const openAnalysis = useCallback((songId: string) => {
    setAnalysisSongId(songId);
    setView("analysis");
  }, []);

  function openPairing() {
    if (deviceSync.qrState === "idle") void deviceSync.createSession();
    setPairingOpen(true);
  }

  /* Мэдрэх горимоос гарахад instant unmount хийхийн оронд богино fade-out animation
     харуулаад дараа нь бодитоор unmount хийнэ (aov-out keyframe, ui.css). */
  const immersiveExit = useClosingTransition(useCallback(() => setImmersive(false), []), IMMERSIVE_EXIT_MS);

  /* Төрлийн "мэдрэмжийн" туршилт — чичиргээ + давамгайлах бүсийн богино дуу. */
  const feelTest = useCallback(
    (track: PlayerTrack) => {
      const feel = feelProfileFor(track.genre);
      vibrate(feel.pattern);
      const dominant: [number, number, OscillatorType] =
        feel.bass >= feel.mid && feel.bass >= feel.high
          ? [55, 0.7, "sine"]
          : feel.mid >= feel.high
            ? [330, 0.45, "triangle"]
            : [1500, 0.3, "square"];
      tone.play(...dominant);
    },
    [tone],
  );

  /* Escape-ийн шатлал — хамгийн дээд давхаргаас доош нэг л удаа хаана. */
  useEscapeStack(
    [
      { active: immersive, onEscape: immersiveExit.handleClose },
      { active: nowPlayingOpen, onEscape: () => setNowPlayingOpen(false) },
      { active: calibrateOpen, onEscape: null }, // калибровк өөрөө удирдана
      { active: view !== "home", onEscape: goHome },
      { active: true, onEscape: onClose },
    ],
    { enabled: open },
  );

  /* ---------- дууны үйлдлүүдийн нийтлэг контекст ---------- */
  const trackActions: TrackActions = {
    currentId: playback.current?.id ?? null,
    playing: playback.playing,
    likedIds: library.likedIds,
    savedIds: library.savedIds,
    play: playback.play,
    toggleLike: library.toggleLike,
    toggleSave: library.toggleSave,
    openDetail,
    openArtist,
    setView,
  };

  if (!open) return null;

  const renewDate = user?.sub?.renews ? new Date(user.sub.renews).toLocaleDateString("mn-MN") : "";
  const detailReasons = detailTrack
    ? scoreRecommendations(catalog.allTracks, {
        stats: library.statsRef.current,
        likedIds: library.likedIds,
        savedIds: library.savedIds,
        recentTracks,
        limit: catalog.allTracks.length,
      }).find((r) => r.track.id === detailTrack.id)?.reasons
    : undefined;

  return (
    <TrackActionsProvider value={trackActions}>
      <div className="fixed inset-0 z-[9000] flex flex-col p-0 overflow-hidden [animation:aov_.35s_ease] [backdrop-filter:blur(24px)] [background:radial-gradient(1100px_560px_at_80%_-10%,rgba(56,232,206,.06),transparent_58%),linear-gradient(180deg,#0b0e0e,#070909_62%)]">
        <audio ref={playback.attachAudio} crossOrigin="anonymous" />

        <PlayerStatusRegion track={playback.current} playing={playback.playing} limitHit={playback.limitHit} />

        <div
          className="fixed left-1/2 top-[58%] w-[860px] h-[860px] rounded-full pointer-events-none [background:radial-gradient(circle,rgba(56,232,206,.3),transparent_62%)] -translate-x-1/2 -translate-y-1/2 opacity-10 transition-[opacity,transform] duration-[130ms] ease-linear z-0"
          ref={haptics.pulseRef}
          aria-hidden="true"
        ></div>

        <TopBar
          view={view}
          setView={setView}
          query={query}
          setQuery={setQuery}
          vizRef={haptics.vizRef}
          user={user}
          isAdmin={isAdmin}
          isTherapist={isTherapist}
          isParent={isParent}
          subscribed={subscribed}
          onSubscribe={onSubscribe}
          onLogout={onLogout}
          onClose={onClose}
          feed={notifications.feed}
          readTs={notifications.readTs}
          onOpenNotifs={notifications.markRead}
          prefs={library.prefs}
          updatePrefs={library.updatePrefs}
          setCalibOpen={setCalibrateOpen}
          renewDate={renewDate}
        />

        {/* их бие */}
        <div className="relative z-[2] flex flex-1 min-h-0 w-full max-nav:flex-col">
          <Sidebar view={view} likedTracks={likedTracks} savedTracks={savedTracks} recentTracks={recentTracks} />

          <div className="flex min-w-0 flex-1 max-nav:flex-col">
            <PageContainer scrollKey={view + ":" + (detailTrack?.id ?? "")}>
              <PlayerViewRouter
                view={view}
                catalog={{ allTracks: catalog.allTracks, query, filteredTracks }}
                collections={{
                  liked: likedTracks,
                  saved: savedTracks,
                  recent: recentTracks,
                  playlists,
                  stats: library.statsRef.current,
                }}
                selection={{ detailTrack, detailReasons, artistId, analysisSongId }}
                session={{ user, email, subscribed, renewDate, isAdmin, isTherapist, isParent }}
                settings={{
                  prefs: library.prefs,
                  onUpdatePrefs: library.updatePrefs,
                  canVibrate: haptics.canVibrate,
                  deviceSync,
                  signalBarsRef: haptics.signalBarsRef,
                  hasHapticScore: haptics.hasHapticScore,
                  bandLevelsRef: haptics.bandLevelsRef,
                  deviceRouter: haptics.deviceRouter,
                }}
                actions={{
                  goHome,
                  onSubscribe,
                  onCancelSub,
                  onOpenAdminPanel: onAdmin,
                  onOpenCalibrate: () => setCalibrateOpen(true),
                  onOpenAnalysis: openAnalysis,
                  onFeelTest: feelTest,
                  onBackToHistory: () => setView("history"),
                }}
              />
            </PageContainer>

            <NowPlayingSidebar
              track={playback.current}
              playing={playback.playing}
              currentTime={playback.time}
              onTogglePlay={() => playback.togglePlay()}
              sidebarBarsRef={haptics.sidebarBarsRef}
            />
          </div>
        </div>

        {playback.limitHit && !subscribed && (
          <div className="absolute left-1/2 bottom-[108px] -translate-x-1/2 z-[5] flex items-center gap-4 flex-wrap justify-center border border-[rgba(217,165,76,.45)] bg-[rgba(20,16,7,.95)] rounded-xl p-[14px_20px] text-body max-w-[min(92vw,560px)] [animation:abx_.4s_cubic-bezier(.16,.8,.24,1)]">
            <p>Урьдчилан сонсголт дууслаа — бүтэн дуу сонсохын тулд PRO захиалга аваарай.</p>
            <ActionButton variant="primary" onClick={onSubscribe}>
              Захиалга авах
              <Icon name="arrowRight" size={15} />
            </ActionButton>
          </div>
        )}

        <PlayerOverlays
          track={playback.current}
          playing={playback.playing}
          prefs={library.prefs}
          onUpdatePrefs={library.updatePrefs}
          haptics={haptics}
          deviceSync={deviceSync}
          analyser={playback.analyserRef.current?.an ?? null}
          vibrationOn={vibrationOn}
          onToggleVibration={toggleVibration}
          nowPlayingOpen={nowPlayingOpen}
          onCloseNowPlaying={() => setNowPlayingOpen(false)}
          onOpenImmersive={() => {
            setNowPlayingOpen(false);
            setImmersive(true);
          }}
          onOpenPairing={openPairing}
          onTestVibration={() => vibrate([230, 80, 230])}
          pairingOpen={pairingOpen}
          onClosePairing={() => setPairingOpen(false)}
          immersive={immersive}
          immersiveClosing={immersiveExit.closing}
          onCloseImmersive={immersiveExit.handleClose}
          calibrateOpen={calibrateOpen}
          onCloseCalibrate={() => setCalibrateOpen(false)}
          onCalibrationDone={library.updatePrefs}
          footer={
            <PlayerFooter
              playback={playback}
              subscribed={subscribed}
              vibrationOn={vibrationOn}
              onToggleVibration={toggleVibration}
              canVibrate={haptics.canVibrate}
              nowPlayingOpen={nowPlayingOpen}
              onToggleNowPlaying={() => setNowPlayingOpen((o) => !o)}
              phoneConnected={deviceSync.isConnected}
              onOpenPairing={openPairing}
              onStep={queue.step}
              onTogglePlay={() => playback.togglePlay(filteredTracks[0])}
              onImmersive={() => setImmersive(true)}
            />
          }
        />
      </div>
    </TrackActionsProvider>
  );
}

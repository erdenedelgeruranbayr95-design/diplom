"use client";

/* Тоглуулагчийн дэлгэц сонгогч (routing table).

   Урьд нь Player.tsx-ийн `return (...)` дотор 150 мөрийн `{view === "x" && <X .../>}`
   гинж байсан бөгөөд шинэ дэлгэц нэмэх бүрд 1069 мөрт файлыг хөндөх шаардлагатай байв.
   Одоо чиглүүлэлт энд тусдаа; Player нь зөвхөн бүрхүүл (TopBar · Sidebar · footer ·
   overlay-ууд)-ийг хариуцна.

   Prop-ууд нь 6 сэдвээр БҮЛЭГЛЭГДСЭН (catalog · collections · selection · session ·
   settings · actions) — 37 хавтгай prop бол өөрөө нэг төрлийн нийлмэл байдал тул. */
import type { MutableRefObject } from "react";
import AdminView from "./views/AdminView";
import AnalysisView from "./views/AnalysisView";
import ArtistView from "./views/ArtistView";
import BillingView from "./views/BillingView";
import DetailView from "./views/DetailView";
import DevicesView from "./views/DevicesView";
import HelpView from "./views/HelpView";
import HistoryView from "./views/HistoryView";
import HomeView from "./views/HomeView";
import LibraryView from "./views/LibraryView";
import ParentView from "./views/ParentView";
import PlaylistsView from "./views/PlaylistsView";
import ProfileView from "./views/ProfileView";
import ProgressView from "./views/ProgressView";
import StatsView from "./views/StatsView";
import TherapistView from "./views/TherapistView";
import UploadSongView from "./views/UploadSongView";
import ArtistProfileView from "./views/ArtistProfileView";
import type { useDeviceSync } from "@/lib/socket/useDeviceSync";
import type { DeviceRouter } from "@/lib/haptics/DeviceRouter";
import type { SessionUser } from "@/types/auth";
import type { PlayerTrack, Prefs, ViewName } from "@/types/player";
import type { ListeningStats, Playlist } from "@/types/track";

/* "Дуртай / Хадгалсан / Саяхан сонссон" гурав нь ЯГ ижил `LibraryView`, зөвхөн гарчиг ба
   хоосон төлөвийн бичвэр өөр. Урьд нь Player.tsx-д 3 удаа 18 мөрөөр хуулагдсан байв. */
const COLLECTION_VIEWS = {
  liked: {
    title: "Дуртай дуунууд",
    emptyIcon: "heart",
    emptyTitle: "Дуртай дуу алга",
    emptyHint: "Дуу дээрх зүрхэн товчийг дарж дуртай дуугаа энд цуглуулаарай",
  },
  saved: {
    title: "Хадгалсан",
    emptyIcon: "bookmark",
    emptyTitle: "Хадгалсан дуу алга",
    emptyHint: "Дуу дээрх хавчуургыг дарж дараа сонсох дуугаа хадгалаарай",
  },
  recent: {
    title: "Саяхан сонссон",
    emptyIcon: "clock",
    emptyTitle: "Түүх хоосон",
    emptyHint: "Дуу сонсоход энд сонссон түүх чинь үлдэнэ",
  },
} as const;

/** Каталог ба хайлтын төлөв. */
export interface CatalogSlice {
  allTracks: PlayerTrack[];
  /** Дээд талын хайлтын талбарын утга ба түүнд тохирсон дуунууд. */
  query: string;
  filteredTracks: PlayerTrack[];
}

/** Хэрэглэгчийн цуглуулгууд. */
export interface CollectionsSlice {
  liked: PlayerTrack[];
  saved: PlayerTrack[];
  recent: PlayerTrack[];
  playlists: Playlist[];
  stats: ListeningStats | null;
}

/** Одоо нээгдсэн объектууд (дэлгэрэнгүй · дуучин · анализ). */
export interface SelectionSlice {
  detailTrack: PlayerTrack | null;
  detailReasons?: string[];
  artistId: string | null;
  analysisSongId: string | null;
}

/** Нэвтэрсэн хэрэглэгч ба эрх. */
export interface SessionSlice {
  user: SessionUser | null;
  email: string;
  subscribed: boolean;
  renewDate: string;
  isAdmin: boolean;
  isTherapist: boolean;
  isParent: boolean;
}

/** Тохиргоо ба төхөөрөмжийн холболт. */
export interface SettingsSlice {
  prefs: Prefs;
  onUpdatePrefs: (patch: Partial<Prefs>) => void;
  canVibrate: boolean;
  deviceSync: ReturnType<typeof useDeviceSync>;
  signalBarsRef: MutableRefObject<(HTMLSpanElement | null)[]>;
  /** Одоо тоглож буй дуу Haptic Score (8-бүс, worker бэлдсэн) авсан эсэх. */
  hasHapticScore: boolean;
  /** 8 бүсийн одоогийн энерги (0..1) — Score байхгүй үед хоосон массив. */
  bandLevelsRef: MutableRefObject<number[]>;
  /** Холбогдсон HapticDevice-уудыг удирдах (DevicesView-ийн "Холбох"/"Тест" товч). */
  deviceRouter: DeviceRouter;
}

/** Дэлгэцээс дуудагдах гадаад үйлдлүүд. */
export interface RouterActions {
  goHome: () => void;
  onSubscribe: () => void;
  onCancelSub: () => void;
  onOpenAdminPanel: () => void;
  onOpenCalibrate: () => void;
  onOpenAnalysis: (songId: string) => void;
  onFeelTest: (track: PlayerTrack) => void;
  onBackToHistory: () => void;
}

export interface PlayerViewRouterProps {
  view: ViewName;
  catalog: CatalogSlice;
  collections: CollectionsSlice;
  selection: SelectionSlice;
  session: SessionSlice;
  settings: SettingsSlice;
  actions: RouterActions;
}

export default function PlayerViewRouter({ view, catalog, collections, selection, session, settings, actions }: PlayerViewRouterProps) {
  const goHome = actions.goHome;

  if (view === "home") {
    return (
      <HomeView
        allTracks={catalog.allTracks}
        query={catalog.query}
        filteredTracks={catalog.filteredTracks}
        recentTracks={collections.recent}
        likedTracks={collections.liked}
        stats={collections.stats}
        playlists={collections.playlists}
        isAdmin={session.isAdmin}
        isTherapist={session.isTherapist}
        isParent={session.isParent}
      />
    );
  }

  if (view === "stats" && collections.stats) {
    return <StatsView stats={collections.stats} allTracks={catalog.allTracks} onBack={goHome} />;
  }

  if (view === "billing") {
    return (
      <BillingView
        user={session.user}
        isAdmin={session.isAdmin}
        renewDate={session.renewDate}
        onSubscribe={actions.onSubscribe}
        onCancelSub={actions.onCancelSub}
        onBack={goHome}
      />
    );
  }

  if (view === "help") {
    return <HelpView onOpenCalibrate={actions.onOpenCalibrate} onBack={goHome} />;
  }

  if (view === "detail" && selection.detailTrack) {
    const track = selection.detailTrack;
    return (
      <DetailView
        track={track}
        songId={track.songId}
        onFeelTest={() => actions.onFeelTest(track)}
        onBack={goHome}
        recommendReasons={selection.detailReasons}
        deviceSync={settings.deviceSync}
        signalBarsRef={settings.signalBarsRef}
      />
    );
  }

  if (view === "artist" && selection.artistId) {
    return <ArtistView artistId={selection.artistId} allTracks={catalog.allTracks} onBack={goHome} />;
  }

  if (view === "admin" && session.isAdmin) {
    return <AdminView allTracksCount={catalog.allTracks.length} onOpenAdmin={actions.onOpenAdminPanel} onGoHome={goHome} />;
  }

  if (view === "therapist" && session.isTherapist) return <TherapistView onGoHome={goHome} />;
  if (view === "parent" && session.isParent) return <ParentView onGoHome={goHome} />;
  /* Дуу нэмэх: PRO захиалагч ЭСВЭЛ уран бүтээлч. Хоёр дахь нөхцөлийг энд шалгах
     боломжгүй (профайл нь серверт байна) тул дэлгэц өөрөө эрхгүй тохиолдлыг
     тайлбарлана — backend ямар ч байсан `Role.USER`-т зөвшөөрдөг. */
  if (view === "upload" && !session.isAdmin) return <UploadSongView onBack={goHome} />;
  if (view === "artistProfile" && !session.isAdmin) return <ArtistProfileView onBack={goHome} />;
  if (view === "progress") return <ProgressView onBack={goHome} />;
  if (view === "profile") return <ProfileView onBack={goHome} prefs={settings.prefs} onUpdatePrefs={settings.onUpdatePrefs} />;

  if (view === "devices") {
    return (
      <DevicesView
        prefs={settings.prefs}
        onUpdatePrefs={settings.onUpdatePrefs}
        canVibrate={settings.canVibrate}
        onBack={goHome}
        deviceSync={settings.deviceSync}
        hasHapticScore={settings.hasHapticScore}
        bandLevelsRef={settings.bandLevelsRef}
        deviceRouter={settings.deviceRouter}
      />
    );
  }

  if (view === "playlists") {
    return <PlaylistsView email={session.email} tracks={catalog.allTracks} onBack={goHome} />;
  }

  if (view === "liked" || view === "saved" || view === "recent") {
    const config = COLLECTION_VIEWS[view];
    const tracks = view === "liked" ? collections.liked : view === "saved" ? collections.saved : collections.recent;
    return (
      <LibraryView
        title={config.title}
        tracks={tracks}
        onBack={goHome}
        emptyIcon={config.emptyIcon}
        emptyTitle={config.emptyTitle}
        emptyHint={config.emptyHint}
      />
    );
  }

  if (view === "history") return <HistoryView onBack={goHome} onOpenAnalysis={actions.onOpenAnalysis} />;
  if (view === "analysis") return <AnalysisView songId={selection.analysisSongId} onBack={actions.onBackToHistory} />;

  return null;
}

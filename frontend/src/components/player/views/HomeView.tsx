"use client";

/* Нүүр — тоглуулагчийн үндсэн дэлгэц.

   Урьд нь энэ файл 593 мөр байсан: backend-ийн 4 дуудлага, 7 useState, 4 useMemo,
   3 төрлийн карт, 2 skeleton, 8 секцийн бүрэн разметк бүгд нэг дор байв. Одоо энэ
   файл ЗӨВХӨН секцүүдийн дараалал (composition)-ыг тодорхойлно:
     · өгөгдөл          → `useHomeCatalog` (backend), `scoreRecommendations` (локал)
     · дууны үйлдлүүд   → `TrackActionsProvider` контекст (prop drilling байхгүй)
     · секц бүрийн разметк → components/player/home/* */
import { useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBolt, faClockRotateLeft, faCompactDisc, faFeather, faHeart, faTags } from "@fortawesome/free-solid-svg-icons";
import { SectionTitle } from "@/components/ui/PageHeader";
import QuickAction from "@/components/player/shared/QuickAction";
import { useTrackActions } from "@/components/player/PlayerContext";
import ArtistRail from "./home/ArtistRail";
import CatalogSections, { RailSection } from "./home/CatalogSections";
import HomeGreeting from "./home/HomeGreeting";
import ListeningSummary from "./home/ListeningSummary";
import PlaylistGrid from "./home/PlaylistGrid";
import RecommendationRail, { type TrackRecommendation } from "./home/RecommendationRail";
import SearchResultGrid from "./home/SearchResultGrid";
import TrackRail from "./home/TrackRail";
import { useHomeCatalog } from "@/lib/player/hooks/useHomeCatalog";
import { pickCalm, pickPowerful } from "@/lib/player/feel-groups";
import { scoreRecommendations } from "@/lib/player/recommendations";
import { pickByGenre, pickRecentlyAdded, topGenre } from "@/lib/player/catalog-groups";
import type { PlayerTrack } from "@/types/player";
import type { ListeningStats, Playlist } from "@/types/track";

export interface HomeViewProps {
  /** Каталогийн бүрэн жагсаалт (санал болголт, backend id-г тааруулахад). */
  allTracks: PlayerTrack[];
  /** Дээд талын хайлтын талбарт бичсэн үг. Хоосон биш бол хайлтын горим асна. */
  query: string;
  /** `query`-д тохирсон дуунууд (Player.tsx-ийн `filterTracks`). */
  filteredTracks: PlayerTrack[];
  recentTracks: PlayerTrack[];
  likedTracks: PlayerTrack[];
  stats: ListeningStats | null | undefined;
  playlists: Playlist[];
  isAdmin: boolean;
}

export default function HomeView({
  allTracks,
  query,
  filteredTracks,
  recentTracks,
  likedTracks,
  stats,
  playlists,
  isAdmin,
}: HomeViewProps) {
  const { currentId, likedIds, savedIds, setView } = useTrackActions();
  const catalog = useHomeCatalog(allTracks);
  const searching = query.trim().length > 0;

  /* AI-санал болгол — зөвхөн бодит дата дээр тооцоологдоно, backend дуудлагагүй.
     Одоо тоглож буй дууг хасна. */
  const recommendations = useMemo<TrackRecommendation[]>(
    () =>
      scoreRecommendations(allTracks, {
        stats,
        likedIds,
        savedIds,
        recentTracks,
        excludeIds: currentId != null ? [currentId] : [],
        limit: 10,
      }),
    [allTracks, stats, likedIds, savedIds, recentTracks, currentId],
  );

  /* Мэдрэмжээр ангилсан 2 секц — төрлийн чичиргээний профайлаас гарна. */
  const powerfulTracks = useMemo(() => pickPowerful(allTracks), [allTracks]);
  const calmTracks = useMemo(() => pickCalm(allTracks), [allTracks]);

  /* Нэмэлт 3 секц: сүүлд сонссон (`recentTracks` prop), хамгийн олон дуутай
     жанрын жагсаалт, каталогт хамгийн сүүлд нэмэгдсэн дуунууд. */
  const genreLabel = useMemo(() => topGenre(allTracks), [allTracks]);
  const genreTracks = useMemo(() => (genreLabel ? pickByGenre(allTracks, genreLabel) : []), [allTracks, genreLabel]);
  const recentlyAddedTracks = useMemo(() => pickRecentlyAdded(allTracks), [allTracks]);

  /* Хайлтын горим — дээд талын талбарт үг бичсэн үед НҮҮРИЙН секцүүдийг нуугаад
     зөвхөн үр дүнг харуулна (үр дүн доогуураа хаа нэгтээ алдагдахгүй). Хоосон болгонд
     нүүр хэвийн байдалдаа буцна. Hook-ууд бүгд дээр дуудагдсаны ДАРАА энэ эрт буцаалт
     хийгдэж байгаа тул hook-ийн дараалал зөрчигдөхгүй. */
  if (searching) {
    return <SearchResultGrid tracks={filteredTracks} query={query} />;
  }

  return (
    <>
      <HomeGreeting isAdmin={isAdmin} />

      <ArtistRail artists={catalog.artists} loading={catalog.artistsLoading} />

      {/* «Үргэлжлүүлэн сонсох» секцийг 2026-08-05-нд УСТГАВ — сая сонссон дуу нь
          доорх «Санал болгох»-д давхардаж гарч байсан. `recentTracks` нь prop
          хэвээр үлдэнэ: `scoreRecommendations` түүнийг оноо тооцоход ашигладаг. */}
      <RecommendationRail recommendations={recommendations} />

      <RailSection
        title={
          <>
            <FontAwesomeIcon icon={faClockRotateLeft} className="text-aqua mr-2" />
            Сүүлд сонссон дуунууд
          </>
        }
        tracks={recentTracks}
        ariaLabel="Сүүлд сонссон дуунууд"
      />

      {genreLabel && (
        <RailSection
          title={
            <>
              <FontAwesomeIcon icon={faTags} className="text-aqua mr-2" />
              {genreLabel}
            </>
          }
          tracks={genreTracks}
          ariaLabel={`${genreLabel} жанрын дуунууд`}
        />
      )}

      <RailSection
        title={
          <>
            <FontAwesomeIcon icon={faCompactDisc} className="text-aqua mr-2" />
            Шинээр нэмэгдсэн дуунууд
          </>
        }
        tracks={recentlyAddedTracks}
        ariaLabel="Шинээр нэмэгдсэн дуунууд"
      />

      {likedTracks.length > 0 && (
        <div className="mb-9">
          <SectionTitle
            title="Дуртай дуунууд"
            actions={<QuickAction icon={<FontAwesomeIcon icon={faHeart} />} label="Бүгдийг харах" onClick={() => setView("liked")} />}
          />
          <TrackRail tracks={likedTracks} ariaLabel="Дуртай дуунууд" />
        </div>
      )}

      <ListeningSummary stats={stats} />

      <PlaylistGrid playlists={playlists} tracks={allTracks} />

      <CatalogSections catalog={catalog} />

      {/* «Онцлох»-ын араас мэдрэмжээр нь ангилсан 2 секц. Ангилал нь дууны төрлийн
          чичиргээний профайлаас гардаг тул шошго ба бодит мэдрэмж зөрөхгүй. */}
      <RailSection
        title={
          <>
            <FontAwesomeIcon icon={faBolt} className="text-aqua mr-2" />
            Хүчтэй дуунууд
          </>
        }
        tracks={powerfulTracks}
        ariaLabel="Хүчтэй мэдрэгддэг дуунууд"
      />

      <RailSection
        title={
          <>
            <FontAwesomeIcon icon={faFeather} className="text-aqua mr-2" />
            Намуухан дуу
          </>
        }
        tracks={calmTracks}
        ariaLabel="Намуухан дуунууд"
      />
    </>
  );
}

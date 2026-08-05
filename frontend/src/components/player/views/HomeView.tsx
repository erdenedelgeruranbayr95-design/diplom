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
import { faBolt, faFeather, faHeart } from "@fortawesome/free-solid-svg-icons";
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
import type { PlayerTrack } from "@/types/player";
import type { ListeningStats, Playlist } from "@/types/track";

export interface HomeViewProps {
  /** Каталогийн бүрэн жагсаалт (санал болголт, backend id-г тааруулахад). */
  allTracks: PlayerTrack[];
  /** Дээд талын хайлтын талбарт бичсэн үг. Хоосон биш бол хайлтын горим асна. */
  query: string;
  /** `query`-д тохирсон дуунууд (Player.tsx-ийн `filterTracks`). */
  filteredTracks: PlayerTrack[];
  userName?: string;
  recentTracks: PlayerTrack[];
  likedTracks: PlayerTrack[];
  stats: ListeningStats | null | undefined;
  playlists: Playlist[];
  isAdmin: boolean;
  isTherapist: boolean;
  isParent: boolean;
}

export default function HomeView({
  allTracks,
  query,
  filteredTracks,
  userName,
  recentTracks,
  likedTracks,
  stats,
  playlists,
  isAdmin,
  isTherapist,
  isParent,
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

  /* Хайлтын горим — дээд талын талбарт үг бичсэн үед НҮҮРИЙН секцүүдийг нуугаад
     зөвхөн үр дүнг харуулна (үр дүн доогуураа хаа нэгтээ алдагдахгүй). Хоосон болгонд
     нүүр хэвийн байдалдаа буцна. Hook-ууд бүгд дээр дуудагдсаны ДАРАА энэ эрт буцаалт
     хийгдэж байгаа тул hook-ийн дараалал зөрчигдөхгүй. */
  if (searching) {
    return <SearchResultGrid tracks={filteredTracks} query={query} />;
  }

  return (
    <>
      <HomeGreeting userName={userName} isAdmin={isAdmin} isTherapist={isTherapist} isParent={isParent} />

      <ArtistRail artists={catalog.artists} loading={catalog.artistsLoading} />

      {/* «Үргэлжлүүлэн сонсох» секцийг 2026-08-05-нд УСТГАВ — сая сонссон дуу нь
          доорх «Санал болгох»-д давхардаж гарч байсан. `recentTracks` нь prop
          хэвээр үлдэнэ: `scoreRecommendations` түүнийг оноо тооцоход ашигладаг. */}
      <RecommendationRail recommendations={recommendations} />

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

      <PlaylistGrid playlists={playlists} />

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

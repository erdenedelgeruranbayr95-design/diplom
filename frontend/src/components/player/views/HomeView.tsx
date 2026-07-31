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
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { SectionTitle } from "@/components/ui/PageHeader";
import QuickAction from "@/components/player/shared/QuickAction";
import { useTrackActions } from "@/components/player/PlayerContext";
import ArtistRail from "./home/ArtistRail";
import CatalogSections from "./home/CatalogSections";
import GenreFilter from "./home/GenreFilter";
import HomeGreeting from "./home/HomeGreeting";
import ListeningSummary from "./home/ListeningSummary";
import PlaylistGrid from "./home/PlaylistGrid";
import RecommendationRail, { type TrackRecommendation } from "./home/RecommendationRail";
import SearchResultGrid from "./home/SearchResultGrid";
import TrackRail from "./home/TrackRail";
import { useHomeCatalog } from "@/lib/player/hooks/useHomeCatalog";
import { scoreRecommendations } from "@/lib/player/recommendations";
import type { PlayerTrack } from "@/types/player";
import type { ListeningStats, Playlist } from "@/types/track";

export interface HomeViewProps {
  genres: string[];
  genre: string;
  onGenre: (genre: string) => void;
  /** Хайлт/төрлөөр шүүсэн жагсаалт. */
  filteredTracks: PlayerTrack[];
  /** Каталогийн бүрэн жагсаалт (санал болголт, backend id-г тааруулахад). */
  allTracks: PlayerTrack[];
  query: string;
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
  genres,
  genre,
  onGenre,
  filteredTracks,
  allTracks,
  query,
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

  return (
    <>
      <HomeGreeting userName={userName} isAdmin={isAdmin} isTherapist={isTherapist} isParent={isParent} />

      <ArtistRail artists={catalog.artists} loading={catalog.artistsLoading} />

      {recentTracks.length > 0 && (
        <div className="mb-9">
          <SectionTitle title="Үргэлжлүүлэн сонсох" />
          <TrackRail tracks={recentTracks} ariaLabel="Үргэлжлүүлэн сонсох" />
        </div>
      )}

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

      <GenreFilter genres={genres} activeGenre={genre} onSelect={onGenre} />

      <SearchResultGrid tracks={filteredTracks} query={query} />
    </>
  );
}

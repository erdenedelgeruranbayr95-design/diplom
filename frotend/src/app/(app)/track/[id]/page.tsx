"use client";

/* Дууны дэлгэрэнгүй — өмнө нь `detail` гэсэн дотоод view байсныг бодит хаягтай болгов.
   Одоо /track/3 гэх мэт линкийг хуваалцах, bookmark хийх, буцах товч ажиллана. */
import { use } from "react";
import DetailView from "@/components/player/DetailView";
import { Empty } from "@/components/ui/States";
import { usePlayer } from "@/components/providers/PlayerProvider";

export default function TrackPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const p = usePlayer();

  /* URL-ийн id нь тоо (демо сан) эсвэл cuid (backend дуу) байж болно */
  const track = p.ALL.find((t) => String(t.id) === decodeURIComponent(id));

  if (!track) {
    return <Empty icon="🔍" title="Дуу олдсонгүй" hint="Энэ дуу устсан эсвэл хаяг буруу байна" />;
  }

  return (
    <DetailView
      track={track}
      songId={track.songId}
      isCurrent={p.cur?.id === track.id}
      playing={p.playing}
      onPlay={() => p.playTrack(track)}
      onFeelTest={() => p.feelTest(track)}
      onBack={() => p.goTo("home")}
      liked={p.likes.includes(track.id)}
      saved={p.saves.includes(track.id)}
      onToggleLike={() => p.toggleLike(track.id)}
      onToggleSave={() => p.toggleSave(track.id)}
    />
  );
}

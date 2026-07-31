"use client";

import { ActionButton } from "@/components/ui/ActionGroup";
import Icon from "@/components/ui/Icon";
import { useIsPlayingTrack, useTrackActions } from "@/components/player/PlayerContext";
import type { PlayerTrack } from "@/types/player";

/* Дэлгэрэнгүй хуудасны зүүн багана — обложка + үндсэн үйлдлүүд.
   "Тоглуулах"/"Санамсаргүй" нь ЗӨВХӨН энд байна (баруун баганад давхардуулахгүй). */

export default function DetailArtwork({
  track,
  heroTrack,
  firstInAlbum,
  shuffleCandidates,
  onFeelTest,
}: {
  /** Дэлгэрэнгүйг нээсэн эх track (тоглуулах/зогсоох нь үүн дээр ажиллана). */
  track: PlayerTrack;
  /** backend-ээс дүүргэсэн харагдах хувилбар (обложка, нэр). */
  heroTrack: PlayerTrack;
  /** Альбомын эхний дуу — "Тоглуулах" дарахад энэ эхэлнэ. */
  firstInAlbum: PlayerTrack;
  /** "Санамсаргүй" сонголтын сан. */
  shuffleCandidates: PlayerTrack[];
  onFeelTest: () => void;
}) {
  const { play, likedIds, savedIds, toggleLike, toggleSave } = useTrackActions();
  const { isCurrent, isPlaying } = useIsPlayingTrack(track.id);

  const liked = likedIds.includes(track.id);
  const saved = savedIds.includes(track.id);

  function playFirst() {
    /* Энэ дуу аль хэдийн тоглож байвал тоглуулах/зогсоох шилжүүлэгч болно. */
    play(isCurrent ? track : firstInAlbum);
  }

  function shufflePlay() {
    const source = shuffleCandidates.length > 0 ? shuffleCandidates : [heroTrack];
    play(source[Math.floor(Math.random() * source.length)]);
  }

  return (
    <div className="flex flex-col gap-2.5">
      <ActionButton variant="primary" size="lg" className="w-full justify-center" onClick={playFirst}>
        <Icon name={isPlaying ? "pause" : "play"} size={15} variant="fill" />
        {isPlaying ? "Зогсоох" : "Тоглуулах"}
      </ActionButton>
      <div className="grid grid-cols-2 gap-2.5">
        <ActionButton variant="secondary" className="justify-center" onClick={shufflePlay}>
          <Icon name="shuffle" size={15} />
          Санамсаргүй
        </ActionButton>
        <ActionButton variant="secondary" className="justify-center" onClick={onFeelTest}>
          <Icon name="vibrate" size={15} />
          Мэдрэх
        </ActionButton>
      </div>
      <div className="grid grid-cols-2 gap-2.5">
        <button
          className={
            "flex items-center justify-center gap-[7px] border rounded-full py-2.5 px-2 text-note font-semibold cursor-pointer transition-[color,border-color,background] duration-150 " +
            (liked
              ? "text-aqua border-[rgba(56,232,206,.4)] bg-[rgba(56,232,206,.08)]"
              : "text-dim border-line bg-[rgba(20,28,27,.4)] hover:text-ink hover:border-[rgba(242,245,244,.24)]")
          }
          onClick={() => toggleLike(track.id)}
          aria-pressed={liked}
        >
          <Icon name="heart" size={15} variant={liked ? "fill" : "stroke"} />
          Дуртай
        </button>
        <button
          className={
            "flex items-center justify-center gap-[7px] border rounded-full py-2.5 px-2 text-note font-semibold cursor-pointer transition-[color,border-color,background] duration-150 " +
            (saved
              ? "text-warm border-[rgba(217,165,76,.4)] bg-[rgba(217,165,76,.08)]"
              : "text-dim border-line bg-[rgba(20,28,27,.4)] hover:text-ink hover:border-[rgba(242,245,244,.24)]")
          }
          onClick={() => toggleSave(track.id)}
          aria-pressed={saved}
        >
          <Icon name="bookmark" size={15} variant={saved ? "fill" : "stroke"} />
          Хадгалах
        </button>
      </div>
    </div>
  );
}

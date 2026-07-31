"use client";

import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWandMagicSparkles } from "@fortawesome/free-solid-svg-icons";
import { SectionTitle } from "@/components/ui/PageHeader";
import { Empty } from "@/components/ui/States";
import TrackPlayButton, { TrackCoverButton } from "@/components/player/shared/TrackPlayButton";
import type { Recommendation } from "@/lib/player/recommendations";
import type { PlayerTrack } from "@/types/player";

export type TrackRecommendation = Recommendation<PlayerTrack>;

/* AI-санал болгол — зөвхөн бодит дата (stats.byGenre/byTrack, likes, saves, recentTracks)
   дээр тооцоологдоно, backend дуудлагагүй. Оноолт нь `lib/player/recommendations.ts`-д;
   энэ файл ЗӨВХӨН харагдах хэсэг. */

const TITLE = (
  <>
    <FontAwesomeIcon icon={faWandMagicSparkles} className="text-aqua mr-2" />
    Танд санал болгож байна
  </>
);

function RecommendationCard({ recommendation, index }: { recommendation: TrackRecommendation; index: number }) {
  const track = recommendation.track;

  return (
    <motion.article
      role="listitem"
      className="group relative flex-none w-[182px] text-left rounded-panel p-[1.5px] hover:z-10 focus-visible:z-10 [background:linear-gradient(140deg,rgba(56,232,206,.5),rgba(56,232,206,.06)_50%,rgba(56,232,206,.35))] focus-visible:outline-none focus-visible:shadow-glow-aqua"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index, 7) * 0.04, duration: 0.28 }}
    >
      <div className="rounded-lg p-[14px] bg-[rgba(13,19,18,.85)] backdrop-blur-xl h-full">
        <div className="relative">
          <TrackCoverButton
            track={track}
            className="relative block w-full text-left rounded-2xl overflow-hidden aspect-square bg-[#0B1211] focus-visible:outline-none focus-visible:shadow-glow-aqua"
            imgClassName="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
            overlayClassName="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,.12)_55%,rgba(0,0,0,.45))]"
          />
          <span
            className="absolute top-2 left-2 inline-flex items-center gap-1 rounded-full bg-black/55 backdrop-blur-sm text-aqua text-meta font-mono py-1 px-2"
            aria-hidden="true"
          >
            <FontAwesomeIcon icon={faWandMagicSparkles} /> AI
          </span>
          <TrackPlayButton
            track={track}
            className="absolute right-2.5 bottom-2.5 w-[42px] h-[42px] rounded-full bg-aqua text-on-aqua flex items-center justify-center text-copy transition-[opacity,transform] duration-250 shadow-[0_6px_18px_rgba(0,0,0,.5)] hover:shadow-[0_10px_28px_rgba(56,232,206,.38)] focus-visible:outline-none focus-visible:shadow-glow-aqua"
            restingClassName="opacity-0 translate-y-1.5 group-hover:opacity-100 group-hover:translate-y-0"
          />
        </div>
        <b className="block font-semibold text-copy whitespace-nowrap overflow-hidden text-ellipsis">{track.title}</b>
        <i className="not-italic text-note text-dim whitespace-nowrap overflow-hidden text-ellipsis block mb-1.5">{track.artist}</i>
        <span className="inline-flex text-meta font-mono uppercase tracking-[.04em] rounded-full py-1 px-2 border border-white/[.1] text-faint mb-1.5">
          {track.genre}
        </span>
        {recommendation.reasons[0] && (
          <span className="block text-caption text-aqua/85 leading-[1.35] line-clamp-2">{recommendation.reasons[0]}</span>
        )}
      </div>
    </motion.article>
  );
}

export default function RecommendationRail({ recommendations }: { recommendations: TrackRecommendation[] }) {
  if (recommendations.length === 0) {
    return (
      <div className="mb-9">
        <SectionTitle title={TITLE} />
        <Empty
          icon="sparkle"
          title="Санал болгох хангалттай мэдээлэл алга."
          hint="Дуу сонсож, дуртай/хадгалах дээр дарж эхэлбэл энд танд тохирсон дуу санал болгоно"
        />
      </div>
    );
  }

  return (
    <div className="mb-9">
      <SectionTitle title={TITLE} />
      <div
        className="relative isolate flex gap-4 overflow-x-auto pt-2 pb-2 -mx-1 px-1 [scrollbar-width:thin] [scrollbar-color:var(--faint)_transparent]"
        role="list"
        aria-label="Санал болгож буй дуунууд"
      >
        {recommendations.map((recommendation, i) => (
          <RecommendationCard key={recommendation.track.id} recommendation={recommendation} index={i} />
        ))}
      </div>
    </div>
  );
}

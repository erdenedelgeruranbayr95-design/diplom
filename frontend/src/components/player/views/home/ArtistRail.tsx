"use client";

import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";
import { SectionTitle } from "@/components/ui/PageHeader";
import { useTrackActions } from "@/components/player/PlayerContext";
import RailArrow from "@/components/player/shared/RailArrow";
import { useRailScroll } from "@/hooks";
import type { Artist } from "@/types/song";

/* Алдартай дуучид — GET /artists (artists.controller.ts). Дугуй зурагтай карт,
   дарахад ArtistView руу шилжинэ. Ачаалж байх үеийн skeleton энд хамт байна —
   өмнө нь HomeView дотор 2 тусдаа блок болж 40 мөр эзэлж байв.

   Хоёр талын гүйлгэх сум нь `TrackRail`-тэй ижил бүтэцтэй (`RailArrow` + `useRailScroll`). */

/** Карт (132px) + gap (16px). */
const CARD_STEP = 148;

/* Сумны босоо байрлал: pt-4 (16px) + дугуйн радиус (56px) = зургийн яг төв. Өгөгдмөл
   `top-1/2` нь доорх нэрийн мөрийг тооцдог тул зурагнаас доогуур буух байсан. */
const ARROW_POS = "top-[72px] -translate-y-1/2";

function ArtistRailSkeleton() {
  return (
    <div className="mb-9">
      <SectionTitle title="Алдартай дуучид" />
      <div className="flex gap-4 pt-4 pb-2" role="status" aria-label="Дуучид ачааллаж байна">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex-none w-[132px] flex flex-col items-center gap-3">
            <span className="skel w-[112px] h-[112px] !rounded-full" style={{ animationDelay: i * 0.06 + "s" }} />
            <span className="skel h-3 w-20 !rounded-bar" style={{ animationDelay: i * 0.06 + "s" }} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ArtistRail({ artists, loading }: { artists: Artist[]; loading: boolean }) {
  const { openArtist } = useTrackActions();
  const { scroller, canLeft, canRight, scrollPage, sync } = useRailScroll<HTMLDivElement>(CARD_STEP, [artists.length]);

  if (loading) return <ArtistRailSkeleton />;
  if (artists.length === 0) return null;

  return (
    <div className="mb-9">
      <SectionTitle title="Алдартай дуучид" />
      <div className="relative">
        <div
          ref={scroller}
          onScroll={sync}
          className="relative isolate flex gap-4 overflow-x-auto pt-4 pb-2 -mx-1 px-1 [scrollbar-width:thin] [scrollbar-color:var(--faint)_transparent]"
          role="list"
          aria-label="Алдартай дуучид"
        >
          {artists.map((artist) => (
            <motion.button
              key={artist.id}
              role="listitem"
              className="group relative flex-none w-[132px] flex flex-col items-center gap-3 text-center focus-visible:outline-none rounded-2xl hover:z-10 focus-visible:z-10"
              onClick={() => openArtist(artist.id)}
              whileHover={{ y: -4 }}
            >
              <span className="relative w-[112px] h-[112px] rounded-full overflow-hidden bg-[linear-gradient(135deg,rgba(56,232,206,.2),rgba(56,232,206,.03))] flex items-center justify-center shadow-[0_10px_28px_rgba(0,0,0,.4)] transition-shadow duration-250 group-hover:shadow-[0_12px_32px_rgba(56,232,206,.25)] group-focus-visible:shadow-glow-aqua">
                {artist.photoUrl ? (
                  <img src={artist.photoUrl} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover" decoding="async" />
                ) : (
                  <FontAwesomeIcon icon={faMicrophone} className="text-[28px] text-aqua/70" aria-hidden="true" />
                )}
              </span>
              <span className="min-w-0 w-full">
                <b className="block font-semibold text-copy whitespace-nowrap overflow-hidden text-ellipsis">{artist.name}</b>
                {artist._count && <i className="not-italic text-note text-dim">{artist._count.songs} дуу</i>}
              </span>
            </motion.button>
          ))}
        </div>

        <RailArrow side="left" show={canLeft} onClick={() => scrollPage(-1)} position={ARROW_POS} />
        <RailArrow side="right" show={canRight} onClick={() => scrollPage(1)} position={ARROW_POS} />
      </div>
    </div>
  );
}

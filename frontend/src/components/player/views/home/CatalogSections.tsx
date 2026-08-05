"use client";

import type { ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { SectionTitle } from "@/components/ui/PageHeader";
import TrackRail from "./TrackRail";
import type { HomeCatalog } from "@/lib/player/hooks/useHomeCatalog";

/* Backend каталогийн секц: Онцлох (featured).

   «Хамгийн алдартай» (ListenHistory тоолуураар) секцийг 2026-08-05-нд УСТГАВ —
   `useHomeCatalog`-оос `/songs/popular` дуудлага нь хамт хасагдсан. */

function CatalogSkeleton() {
  return (
    <div className="mb-9">
      <SectionTitle title="Каталог" />
      <div className="flex gap-4 pt-4 pb-2 overflow-hidden" role="status" aria-label="Каталог ачааллаж байна">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex-none w-[168px] flex flex-col gap-2.5">
            <span className="skel w-[168px] h-[168px] !rounded-panel" style={{ animationDelay: i * 0.06 + "s" }} />
            <span className="skel h-3 w-28 !rounded-bar" style={{ animationDelay: i * 0.06 + "s" }} />
            <span className="skel h-2.5 w-20 !rounded-bar" style={{ animationDelay: i * 0.06 + "s" }} />
          </div>
        ))}
      </div>
    </div>
  );
}

/** Гарчигтай rail секц — жагсаалт хоосон бол огт зурагдахгүй. */
export function RailSection({ title, tracks, ariaLabel }: { title: ReactNode; tracks: HomeCatalog["featuredTracks"]; ariaLabel: string }) {
  if (tracks.length === 0) return null;
  return (
    <div className="mb-9">
      <SectionTitle title={title} />
      <TrackRail tracks={tracks} ariaLabel={ariaLabel} />
    </div>
  );
}

export default function CatalogSections({ catalog }: { catalog: HomeCatalog }) {
  return (
    <>
      {catalog.catalogLoading && <CatalogSkeleton />}

      <RailSection
        title={
          <>
            <FontAwesomeIcon icon={faStar} className="text-aqua mr-2" />
            Онцлох
          </>
        }
        tracks={catalog.featuredTracks}
        ariaLabel="Онцлох дуунууд"
      />
    </>
  );
}

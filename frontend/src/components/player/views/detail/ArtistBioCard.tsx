"use client";

import Icon from "@/components/ui/Icon";
import { Panel } from "@/components/ui/Surface";
import type { ArtistWithSongs } from "@/types/song";

/* Уран бүтээлчийн танилцуулга — нэрийг ЗӨВХӨН нэг удаа (доорх мөрд) харуулна.
   Өмнө нь гарчиг · дэд мөр · нэрийн мөр гэж 3 давхар бичигдэж байв. */
export default function ArtistBioCard({ artist, fallbackName }: { artist: ArtistWithSongs | null; fallbackName?: string }) {
  return (
    <Panel as="section">
      <div className="flex items-center justify-between gap-3 mb-3">
        <h3 className="font-display font-semibold text-title tracking-[-.03em] text-ink">Уран бүтээлчийн тухай</h3>
        {artist?.songs?.length ? <span className="mono !text-micro flex-none">{artist.songs.length} дуу</span> : null}
      </div>
      <div className="flex items-start gap-3">
        <div className="w-14 h-14 rounded-2xl overflow-hidden flex-none border border-white/[.08] bg-white/[.04]">
          {artist?.photoUrl ? (
            <img src={artist.photoUrl} alt={artist.name} className="w-full h-full object-cover" loading="lazy" decoding="async" />
          ) : (
            <div className="w-full h-full grid place-items-center text-aqua">
              <Icon name="user" size={22} />
            </div>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <b className="block font-semibold text-body text-ink">{artist?.name || fallbackName || "Тодорхойгүй"}</b>
          <p className="mt-1 text-note text-dim leading-[1.6]">
            {artist?.bio || artist?.careerInfo || "Энэ хэсэгт уран бүтээлчийн товч танилцуулга гарна."}
          </p>
        </div>
      </div>
    </Panel>
  );
}

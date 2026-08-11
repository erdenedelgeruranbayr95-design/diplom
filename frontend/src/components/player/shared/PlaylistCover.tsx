"use client";

import Icon from "@/components/ui/Icon";

/* Жагсаалтын ковер — дуунуудынх нь зургаас угсарна.

   Жагсаалт өөрөө ковер зурагтай байдаггүй (`Playlist` моделд тийм талбар байхгүй)
   тул доторх дуунуудынхаа зургийг ашиглана. Урьд нь нүүр хуудасны хүснэгт ҮРГЭЛЖ
   хоосон икон харуулдаг байсан бөгөөд хэрэглэгчид «зураг ачаалагдаагүй» мэт
   санагддаг байв — гэтэл өгөгдөл нь бэлэн байсан.

   Дуу цөөтэй үед 2×2 нүд хийвэл хоосон нүд үлдэж эвгүй харагдана. Иймд:
     0 дуу      → икон (жагсаалт хоосон гэдэг нь ҮНЭН)
     1–3 дуу    → эхний дууны ковер бүтнээр
     4+ дуу     → эхний 4 дууны 2×2 мозайк */

interface Props {
  /** Дуунуудын ковер URL — дуудагч тал `resolveTracks(...)`-аар гаргана. */
  covers: (string | undefined)[];
  /** Гадна хүрээний класс (хэмжээ, радиус дуудагчаас). */
  className?: string;
}

export default function PlaylistCover({ covers, className = "" }: Props) {
  const found = covers.filter((c): c is string => !!c);
  const base = "relative overflow-hidden bg-white/5 " + className;

  if (found.length === 0) {
    return (
      <span
        className={base + " grid place-items-center bg-[linear-gradient(135deg,rgba(56,232,206,.18),rgba(56,232,206,.03))] text-aqua/80"}
        aria-hidden="true"
      >
        <Icon name="playlist" size={34} strokeWidth={1.5} />
      </span>
    );
  }

  if (found.length < 4) {
    return (
      <span className={base + " block"} aria-hidden="true">
        <img src={found[0]} alt="" loading="lazy" decoding="async" className="w-full h-full object-cover" />
      </span>
    );
  }

  return (
    <span className={base + " grid grid-cols-2 grid-rows-2"} aria-hidden="true">
      {found.slice(0, 4).map((cover, i) => (
        <img
          key={cover + i}
          src={cover}
          alt=""
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover"
        />
      ))}
    </span>
  );
}

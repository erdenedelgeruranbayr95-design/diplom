"use client";

/* CircularGallery нь `ogl` (WebGL) ашигладаг ~50 KB-ийн компонент бөгөөд landing-ийн
   ХОЁР ДАХЬ дэлгэцэнд байрладаг — эхний зурагт (LCP) огт оролцдоггүй. Тиймээс
   `dynamic({ ssr: false })`-ээр тусад нь chunk болгож, түүнийг ЗӨВХӨН энэ хэсэг
   ойртоход татна. Ингэснээр эхний JS ачаалал багасаж, LCP эрт болно.
   `loading` нь яг ижил өндөртэй байрыг эзэлдэг тул layout ҮСРЭХГҮЙ (CLS = 0). */
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { getRecentSongs } from "@/lib/api/client";

const CircularGallery = dynamic(() => import("./CircularGallery"), {
  ssr: false,
  loading: () => <div className="w-full h-full" aria-hidden="true" />,
});

/* Backend-с татаж чадаагvй (сvлжээ тасарсан, дуу байхгvй) vед л ашиглагдах нөөц
   өгөгдөл — landing page vргэлж хоосон харагдахгvй байхын баталгаа. */
const FALLBACK_SLIDES = [
  { image: "/gallery/gal-01.jpg", text: "Гvн бас — 40 Hz" },
  { image: "/gallery/gal-02.jpg", text: "Танхимын нөсөө — 320 Hz" },
  { image: "/gallery/gal-03.jpg", text: "Хурц өндөр — 8 kHz" },
  { image: "/gallery/gal-04.jpg", text: "Цохилтын хэлбэр — 90 Hz" },
  { image: "/gallery/gal-05.jpg", text: "Чимээгvй завсар — 0 Hz" },
  { image: "/gallery/gal-06.jpg", text: "Бvтэн спектр — 20—20k" },
];

export default function Gallery() {
  const [slides, setSlides] = useState(FALLBACK_SLIDES);

  useEffect(() => {
    let alive = true;
    getRecentSongs()
      .then((songs) => {
        if (!alive) return;
        const withCover = songs
          .filter((s) => s.coverUrl)
          .map((s) => ({
            image: s.coverUrl as string,
            text: s.artist ? `${s.title} — ${s.artist}` : s.title,
          }));
        if (withCover.length > 0) setSlides(withCover);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  return (
    <div className="relative z-[5] py-[100px]">
      <div className="max-w-wrap mx-auto px-8 mb-10">
        <div className="eyebrow" style={{ marginBottom: 16 }}>
          <span className="mono">02 / Галерей</span>
        </div>
        <h2>Дуу бvр өөрийн дvр төрхтэй</h2>
      </div>
      <div style={{ height: "440px", position: "relative" }}>
        <CircularGallery items={slides} bend={1} textColor="#ffffff" borderRadius={0.05} scrollEase={0.08} scrollSpeed={3} />
      </div>
    </div>
  );
}

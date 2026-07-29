"use client";

/* Хэвтээ гүйдэг эгнээ — Нүүр хуудасны гол бүтэц (Spotify/Apple Music-ийн "shelf" загвар).
   Өмнө нь мөр бүр доош ургадаг wrapping grid байсныг орлов: одоо эгнээ бүр нэг мөрөнд
   багтаж, зүүн/баруун сумаар гүйнэ — босоо гүйлгэлт багасаж, олон эгнээ зэрэг харагдана.

   Сум нь зөвхөн гүйлгэх зай байвал идэвхжинэ (эхэнд зүүн сум, төгсгөлд баруун сум унтарна). */
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

export default function CarouselRow({
  title,
  description,
  onShowAll,
  showAllLabel = "Бүгдийг харах",
  children,
}: {
  title: string;
  description?: string;
  onShowAll?: () => void;
  showAllLabel?: string;
  children: ReactNode;
}) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(true);

  const sync = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(el.scrollLeft >= max - 2);
  }, []);

  useEffect(() => {
    sync();
    const el = trackRef.current;
    if (!el) return;
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    return () => ro.disconnect();
  }, [sync, children]);

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.max(240, el.clientWidth * 0.8), behavior: "smooth" });
  };

  const arrowCls =
    "w-8 h-8 rounded-full flex items-center justify-center bg-white/[.06] text-dim transition-[color,background,opacity] duration-150 hover:text-ink hover:bg-white/[.12] focus-visible:outline-none focus-visible:shadow-glow-aqua disabled:opacity-25 disabled:pointer-events-none";

  return (
    <section className="mb-8">
      <div className="flex items-end justify-between gap-4 mb-3.5">
        <div className="min-w-0">
          <h2 className="font-display font-semibold text-[19px] max-nav:text-[16px] tracking-[-.025em] text-ink">{title}</h2>
          {description && <p className="mt-1 text-dim text-[12.5px]">{description}</p>}
        </div>
        <div className="flex items-center gap-2 flex-none">
          {onShowAll && (
            <button
              onClick={onShowAll}
              className="text-[12px] font-medium text-dim hover:text-ink transition-colors duration-150 focus-visible:outline-none focus-visible:text-aqua rounded-sm mr-1"
            >
              {showAllLabel}
            </button>
          )}
          <button className={arrowCls} onClick={() => scrollBy(-1)} disabled={atStart} aria-label="Зүүн тийш гүйлгэх">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button className={arrowCls} onClick={() => scrollBy(1)} disabled={atEnd} aria-label="Баруун тийш гүйлгэх">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        onScroll={sync}
        className="sp-row flex gap-2 overflow-x-auto overflow-y-hidden snap-x snap-mandatory scroll-smooth pb-1 -mx-1 px-1"
      >
        {children}
      </div>
    </section>
  );
}

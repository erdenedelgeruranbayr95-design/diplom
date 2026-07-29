/* Дэд-хуудасны толгой — бараг бүх дэд дэлгэц үүнийг ашигладаг тул энд хийсэн өөрчлөлт
   бүх дэлгэцэд нэг зэрэг тусна.

   Өмнө нь "← Буцах" гэсэн текстэн pill + жижиг гарчиг байсныг, дугуй icon-товч +
   PageHeader-тэй ИЖИЛ том гарчгийн бичиглэл болгов (Судлах дэлгэцтэй нэг хэл ярина).
   prop signature (title/onBack) хэвээр — дуудагч 15 файл өөрчлөлтгүй ажиллана. */
import type { ReactNode } from "react";

export default function BackBar({
  title,
  onBack,
  eyebrow,
  description,
  actions,
}: {
  title: string;
  onBack: () => void;
  eyebrow?: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-5 flex-wrap mb-7">
      <div className="flex items-start gap-3.5 min-w-0">
        <button
          onClick={onBack}
          aria-label="Буцах"
          title="Буцах"
          className="w-9 h-9 mt-0.5 flex-none rounded-full flex items-center justify-center text-dim bg-white/[.05] transition-[color,background,transform] duration-200 hover:text-ink hover:bg-white/[.1] hover:-translate-x-0.5 focus-visible:outline-none focus-visible:shadow-glow-aqua"
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <div className="min-w-0">
          {eyebrow && <span className="mono block mb-1.5">{eyebrow}</span>}
          <h1 className="font-display font-bold text-[26px] max-nav:text-[20px] tracking-[-.03em] leading-tight text-ink">{title}</h1>
          {description && <p className="mt-1.5 text-dim text-[14px] leading-[1.5] max-w-[60ch]">{description}</p>}
        </div>
      </div>
      {actions && <div className="flex items-center gap-2.5 flex-none">{actions}</div>}
    </div>
  );
}

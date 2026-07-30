"use client";

/* Admin/Therapist/Parent 3 дашбоардад яг адилхан давхардаж бичигдсэн "Тоглуулагч руу
   шилжих" градиент CTA баннерыг нэгтгэв (өмнө нь 3 файлд тус тусад нь хуулбарлагдсан ижил
   markup байсан). title/description/actionLabel/onAction props-оор л ялгаатай текст/
   callback дамжуулна — визуал өөрчлөлтгүй. */
export default function PromoBanner({
  title,
  description,
  actionLabel,
  onAction,
}: {
  title: string;
  description: string;
  actionLabel: string;
  onAction: () => void;
}) {
  return (
    /* aqua хүрээ + hairline highlight нэмэв: gradient нь хүрээгүй үед картуудын дундаас
       "хөвж" харагдаж байсныг тогтворжуулна. Текстийн уншигдац: --dim → цайвар ink/85. */
    <div className="mt-8 rounded-2xl p-6 max-nav:p-5 max-[640px]:flex-col max-[640px]:items-start flex justify-between items-center gap-6 flex-wrap border border-aqua/[.22] shadow-[inset_0_1px_0_rgba(255,255,255,.07)] [background:linear-gradient(120deg,rgba(56,232,206,.16),rgba(14,92,83,.26)_55%,rgba(9,14,14,.45))]">
      <div className="min-w-0">
        <b className="block font-display font-semibold text-[15.5px] tracking-[-.02em] mb-1.5">{title}</b>
        <p className="text-ink/70 text-[13px] leading-[1.55] max-w-[62ch]">{description}</p>
      </div>
      <button
        className="inline-flex items-center justify-center gap-2 rounded-full text-[13.5px] font-semibold border border-white/[.2] bg-white/[.05] text-ink py-2.5 px-5 min-h-[38px] whitespace-nowrap transition-[background,border-color,transform] duration-200 hover:bg-white/[.12] hover:border-white/[.32] active:scale-[.98] motion-reduce:active:scale-100 focus-visible:outline-none focus-visible:shadow-glow-aqua flex-none"
        onClick={onAction}
      >
        {actionLabel}
      </button>
    </div>
  );
}

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
    <div className="mt-8 rounded-2xl p-6 max-[640px]:flex-col flex justify-between items-center gap-6 flex-wrap [background:linear-gradient(120deg,rgba(56,232,206,.14),rgba(14,92,83,.25)_55%,rgba(9,14,14,.4))]">
      <div>
        <b className="block font-display font-semibold text-[15px] mb-1">{title}</b>
        <p className="text-dim text-[13px] leading-[1.5]">{description}</p>
      </div>
      <button
        className="rounded-full text-[13.5px] font-semibold border border-white/[.16] text-ink py-2.5 px-5 transition-colors duration-200 hover:bg-white/[.08] focus-visible:outline-none focus-visible:shadow-glow-aqua flex-none"
        onClick={onAction}
      >
        {actionLabel}
      </button>
    </div>
  );
}

/* Дахин ашиглагдах "буцах товч + гарчиг" мөр — бараг бүх дэд-хуудсанд ашиглагддаг.
   .sp-h legacy classname-ийг Tailwind title typography болгов, prop signature
   (title/onBack) огт өөрчлөгдөөгүй тул бүх дуудагч файл өөрчлөлтгүйгээр ажиллана. */
export default function BackBar({ title, onBack }: { title: string; onBack: () => void }) {
  return (
    <div className="flex items-center gap-4 mb-7">
      <button
        className="text-[13px] font-medium text-dim border border-white/[.1] rounded-full py-2 px-4 whitespace-nowrap transition-colors duration-250 hover:text-aqua hover:border-aqua/40 focus-visible:outline-none focus-visible:shadow-glow-aqua"
        onClick={onBack}
      >
        ← Буцах
      </button>
      <h2 className="font-display font-bold text-[22px] max-nav:text-[19px] tracking-[-.02em] text-ink">{title}</h2>
    </div>
  );
}

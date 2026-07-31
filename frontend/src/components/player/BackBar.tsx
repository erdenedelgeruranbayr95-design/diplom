/* Дахин ашиглагдах "буцах товч + гарчиг" мөр — бараг бүх дэд-хуудсанд ашиглагддаг.
   .sp-h legacy classname-ийг Tailwind title typography болгов, prop signature
   (title/onBack) огт өөрчлөгдөөгүй тул бүх дуудагч файл өөрчлөлтгүйгээр ажиллана. */
import Icon from "@/components/ui/Icon";

export default function BackBar({ title, onBack }: { title: string; onBack: () => void }) {
  return (
    <div className="flex items-center gap-4 max-nav:gap-3 mb-7 max-nav:mb-6">
      {/* "←" текст глиф → SVG (бусад icon-той ижил зузаан), hover-д сум зүүн тийш
          гулсана — буцах чиглэлийг харуулсан жижиг affordance */}
      <button
        className="group inline-flex items-center gap-2 text-body font-medium text-dim border border-white/[.1] rounded-full py-2 pl-3 pr-4 min-h-[36px] whitespace-nowrap transition-[color,border-color,background] duration-250 hover:text-aqua hover:border-aqua/40 hover:bg-aqua/[.05] focus-visible:outline-none focus-visible:shadow-glow-aqua"
        onClick={onBack}
      >
        <Icon name="arrowLeft" size={15} className="transition-transform duration-200 group-hover:-translate-x-0.5 motion-reduce:transform-none" />
        Буцах
      </button>
      <h2 className="font-display font-bold text-[clamp(18px,2.2vw,23px)] tracking-[-.03em] leading-tight text-ink min-w-0 truncate">{title}</h2>
    </div>
  );
}

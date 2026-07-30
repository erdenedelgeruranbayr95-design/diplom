"use client";

/* ParentView.tsx-ийн сонгосон хүүхдийн дэлгэрэнгүй дэлгэцийн толгой хэсэг — премиум sticky
   child-info header (PatientProfileCard.tsx-тэй ижил дизайн хэл) руу шинэчлэв, .ab-head/
   .sp-h/.dv-lead legacy CSS-ийг Tailwind болгов. "Progress summary" эх кодод тусдаа UI биш,
   StatisticsCards.tsx-тэй давхцдаг тул энд давхардуулаагүй. child/onBack/onGoHome props болон
   button-ийн (onBack || onGoHome) логик хэвээр. */
import UserAvatar from "@/components/ui/UserAvatar";
import type { LinkedChild } from "@/types/therapy";
import Icon from "@/components/ui/Icon";

export default function ChildOverviewCard({
  child,
  onBack,
  onGoHome,
}: {
  child: LinkedChild;
  onBack?: () => void;
  onGoHome: () => void;
}) {
  return (
    <div className="sticky top-0 z-[2] -mx-8 max-nav:-mx-4 px-8 max-nav:px-4 py-4 mb-6 bg-bg/95 backdrop-blur-md border-b border-white/[.07] flex justify-between items-center gap-5 flex-wrap">
      <div className="flex items-center gap-4 min-w-0">
        <UserAvatar name={child.child.name} size="md" />
        <div className="min-w-0">
          <span className="mono !text-[9px]">Эцэг эхийн самбар</span>
          <h2 className="font-display font-bold text-[21px] max-nav:text-[18px] tracking-[-.02em] mt-0.5 whitespace-nowrap overflow-hidden text-ellipsis">{child.child.name}</h2>
          <p className="text-dim text-[13px] mt-0.5 whitespace-nowrap overflow-hidden text-ellipsis">{child.child.email}</p>
        </div>
      </div>
      <button
        className="inline-flex items-center rounded-full text-[13px] font-medium text-dim border border-white/[.1] py-2 px-4 min-h-[36px] whitespace-nowrap transition-[color,border-color,background] duration-250 hover:text-aqua hover:border-aqua/40 hover:bg-aqua/[.05] focus-visible:outline-none focus-visible:shadow-glow-aqua flex-none"
        onClick={onBack || onGoHome}
      >
        <span className="inline-flex items-center gap-2">
          {onBack ? <Icon name="arrowLeft" size={14} /> : <Icon name="phones" size={14} />}
          {onBack ? "Жагсаалт руу" : "Тоглуулагч руу"}
        </span>
      </button>
    </div>
  );
}

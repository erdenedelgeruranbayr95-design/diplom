"use client";

/* ParentView.tsx-ийн сонгосон хүүхдийн дэлгэрэнгүй дэлгэцийн толгой хэсэг (.ab-head: нэр/имэйл/
   товч) — тусад нь гаргасан. "Progress summary" эх кодод тусдаа UI биш, StatisticsCards.tsx-тэй
   давхцдаг тул энд давхардуулаагүй. CSS/behavior бүгд өөрчлөгдөөгүй. */
import type { LinkedChild } from "@/types/therapy";

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
    <div className="ab-head">
      <div>
        <span className="mono">Эцэг эхийн самбар</span>
        <h2 className="sp-h" style={{ margin: "8px 0 0" }}>
          {child.child.name}
        </h2>
        <p className="dv-lead" style={{ marginTop: 4 }}>
          {child.child.email}
        </p>
      </div>
      <button className="bt" onClick={onBack || onGoHome}>
        {onBack ? "← Жагсаалт руу" : "🎧 Тоглуулагч руу"}
      </button>
    </div>
  );
}

"use client";

/* ParentView.tsx-ийн жагсаалтын дэлгэцийн толгой хэсэг (.ab-head + .st-cards) — тусад нь
   гаргасан. Эх кодод "quick actions" гэсэн тусдаа UI байхгүй (доод .sp-banner бол тусдаа
   секц, энд оруулаагүй) — зөвхөн бодит агуулгыг шилжүүлсэн. CSS/behavior бүгд өөрчлөгдөөгүй. */
import StatCard from "@/components/player/StatCard";
import { ICONS } from "@/lib/player/constants";

export default function ParentHeader({ childCount }: { childCount: number }) {
  return (
    <>
      <div className="ab-head">
        <div>
          <span className="mono">Эцэг эхийн самбар</span>
          <h2 className="sp-h" style={{ margin: "8px 0 0" }}>
            Танд холбогдсон хүүхдүүд
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3.5">
        <StatCard icon={ICONS.users} color="c-aqua" value={childCount} label="Холбогдсон хүүхэд" />
      </div>
    </>
  );
}

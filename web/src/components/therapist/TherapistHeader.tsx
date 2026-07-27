"use client";

/* TherapistView.tsx-ийн жагсаалтын дэлгэцийн толгой хэсэг (.ab-head + .st-cards) — тусад нь
   гаргасан. CSS/behavior бүгд өөрчлөгдөөгүй, зөвхөн component boundary шилжсэн. */
import StatCard from "@/components/player/StatCard";
import { ICONS } from "@/lib/player/constants";

export default function TherapistHeader({ patientCount }: { patientCount: number }) {
  return (
    <>
      <div className="ab-head">
        <div>
          <span className="mono">Эмчийн самбар</span>
          <h2 className="sp-h" style={{ margin: "8px 0 0" }}>
            Танд томилогдсон хэрэглэгчид
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3.5">
        <StatCard icon={ICONS.users} color="c-aqua" value={patientCount} label="Томилогдсон хэрэглэгч" />
      </div>
    </>
  );
}

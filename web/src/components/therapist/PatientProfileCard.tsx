"use client";

/* TherapistView.tsx-ийн сонгосон хэрэглэгчийн дэлгэрэнгүй дэлгэцийн толгой хэсэг
   (.ab-head: нэр/имэйл/буцах товч) + статистикийн карт (.st-cards) — тусад нь гаргасан.
   Аватар зураг, "томилогдсон эмч" талбар эх кодод байхгүй тул энд нэмээгүй (энэ бол өөрөө
   эмчийн харж буй дэлгэц). CSS/behavior бүгд өөрчлөгдөөгүй, зөвхөн component boundary шилжсэн. */
import StatCard from "@/components/player/StatCard";
import { ICONS } from "@/lib/player/constants";
import type { AssignedPatient } from "@/types/therapy";

export default function PatientProfileCard({
  patient,
  onBack,
  totalSessions,
  completedSessions,
  progressEntries,
}: {
  patient: AssignedPatient;
  onBack: () => void;
  totalSessions: number;
  completedSessions: number;
  progressEntries: number;
}) {
  return (
    <>
      <div className="ab-head">
        <div>
          <span className="mono">Эмчийн самбар</span>
          <h2 className="sp-h" style={{ margin: "8px 0 0" }}>
            {patient.patient.name}
          </h2>
          <p className="dv-lead" style={{ marginTop: 4 }}>
            {patient.patient.email}
          </p>
        </div>
        <button className="bt" onClick={onBack}>
          ← Жагсаалт руу
        </button>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3.5">
        <StatCard icon={ICONS.music} color="c-aqua" value={totalSessions} label="Нийт сесс" />
        <StatCard icon={ICONS.star} color="c-gold" value={completedSessions} label="Дууссан сесс" />
        <StatCard icon={ICONS.vibrate} color="c-rose" value={progressEntries} label="Ахицын бичлэг" />
      </div>
    </>
  );
}

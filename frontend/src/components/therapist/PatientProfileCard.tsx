"use client";

/* TherapistView.tsx-ийн сонгосон хэрэглэгчийн дэлгэрэнгүй дэлгэцийн толгой хэсэг + статистикийн
   карт — премиум sticky patient-info header (dashboard pattern) руу шинэчлэв, .ab-head/.sp-h/
   .dv-lead legacy CSS-ийг Tailwind болгов. Аватар зураг, "томилогдсон эмч" талбар эх кодод
   байхгүй тул энд нэмээгүй (энэ бол өөрөө эмчийн харж буй дэлгэц). patient/onBack/
   totalSessions/completedSessions/progressEntries props бүгд хэвээр. */
import StatCard from "@/components/player/StatCard";
import UserAvatar from "@/components/ui/UserAvatar";
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
      <div className="sticky top-0 z-[2] -mx-8 max-nav:-mx-4 px-8 max-nav:px-4 py-4 mb-6 bg-bg/95 backdrop-blur-md border-b border-white/[.07] flex justify-between items-center gap-5 flex-wrap">
        <div className="flex items-center gap-4 min-w-0">
          <UserAvatar name={patient.patient.name} size="md" />
          <div className="min-w-0">
            <span className="mono !text-[9px]">Эмчийн самбар</span>
            <h2 className="font-display font-bold text-[21px] max-nav:text-[18px] tracking-[-.02em] mt-0.5 whitespace-nowrap overflow-hidden text-ellipsis">{patient.patient.name}</h2>
            <p className="text-dim text-[13px] mt-0.5 whitespace-nowrap overflow-hidden text-ellipsis">{patient.patient.email}</p>
          </div>
        </div>
        <button
          className="rounded-full text-[13px] font-medium text-dim border border-white/[.1] py-2 px-4 whitespace-nowrap transition-colors duration-250 hover:text-aqua hover:border-aqua/40 focus-visible:outline-none focus-visible:shadow-glow-aqua flex-none"
          onClick={onBack}
        >
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

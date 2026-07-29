"use client";

/* TherapistView.tsx-ийн жагсаалтын дэлгэцийн толгой хэсэг — нэгдсэн PageHeader primitive
   ашиглав (Stripe/Linear pattern). patientCount prop хэвээр — зөвхөн визуал давхарга
   шинэчлэгдсэн. */
import { PageHeader } from "@/components/ui/PageHeader";
import StatCard from "@/components/player/StatCard";
import { ICONS } from "@/lib/player/constants";

export default function TherapistHeader({ patientCount }: { patientCount: number }) {
  return (
    <>
      <PageHeader eyebrow="Эмчийн самбар" title="Танд томилогдсон хэрэглэгчид" />

      <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3.5">
        <StatCard icon={ICONS.users} color="c-aqua" value={patientCount} label="Томилогдсон хэрэглэгч" />
      </div>
    </>
  );
}

"use client";

/* ParentView.tsx-ийн жагсаалтын дэлгэцийн толгой хэсэг — нэгдсэн PageHeader primitive
   ашиглав (TherapistHeader.tsx-тэй ижил дизайн хэл). Эх кодод "quick actions" гэсэн тусдаа
   UI байхгүй тул нэмээгүй. childCount prop хэвээр. */
import { PageHeader } from "@/components/ui/PageHeader";
import StatCard from "@/components/player/StatCard";
import { ICONS } from "@/lib/player/constants";

export default function ParentHeader({ childCount }: { childCount: number }) {
  return (
    <>
      <PageHeader eyebrow="Эцэг эхийн самбар" title="Танд холбогдсон хүүхдүүд" />

      <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3.5">
        <StatCard icon={ICONS.users} color="c-aqua" value={childCount} label="Холбогдсон хүүхэд" />
      </div>
    </>
  );
}

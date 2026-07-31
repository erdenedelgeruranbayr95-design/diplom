"use client";

/* ParentView.tsx-ийн "Эмчийн зөвлөмж" хэсэг — премиум recommendation card (Apple Health
   pattern) руу шинэчлэв, .st-h legacy CSS-ийг Tailwind болгож, мөр бүрийг тусдаа карт
   болгов. Тусдаа recommendation загвар backend-д байхгүй тул дууссан сессүүдийн therapist-ийн
   бичсэн notes талбарыг харуулах логик хэвээр (эх файлын толгой коммент дэх тайлбарыг үзнэ үү). */
import { Empty } from "@/components/ui/States";
import { SectionTitle } from "@/components/ui/PageHeader";
import type { TherapySession } from "@/types/therapy";
import Icon from "@/components/ui/Icon";

export default function RecommendationPanel({ recommendations }: { recommendations: TherapySession[] }) {
  return (
    <>
      <div className="mt-8">
        <SectionTitle title="Эмчийн зөвлөмж" />
      </div>
      {recommendations.length === 0 ? (
        <Empty icon="message" title="Одоогоор зөвлөмж алга" hint="Эмч дууссан сесст тэмдэглэл бичихэд энд харагдана" />
      ) : (
        <div className="flex flex-col gap-2.5">
          {recommendations.map((s) => (
            <div key={s.id} className="p-4 rounded-xl border border-aqua/[.18] bg-aqua/[.04] flex gap-3">
              <span className="w-8 h-8 flex-none rounded-full bg-aqua/[.12] text-aqua flex items-center justify-center" aria-hidden="true">
                <Icon name="message" size={15} />
              </span>
              <div className="min-w-0">
                <span className="font-mono text-meta text-faint">{s.completedAt ? new Date(s.completedAt).toLocaleDateString("mn-MN") : ""}</span>
                <p className="text-body text-ink leading-[1.5] mt-1">{s.notes}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
